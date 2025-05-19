
<?php
require_once 'config.php';
requireLogin();

// Set page variables
$pageTitle = 'Add Teachers - Emerald School Nexus';
$pageDescription = 'Add new teachers to the system';
$pageHeader = 'Add Teachers';
$pageSubheader = 'Create new teacher records';
$additionalJS = ['assets/js/add-teachers.js'];

include 'includes/header.php';
?>

<div class="card mb-6">
  <div class="card-content">
    <div class="form-container">
      <form id="addTeacherForm">
        <!-- Personal Information Section -->
        <div class="form-section">
          <h3 class="form-section-title">Personal Information</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label for="first_name">First Name *</label>
              <input type="text" id="first_name" name="first_name" class="form-input" required>
            </div>
            <div class="form-group">
              <label for="last_name">Last Name *</label>
              <input type="text" id="last_name" name="last_name" class="form-input" required>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="staffId">Staff ID *</label>
              <input type="text" id="staffId" name="staffId" class="form-input" required>
            </div>
            <div class="form-group">
              <label for="gender">Gender *</label>
              <select id="gender" name="gender" class="form-select" required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          </div>
        </div>
        
        <!-- Contact Information Section -->
        <div class="form-section">
          <h3 class="form-section-title">Contact Information</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label for="email">Email Address *</label>
              <input type="email" id="email" name="email" class="form-input" required>
            </div>
            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" class="form-input" required>
            </div>
          </div>
          <div class="form-group">
              <label for="classAssigned">Class Assigned</label>
              <select id="classAssigned" name="classAssigned" class="form-select">
                <option value="">None</option>
                <option value="Baby Class">Baby Class</option>
                <option value="Middle Class">Middle Class</option>
                <option value="Top Class">Top Class</option>
                <option value="Primary One">Primary 1</option>
                <option value="Primary Two">Primary 2</option> 
                <option value="Primary Three">Primary 3</option>
                <option value="Primary Four">Primary 4</option>
                <option value="Primary Five">Primary 5</option>
                <option value="Primary Six">Primary 6</option>
                <option value="Primary Seven">Priamry 7</option>
              </select>
            </div><br>
            <div class="subjects-container" id="subjectsContainer">
                <div class="subject-row">
                  <select name="subjects[]" class="form-select subject-select" required>
                    <option value="">Select subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English">English</option>
                    <option value="Science">Science</option>
                    <option value="Social Studies">Social Studies</option>
                  
                  </select>
                  <button type="button" class="btn btn-outline btn-small add-subject-btn">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
          
          
        <!-- Professional Information Section -->
        
        
        <!-- Teaching Subjects Section -->
        
        
        <!-- Additional Information Section -->
        
        
        <div class="form-actions">
          <button type="reset" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Teacher</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Bulk Teacher Upload -->

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
  
  .section-description {
    color: #6b7280;
    margin-top: -1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
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
  
  .subjects-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .subject-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .subject-select {
    flex: 1;
  }
  
  .btn-small {
    padding: 0.375rem 0.5rem;
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
 
  .form-container {
    max-width: 100%;
    padding: 1rem;
  }
  /* Improved Input Sizes */
  .form-input,
  .form-select,
  .form-textarea {
    padding: 1.25rem 1.5rem;
    font-size: 1.1rem;
    line-height: 1.5;
    min-height: 3.5rem;
    border-radius: 0.75rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif;
  }

  /* Enhanced Textarea Specific */
  .form-textarea {
    min-height: 150px;
    padding: 1.5rem;
  }

  /* Better Select Dropdown Styling */
  .form-select {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23343a40' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1.5rem center;
    background-size: 1.25em;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  /* Improved Font for Labels */
  .form-group label {
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    display: block;
    color: #1e293b;
    letter-spacing: -0.015em;
  }

  /* Larger Button Text */
  .btn {
    font-size: 1.1rem;
    padding: 1.1rem 2rem;
  }

  /* Enhanced Placeholder Styling */
  ::placeholder {
    color: #94a3b8;
    font-weight: 400;
    letter-spacing: 0.015em;
  }

  /* Better Focus States */
  .form-input:focus,
  .form-select:focus,
  .form-textarea:focus {
    border-width: 2px;
    padding: 1.15rem 1.45rem;
  }

  @media (max-width: 768px) {
    .form-input,
    .form-select,
    .form-textarea {
      font-size: 1rem;
      padding: 1.1rem 1.25rem;
    }
  }
  .file-name {
    color: #64748b;
    font-size: 0.9375rem;
    font-weight: 500;
  }
  
  .subjects-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .subject-row {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }
  
  .subject-select {
    flex: 1;
    transition: all 0.3s ease;
  }

  .btn {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    letter-spacing: 0.025em;
    font-weight: 600;
  }

  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  }

  .btn-outline:hover {
    background-color: #f1f5f9;
  }

  .btn-primary {
    background: linear-gradient(to bottom right, #059669 0%, #047857 100%);
    border: none;
  }

  .btn-primary:hover {
    background: linear-gradient(to bottom right, #047857 0%, #065f46 100%);
  }

  .text-link {
    color: #059669;
    font-weight: 600;
    transition: color 0.2s ease;
  }

  .text-link:hover {
    color: #065f46;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .form-section {
      padding: 1.5rem;
    }
    
    .form-group {
      flex-basis: 100%;
      padding: 0;
    }
    
    .form-row {
      margin: 0 0 1.5rem;
      gap: 1rem;
    }
  }
</style>

<?php include 'includes/footer.php'; ?>
