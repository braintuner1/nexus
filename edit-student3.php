<?php

require_once 'config.php';
requireLogin();

// Set page variables
$pageTitle = 'Add Students - Emerald School Nexus';
$pageDescription = 'Add new students to the system';
$pageHeader = 'Add Students';
$pageSubheader = 'Create new student records';
$additionalJS = ['assets/js/add-students.js'];

$id = ""


include 'includes/header.php';

// Check if an ID is provided in the URL (e.g., edit.php?id=123)
if (isset($_GET['student_id'])) {
    $student_id = $_GET['student_id'];

    // Fetch the record from the database based on the ID
    $result = mysqli_query($mysqli, "SELECT * FROM students WHERE student_id=$student_id");

    // Check if the record exists
    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);

        // Extract data from the fetched row
        $first_name = $row['first_name'];
        $last_name = $row['last_name'];
        $admission_number = $row['admission_number'];
        $gender = $row['gender'];
        $class = $row['class'];
    } else {
        echo "Record not found.";
        exit();
    }
  }

// Handle form submission (when the user clicks "Update")
if (isset($_POST['update'])) {
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $admission_number = $_POST['admission_number'];
    $gender = $_POST['gender'];
    $class = $_POST['class'];

    // Update the record in the database
    $update_query = mysqli_query($mysqli, "UPDATE students SET first_name='$first_name', last_name='$last_name', admission_number='$admission_number' , gender='$gender' , class='$class' WHERE student_id=$student_id");

    if ($update_query) {
        echo "Record updated successfully.";
        // Redirect to the main page
        header("Location: index.php");
        exit();
    } else {
        echo "Error updating record: " . mysqli_error($mysqli);
    }
}
?>

<div class="card mb-6">
  <div class="card-content">
    <div class="form-container">
      <form method="post">
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
                <option value="Form 1">Baby Class</option>
                <option value="Form 2">Middle Class</option>
                <option value="Form 3">Top Class</option>
                <option value="Form 4">Primary 1</option>
                <option value="Form 2">Primary 2</option>
                <option value="Form 3">Primary 3</option>
                <option value="Form 4">Primary 4</option>
                <option value="Form 2">Primary 5</option>
                <option value="Form 3">Primary 6</option>
                <option value="Form 4">Primary 7</option>
              </select>
            </div>

          </div>
        </div>
        <div class="form-actions">
                            <button name="update" type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i>Update Student
                            </button>
                            <button type="reset" class="btn btn-outline">
                                <i class="fas fa-undo"></i> Reset Form
                            </button>
          </div>
    </form>
  </div>
</div>

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
