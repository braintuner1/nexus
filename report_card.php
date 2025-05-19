<?php
// report_card.php

header("Content-Type: application/json");

// Database configuration
$host = 'localhost';
$db = 'emerald_school_nexus';
$user = 'root';
$password = '';

// Connect to MySQL database
$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Get parameters (e.g., student ID or class)
$student_id = isset($_GET['student_id']) ? intval($_GET['student_id']) : 0;

// Query student info
$student_sql = "SELECT s.student_id, s.name, c.class_name, r.term, r.year
                FROM students s
                JOIN reports r ON s.student_id = r.student_id
                JOIN classes c ON c.class_id = s.class_id
                WHERE s.student_id = ?";
$student_stmt = $conn->prepare($student_sql);
$student_stmt->bind_param("i", $student_id);
$student_stmt->execute();
$student_result = $student_stmt->get_result();

if ($student_result->num_rows === 0) {
    echo json_encode(["error" => "Student not found"]);
    exit();
}

$student_info = $student_result->fetch_assoc();

// Query marks
$marks_sql = "SELECT a.subject, m.mark, m.grade, m.comment
              FROM marks m
              JOIN assessments a ON m.assessment_id = a.assessment_id
              WHERE m.student_id = ?";
$marks_stmt = $conn->prepare($marks_sql);
$marks_stmt->bind_param("i", $student_id);
$marks_stmt->execute();
$marks_result = $marks_stmt->get_result();

$subjects = [];
$total_marks = 0;
$count = 0;

while ($row = $marks_result->fetch_assoc()) {
    $subjects[] = $row;
    $total_marks += $row['mark'];
    $count++;
}

$average = $count > 0 ? round($total_marks / $count, 2) : 0;

// Compile the report
$report = [
    "student" => $student_info,
    "subjects" => $subjects,
    "average" => $average,
    "remarks" => $average >= 80 ? "Excellent" :
                ($average >= 60 ? "Good" :
                ($average >= 40 ? "Fair" : "Needs Improvement"))
];

echo json_encode($report);
$conn->close();
?>
