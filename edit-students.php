<?php
require_once 'config.php';
requireLogin();

// Set page variables
$pageTitle = 'Add Students - Emerald School Nexus';
$pageDescription = 'Add new students to the system';
$pageHeader = 'Add Students';
$pageSubheader = 'Create new student records';
$additionalJS = ['assets/js/add-students.js'];
include 'includes/header.php';

$student_id = "";  
$first_name = "";
$last_name = "";
$admission_number = "";
$gender = "";
$class = "";
$errorMessage = "";
$successMessage = "";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // GET method: Show the data of the student
    // Check if student_id is set in the URL
    
    $student_id = $_GET["student_id"];  // Correct variable assignment
    
    // Read the row of the selected student from the database table
    $sql = "SELECT * FROM students WHERE student_id = $student_id";
    $result = $conn->query($sql);  // Assuming $connection is already established
    $row = $result->fetch_assoc();

    if (!$row) {  // check if row is empty
         header("location: students.php");
         exit;
    }

    // Extract data from the fetched row
    $first_name = $row['first_name'];
    $last_name = $row['last_name'];
    $admission_number = $row['admission_number'];
    $gender = $row['gender'];
    $class = $row['class'];
} else {
    // POST method: Update the data of the student
    // Ensure the form sends student_id as hidden input
    $student_id = $_POST['student_id'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $admission_number = $_POST['admission_number'];
    $gender = $_POST['gender'];
    $class = $_POST['class'];

    do {
        if (empty($first_name) || empty($last_name) || empty($gender) || empty($class) || empty($admission_number)) {
            $errorMessage = "All the fields are required";
            break;
        }

        // Updated query: update the 'students' table instead of 'clients'
        $sql = "UPDATE students SET 
                    first_name = '$first_name',
                    last_name = '$last_name',
                    admission_number = '$admission_number',
                    gender = '$gender',
                    class = '$class'
                WHERE student_id = $student_id";

        $result = $conn->query($sql); // Assuming $connection is already established

        if (!$result) {
            $errorMessage = "Invalid query: " . $connection->error;
            break;
        }
        $successMessage = "Student Updated";
        header("location: students.php");
        exit;

    } while (true);
}
?>

        <?php if (!empty($errorMessage)) { ?>
            <div class="alert alert-danger" role="alert">
                <?php echo $errorMessage; ?>
            </div>
        <?php } ?>
<div class="card mb-6">
  <div class="card-content">
    <div class="form-container">
      <form method="post">
        <?php if (!empty($errorMessage)) { ?>
            <div class="alert alert-danger" role="alert">
                <?php echo $errorMessage; ?>
            </div>
        <?php } ?>
        <input type="hidden" name="student_id" value="<?php echo $student_id; ?>">
        <!-- Student Information Section -->
        <div class="form-section">
          <h3 class="form-section-title">Student Information</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label for="first_name">First Name</label>
              <input type="text" id="first_name" name="first_name" class="form-input" value="<?php echo $first_name; ?>" required>
            </div>
            <div class="form-group">
              <label for="last_name">Last Name</label>
              <input type="text" id="last_name" name="last_name" class="form-input" value="<?php echo $last_name; ?>" required>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="admission_number">Admission Number</label>
              <input type="text" id="admission_number" name="admission_number" class="form-input" value="<?php echo $admission_number; ?>" required>
            </div>
            <div class="form-group">
              <label for="gender">Gender</label>
              <select id="gender" name="gender" class="form-select" value="<?php echo $gender; ?>"  required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          
        </div>
        
        <!-- Class Information Section -->
        <div class="form-section">
          <h3 class="form-section-title">Class Information</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label for="class">Class *</label>
              <select id="class" name="class" class="form-select" value="<?php echo $class; ?>" required>
                <option value="">Select class</option>
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
            </div>

          </div>
        </div>

            <?php if (!empty($successMessage)) { ?>
                <div class="row mb-3">
                    <div class="offset-sm-3 col-sm-6">
                        <div class="alert alert-success" role="alert">
                            <?php echo $successMessage; ?>
                        </div>
                    </div>
                </div>
            <?php } ?>

            <div class="row mb-3">
                <div class="offset-sm-3 col-sm-6">
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </div>
        </form>
    </div>
</body>
<style>
  .form-container {
    max-width: 100%;
  }
  
  .form-section {
    margin-bottom: 2rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    background-color: #fff;
  }
  
  .form-section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #10b981;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.75rem;
  }
  
  .form-row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.75rem 1.5rem;
  }
  
  .form-group {
    flex: 1;
    padding: 0 0.75rem;
    min-width: 250px;
  }
  
  .full-width {
    flex-basis: 100%;
  }
  
  .form-textarea {
    width: 100%;
    min-height: 100px;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    resize: vertical;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .file-upload-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .file-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  
  .file-label {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #f3f4f6;
    color: #4b5563;
    border-radius: 0.375rem;
    cursor: pointer;
    font-weight: 500;
    border: 1px solid #d1d5db;
    transition: all 0.2s;
  }
  
  .file-label:hover {
    background-color: #e5e7eb;
  }
  
  .file-label i {
    margin-right: 0.5rem;
  }
  
  .file-name {
    color: #6b7280;
    font-size: 0.875rem;
  }
  
  .text-link {
    color: #10b981;
    text-decoration: none;
    font-weight: 500;
  }
  
  .text-link:hover {
    text-decoration: underline;
  }
</style>

<?php include 'includes/footer.php'; ?>

