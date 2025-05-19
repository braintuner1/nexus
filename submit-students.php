<?php
// Database connection parameters
$host = "localhost";
$username = "root"; // Change to your database username
$password = ""; // Change to your database password
$database = "emerald_school_nexus"; // Changed to match your actual database name

// Create database connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Debug: Check if tables exist
echo "<div style='background-color: #f8f9fa; padding: 10px; margin-bottom: 20px; border: 1px solid #ddd;'>";
echo "<strong>Database Connection:</strong> Successful<br>";
$tables_check = $conn->query("SHOW TABLES");
if ($tables_check) {
    $tables = [];
    while ($row = $tables_check->fetch_array()) {
        $tables[] = $row[0];
    }
    echo "<strong>Tables in database:</strong> " . implode(", ", $tables);
} else {
    echo "<strong>Error checking tables:</strong> " . $conn->error;
}
echo "</div>";

// Function to sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and collect form data
    $first_name = sanitize_input($_POST["first_name"]);
    $last_name = sanitize_input($_POST["last_name"]);
    $gender = sanitize_input($_POST["gender"]);
    $class = sanitize_input($_POST["class"]);
    $admission_number = sanitize_input($_POST["admission_number"]);

    // Check if student ID already exists
    $check_sql = "SELECT * FROM students WHERE student_id = ?";
    $check_stmt = $conn->prepare($check_sql);
    
    // Check if prepare statement was successful
    if (!$check_stmt) {
        die("Prepare failed (student check): " . $conn->error);
    }
    
    $check_stmt->bind_param("s", $student_id);
    $check_stmt->execute();
    $result = $check_stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo "<script>alert('Student ID already exists!'); window.history.back();</script>";
        exit();
    }
    $check_stmt->close();
    
    // Insert into student_reg table
    try {
        // Insert into student_reg table
        $student_sql = "INSERT INTO students ( first_name, last_name, gender, class, admission_number)
                        VALUES (?, ?, ?, ?, ?)";
        $student_stmt = $conn->prepare($student_sql);
        
        // Check if prepare statement was successful
        if (!$student_stmt) {
            throw new Exception("Prepare failed (student insert): " . $conn->error);
        }
        
        $student_stmt->bind_param("sssss", $first_name, $last_name, $gender, $class, $admission_number);
        
        if (!$student_stmt->execute()) {
            throw new Exception("Execute failed (student insert): " . $student_stmt->error);
        }
        
        // Redirect to students list with success message
        echo "<script>
            alert('Student added successfully!');
            window.location.href = 'index.html';
        </script>";
        
    } catch (Exception $e) {
        echo "<script>
            alert('Error: " . $e->getMessage() . "');
            window.history.back();
        </script>";
    }
    
    // Close prepared statement
    if (isset($student_stmt) && $student_stmt) {
        $student_stmt->close();
    }
}

// Close database connection
$conn->close();
?>
