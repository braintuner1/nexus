<?php
require_once 'config.php';
requireLogin();

header('Content-Type: application/json');

// Authorization check
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'teacher') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

// Retrieve data
$teacher_id = $_SESSION['teacher_id']; // ✅ Correct session variable
$subject_id = $_POST['subject_id'] ?? null;
$assessment_id = $_POST['assessment_id'] ?? null;
$marks = $_POST['marks'] ?? [];
$grades = $_POST['grades'] ?? [];
$comments = $_POST['comments'] ?? [];

// Validation
if (!$subject_id || !$assessment_id || empty($marks)) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required data']);
    exit;
}

try {
    foreach ($marks as $student_id => $mark) {
        $grade = $grades[$student_id] ?? 'F9';
        $comment = $comments[$student_id] ?? '';

        $stmt = $conn->prepare("INSERT INTO marks 
            (student_id, subject_id, teacher_id, assessment_id, mark, grade, comment)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            mark = VALUES(mark),
            grade = VALUES(grade),
            comment = VALUES(comment)");
        
        $stmt->bind_param("iiiidss", 
            $student_id, 
            $subject_id, 
            $teacher_id, // ✅ Matches database column
            $assessment_id, 
            $mark, 
            $grade, 
            $comment
        );
        
        if (!$stmt->execute()) {
            throw new Exception("Failed to save marks for student $student_id");
        }
        $stmt->close();
    }

    echo json_encode(['status' => 'success', 'message' => 'Marks saved successfully']);
} catch (Exception $e) {
    error_log($e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}