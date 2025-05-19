<?php
require_once 'config.php';
requireLogin();

// Check if user is a teacher
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'teacher') {
    setFlashMessage('error', 'Access denied. Only teachers can access this page.');
    header("Location: index.php");
    exit;
}

// Get teacher's credentials
$teacherID = (int)($_SESSION['teacher_id'] ?? 0);
$teacherSubjects = isset($_SESSION['subject_id']) ? explode(',', $_SESSION['subject_id']) : [];

// Process form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate required fields
    $requiredFields = ['assessment_id', 'term', 'year', 'subject_id'];
    $missingFields = [];
    
    foreach ($requiredFields as $field) {
        if (!isset($_POST[$field]) 
            $missingFields[] = $field;
        }
    }
    
    if (!empty($missingFields)) {
        setFlashMessage('error', 'Missing required fields: ' . implode(', ', $missingFields));
        header("Location: marks.php");
        exit;
    }
    
    // Get and validate form data
    $subjectID = (int)$_POST['subject_id'];
    $assessmentID = (int)$_POST['assessment_id'];
    $term = $_POST['term'];
    $year = (int)$_POST['year'];
    $class = $_POST['class'] ?? '';

    // Validate teacher has access to this subject
    if (!in_array($subjectID, $teacherSubjects)) {
        setFlashMessage('error', 'Unauthorized subject selection');
        header("Location: marks.php");
        exit;
    }

    // Verify subject exists in database
    $validSubject = false;
    $subjectCheck = $conn->prepare("SELECT subject_id FROM subjects WHERE subject_id = ?");
    $subjectCheck->bind_param("i", $subjectID);
    $subjectCheck->execute();
    
    if ($subjectCheck->get_result()->num_rows > 0) {
        $validSubject = true;
    }
    $subjectCheck->close();

    if (!$validSubject) {
        setFlashMessage('error', 'Invalid subject selected');
        header("Location: marks.php");
        exit;
    }

    // Process student marks
    if (isset($_POST['marks']) && is_array($_POST['marks'])) {
        $conn->begin_transaction();
        $success = true;
        
        try {
            // Prepare insert/update statement
            $stmt = $conn->prepare("INSERT INTO marks 
                                  (student_id, assessment_id, mark, grade, comment, subject_id, teacher_id) 
                                  VALUES (?, ?, ?, ?, ?, ?, ?)
                                  ON DUPLICATE KEY UPDATE 
                                  mark = VALUES(mark), 
                                  grade = VALUES(grade), 
                                  comment = VALUES(comment),
                                  subject_id = VALUES(subject_id),
                                  teacher_id = VALUES(teacher_id)");
            
            foreach ($_POST['marks'] as $studentID => $mark) {
                // Validate mark
                if (!is_numeric($mark) || $mark < 0 || $mark > 100) {
                    continue;
                }
                
                $studentID = (int)$studentID;
                $grade = $_POST['grades'][$studentID] ?? '';
                $comment = $_POST['comments'][$studentID] ?? '';

                // Bind parameters with validated values
                $stmt->bind_param("iisssii", 
                    $studentID,
                    $assessmentID,
                    $mark,
                    $grade,
                    $comment,
                    $subjectID,
                    $teacherID
                );
                
                if (!$stmt->execute()) {
                    throw new Exception("Database error: " . $stmt->error);
                }
            }
            
            $conn->commit();
            setFlashMessage('success', 'Marks saved successfully');

        } catch (Exception $e) {
            $conn->rollback();
            setFlashMessage('error', 'Error saving marks: ' . $e->getMessage());
            $success = false;
        }

        // Redirect with parameters
        $redirectParams = http_build_query([
            'class' => $class,
            'subject_id' => $subjectID,
            'assessment_id' => $assessmentID,
            'term' => $term,
            'year' => $year
        ]);
        
        header("Location: marks.php?$redirectParams");
        exit;

    } else {
        setFlashMessage('error', 'No marks data submitted');
        header("Location: marks.php");
        exit;
    }
}

// Invalid request handler
header("Location: marks.php");
exit;
?>