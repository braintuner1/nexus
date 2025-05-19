
<?php
require_once 'config.php';

// Uncomment to require login
// requireLogin();

// Page configuration
$pageTitle = 'Students - Emerald School Nexus';
$pageDescription = 'School Management System - Students';
$pageHeader = 'Students';
$pageSubheader = 'Manage student records and information';

$headerAction = '
    <a href="add-students.php" class="btn btn-primary" id="addStudentBtn">
        <i class="fas fa-plus"></i>
        Add New Student
    </a>
';

$additionalCSS = ['assets/css/students.css'];
$additionalJS = ['assets/js/students.js'];

// Include the header
include 'includes/header.php';
?>

<!-- Search and Filter -->
<div class="card search-filter-card">
    <div class="card-content">
        <div class="search-filter">
            <div class="search-input">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search students..." id="studentSearch" />
            </div>
            
            <div class="filters">
                <select id="classFilter">
                    <option value="">All Classes</option>
                    <option value="Baby Class">Baby Class</option>
                <option value="Middle Class">Middle Class</option>
                <option value="Top Class">Top Class</option>
                <option value="Primary 1">Primary 1</option>
                <option value="Primary 2">Primary 2</option>
                <option value="Primary 3">Primary 3</option>
                <option value="Primary 4">Primary 4</option>
                <option value="Primary 5">Primary 5</option>
                <option value="Primary 6">Primary 6</option>
                <option value="Primary 7">Primary 7</option>
                </select>
                
                <button class="btn btn-outline">
                    <i class="fas fa-filter"></i>
                    Filter
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Students Table -->
<div class="card">
    <div class="card-content">
        <table class="data-table students-table">
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Class</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php
$host = "localhost";
$username = "root"; // Change to your database username
$password = "";     // Change to your database password
$database = "emerald_school_nexus"; // Changed to match your actual database name

// Create database connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to select data from the employees table  <---- Line in question
$sql = "SELECT * FROM students";
$result = $conn->query($sql);

if (!$result) {
    die("Invalid query: " . $conn->error);
}

// Read data of each row and display it in the table
while ($row = $result->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . $row["student_id"] . "</td>";
    echo "<td>" . $row["first_name"] . "</td>";
    echo "<td>" . $row["last_name"] . "</td>";
    echo "<td>" . $row["gender"] . "</td>";
    echo "<td>" . $row["class"] . "</td>";
    echo "<td>
        <a class='btn btn-primary btn-sm' href='edit-students.php?student_id=" . $row["student_id"] . "'>Update</a>
        <a class='btn btn-danger btn-sm' href='delete-student.php?student_id=" . $row["student_id"] . "'>Delete</a>
         </td>";
    echo "</tr>";
}

echo "</tbody>";
echo "</table>";

$conn->close();  
?>
        
        <!-- Pagination -->
        <div class="pagination">
            <button class="pagination-btn">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="pagination-btn active">1</button>
            <button class="pagination-btn">2</button>
            <button class="pagination-btn">3</button>
            <button class="pagination-btn">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>
</div>

<?php
// Include the footer
include 'includes/footer.php';
?>
