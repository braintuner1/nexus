<?php
require_once 'config.php';
requireLogin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Invalid request method");
}

// Validate teacher permissions
if ($_SESSION['role'] !== 'teacher') {
    die("Unauthorized access");
}

$subject_id = $_SESSION['subject_id'];
$assessment_id = $_POST['assessment_id'];

try {
    $conn->begin_transaction();
    
    foreach ($_POST['marks'] as $student_id => $mark) {
        $grade = $_POST['grades'][$student_id];
        $comment = $_POST['comments'][$student_id];
        
        $stmt = $conn->prepare("
            INSERT INTO marks 
            (student_id, assessment_id, subject_id, marks, grade, comments, term, year)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            marks = VALUES(marks),
            grade = VALUES(grade),
            comments = VALUES(comments)
        ");
        
        $stmt->bind_param("ssssss",
            $student_id,
            $assessment_id,
            $subject_id,
            $mark,
            $grade,
            $comment,
            $_GET['term'],
            $_GET['year']
        );
        
        $stmt->execute();
    }
    
    $conn->commit();
    setFlashMessage('success', 'Marks saved successfully');
    header("Location: marks.php");
    
} catch(Exception $e) {
    $conn->rollback();
    setFlashMessage('error', 'Error saving marks: ' . $e->getMessage());
    header("Location: marks.php");
}
$stmt->close();
$conn->close();
?>