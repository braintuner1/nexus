<?php
require_once 'config.php';


if($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $assessment_id = $_POST['assessment_id'];
        
        $conn->begin_transaction();
        
        foreach($_POST['marks'] as $student_id => $mark) {
            $grade = $_POST['grades'][$student_id];
            $comment = $_POST['comments'][$student_id] ?? '';
            
            $stmt = $conn->prepare("INSERT INTO marks 
                (student_id, assessment_id, mark, grade, comment)
                VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                mark = VALUES(mark),
                grade = VALUES(grade),
                comment = VALUES(comment)");
                
            $stmt->bind_param("iisss", 
                $student_id,
                $assessment_id,
                $mark,
                $grade,
                $comment
            );
            $stmt->execute();
        }
        
        $conn->commit();
        header("Location: marks_entry.php?success=1");
        exit();
        
    } catch(Exception $e) {
        $conn->rollback();
        die("Error saving marks: " . $e->getMessage());
    }
}