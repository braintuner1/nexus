<?php
require_once '../config.php';
requireLogin();

header('Content-Type: application/json');

try {
    if (!isset($_GET['term'])) {
        throw new Exception('Term parameter missing');
    }
    if (!isset($_GET['year'])) {
        throw new Exception('Year parameter missing');
    }

    $term = $_GET['term'];
    $year = $_GET['year'];

    // Fetch both id and assessment_name for dropdown options
    $stmt = $conn->prepare("SELECT id, assessment_name FROM assessments 
                           WHERE term = ? AND assessment_year = ?");
    $stmt->bind_param("ss", $term, $year);
    $stmt->execute();
    $result = $stmt->get_result();

    if (!$result) {
        throw new Exception($conn->error);
    }

    $assessments = [];
    while ($row = $result->fetch_assoc()) {
        // Include both ID and name for each assessment
        $assessments[] = [
            'id' => $row['id'],
            'name' => $row['assessment_name']
        ];
    }

    echo json_encode([
        'success' => true,
        'assessments' => $assessments
    ]);

    $stmt->close();
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>