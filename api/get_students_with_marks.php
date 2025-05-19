<?php
require_once '../config.php';
requireLogin();

header('Content-Type: application/json');

try {
    if (!isset($_GET['class']) || !isset($_GET['subject']) ||
        !isset($_GET['assessment']) || !isset($_GET['term']) || !isset($_GET['year'])) {
        throw new Exception('All parameters are required');
    }

    // Sanitize inputs using prepared statements
    $class = $_GET['class'];
    $subject = $_GET['subject'];
    $assessment = $_GET['assessment'];
    $term = $_GET['term'];
    $year = $_GET['year'];
    
    // Base SQL query
    $sql = "SELECT s.student_id, s.admission_number, 
            CONCAT(s.first_name, ' ', s.last_name) AS name, 
            m.mark AS previousMark 
            FROM students s
            LEFT JOIN marks m ON s.student_id = m.student_id
                AND m.subject = ? 
                AND m.assessment = ? 
                AND m.term = ? 
                AND m.year = ?
            WHERE s.class = ?";
    
    // Add stream condition if provided
    $params = [$subject, $assessment, $term, $year, $class];
    $types = "sssss";
    
    
    
    
    $sql .= " ORDER BY s.admission_number ASC";
    
    // Prepare and execute the statement
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if (!$result) {
        throw new Exception($conn->error);
    }
    
    $students = [];
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
    
    echo json_encode([
        'success' => true,
        'students' => $students
    ]);
    
    $stmt->close();
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>