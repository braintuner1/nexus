
<?php
require_once '../config.php';
requireLogin();

// Check if the class parameter is provided
if (!isset($_GET['class'])) {
    echo json_encode(['error' => 'Class parameter is required']);
    exit;
}

$class = sanitizeInput($_GET['class']);

// Get streams for the selected class from the database
// For this example, we'll return mock data
$streams = ['A', 'B', 'C', 'D'];

echo json_encode(['streams' => $streams]);
?>
