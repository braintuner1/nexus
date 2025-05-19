
<?php
require_once 'config.php';
requireLogin();

// Set page variables
$pageTitle = 'Teachers - Emerald School Nexus';
$pageDescription = 'School Management System Teachers';
$pageHeader = 'Teachers';
$pageSubheader = 'Manage teacher records';
$additionalJS = ['assets/js/teachers.js'];

// Add New Teacher action button
$headerAction = '<a href="add-teachers.php" class="btn btn-primary" id="addTeacherBtn">
                    <i class="fas fa-plus-circle"></i>
                    Add New Teacher
                </a>';

include 'includes/header.php';
?>

<!-- Search and Filters -->
<div class="card mb-6">
  <div class="card-content">
    <div class="search-filter-container">
      <div class="search-input-container">
        <i class="fas fa-search search-icon"></i>
        <input type="text" id="teacherSearch" placeholder="Search teachers..." class="search-input">
      </div>
      
      <div class="filter-container">
        <div class="filter-group">
          <label for="genderFilter">Gender:</label>
          <select id="genderFilter" class="form-select">
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="classFilter">Class Assigned:</label>
          <select id="classFilter" class="form-select">
            <option value="">All</option>
            <option value="Form 1">Form 1</option>
            <option value="Form 2">Form 2</option>
            <option value="Form 3">Form 3</option>
            <option value="Form 4">Form 4</option>
            <option value="none">None</option>
          </select>
        </div>
        
        <button class="btn btn-outline" id="resetFiltersBtn">
          <i class="fas fa-times"></i>
          Reset
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Teachers Table -->
<div class="card">
  <div class="card-content">
    <div class="table-responsive">
      <table class="data-table" id="teachersTable">
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Subjects Taught</th>
            <th>Class Assigned</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Teacher records will be inserted here via JavaScript -->
        </tbody>
      </table>
    </div>
    
    <div class="pagination-container">
      <div class="pagination">
        <button class="pagination-btn" disabled>
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="pagination-btn active">1</button>
        <button class="pagination-btn">2</button>
        <button class="pagination-btn">3</button>
        <button class="pagination-btn">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div class="pagination-info">
        Showing <span id="startRecord">1</span> to <span id="endRecord">10</span> of <span id="totalRecords">15</span> teachers
      </div>
    </div>
  </div>
</div>

<!-- Teacher Summary -->
<div class="card mt-8">
  <div class="card-header">
    <h3 class="card-title">Teacher Summary</h3>
    <p class="card-description">Overview of teaching staff</p>
  </div>
  <div class="card-content">
    <div class="summary-grid">
      <div class="summary-box emerald-gradient">
        <p class="summary-label">Total Staff</p>
        <p class="summary-value" id="totalStaff">0</p>
      </div>
      <div class="summary-box blue-gradient">
        <p class="summary-label">Form Teachers</p>
        <p class="summary-value" id="formTeachers">0</p>
      </div>
      <div class="summary-box amber-gradient">
        <p class="summary-label">Male</p>
        <p class="summary-value" id="maleTeachers">0</p>
      </div>
      <div class="summary-box purple-gradient">
        <p class="summary-label">Female</p>
        <p class="summary-value" id="femaleTeachers">0</p>
      </div>
    </div>
  </div>
</div>

<?php include 'includes/footer.php'; ?>
