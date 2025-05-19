<?php
require_once 'config.php';
requireLogin();

// Check if user is a teacher
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'teacher') {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Access denied']);
    exit;
}

// Get teacher's assigned subjects and classes
$teacherID = $_SESSION['teacher_id'] ?? 0;
$teacherSubjects = isset($_SESSION['subject_id']) ? explode(',', $_SESSION['subject_id']) : [];
$teacherClasses = isset($_SESSION['class_assigned']) ? explode(',', $_SESSION['class_assigned']) : [];

// Get request parameters
$assessmentID = $_GET['assessment_id'] ?? 0;
$subjectID = $_GET['subject_id'] ?? 0;
$class = $_GET['class'] ?? '';

// Validate teacher has access to this subject and class
if (!in_array($subjectID, $teacherSubjects) || !in_array($class, $teacherClasses)) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'You do not have permission to access marks for this subject or class.']);
    exit;
}

// Get existing marks
$marks = [];
try {
    // Get student IDs for the class
    $stmt = $conn->prepare("SELECT student_id FROM students WHERE class = ?");
    $stmt->bind_param("s", $class);
    $stmt->execute();
    $students = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    
    $studentIDs = array_column($students, 'student_id');
    
    if (!empty($studentIDs)) {
        // Get marks for these students
        $placeholders = implode(',', array_fill(0, count($studentIDs), '?'));
        $types = str_repeat('i', count($studentIDs)) . 'ii';
        
        $stmt = $conn->prepare("SELECT student_id, mark, grade, comment 
                               FROM marks 
                               WHERE student_id IN ($placeholders) 
                               AND assessment_id = ? 
                               AND subject_id = ?");
        
        $params = $studentIDs;
        $params[] = $assessmentID;
        $params[] = $subjectID;
        
        $stmt->bind_param($types, ...$params);
        $stmt->execute();
        $marks = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
    
    header('Content-Type: application/json');
    echo json_encode(['marks' => $marks]);
    
} catch (Exception $e) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>