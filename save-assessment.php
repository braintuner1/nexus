<?php
require_once 'config.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

// Process form submission
$term = $_POST['term'];
$assessment_year = $_POST['assessment_year'];
$assessment_name = $_POST['assessment_name'];

// Database connection
$conn = new mysqli('localhost', 'root', '', 'emerald_school_nexus');
// Check connection 
if ($conn->connect_error) {
    die('Connection Failed : ' . $conn->connect_error);
} 

$stmt = $conn->prepare("INSERT INTO assessments (term, assessment_year, assessment_name) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $term, $assessment_year, $assessment_name);
$stmt->execute();
$stmt->close();
$conn->close();

// Display a pop-up page with the success message and redirect after 5 seconds
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Registration Successful</title>
  <meta http-equiv="refresh" content="5;url=assessments.html">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f3f3f3;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .message-box {
      background: #fff;
      border: 1px solid #ccc;
      padding: 20px 30px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
    }
    .message-box h1 {
      margin: 0 0 10px;
      color: #2d3b45;
    }
    .message-box p {
      margin: 0;
      color: #555;
    }
  </style>
</head>
<body>
  <div class="message-box">
    <h1>Registration Successful</h1>
    <p>You will be redirected to the home page in 5 seconds...</p>
  </div>
</body>
</html>
