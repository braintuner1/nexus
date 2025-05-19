<?php
require_once '../config.php';
requireLogin();

// Check if user is a teacher
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'teacher') {
    echo json_encode([
        'success' => false, 
        'message' => 'Access denied. Only teachers can save marks.'
    ]);
    exit;
}

// Get JSON data from POST request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data || !isset($data['marks']) || !is_array($data['marks'])) {
    echo json_encode([
        'success' => false, 
        'message' => 'Invalid data format'
    ]);
    exit;
}

try {
    // Start transaction
    $conn->begin_transaction();
    
    $insertStmt = $conn->prepare("INSERT INTO marks 
                                 (student_id, subject, assessment, term, year, mark, comment) 
                                 VALUES (?, ?, ?, ?, ?, ?, ?)
                                 ON DUPLICATE KEY UPDATE 
                                 mark = VALUES(mark), 
                                 comment = VALUES(comment)");
    
    $marks = $data['marks'];
    $savedCount = 0;
    
    foreach ($marks as $markData) {
        // Validate required fields
        if (!isset($markData['studentId']) || !isset($markData['mark']) || 
            !isset($markData['subject']) || !isset($markData['assessment']) || 
            !isset($markData['term']) || !isset($markData['year'])) {
            continue;
        }
        
        // Get values with proper validation
        $studentId = $markData['studentId'];
        $mark = is_numeric($markData['mark']) ? floatval($markData['mark']) : null;
        $subject = $markData['subject'];
        $assessment = $markData['assessment'];
        $term = $markData['term'];
        $year = $markData['year'];
        $comment = isset($markData['comment']) ? $markData['comment'] : '';
        
        // Skip if mark is null
        if ($mark === null) continue;
        
        // Validate mark range
        if ($mark < 0 || $mark > 100) continue;
        
        // Bind parameters and execute
        $insertStmt->bind_param("sssssds", 
            $studentId, $subject, $assessment, $term, $year, $mark, $comment);
        
        if ($insertStmt->execute()) {
            $savedCount++;
        }
    }
    
    // Commit transaction
    $conn->commit();
    
    echo json_encode([
        'success' => true, 
        'message' => "Marks saved successfully. Updated $savedCount records."
    ]);
    
    $insertStmt->close();

} catch (Exception $e) {
    // Rollback on error
    $conn->rollback();
    
    echo json_encode([
        'success' => false, 
        'message' => 'Error saving marks: ' . $e->getMessage()
    ]);
}
?>