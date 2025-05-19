
document.addEventListener('DOMContentLoaded', function() {
  // Form submission handling
  const addTeacherForm = document.getElementById('addTeacherForm');
  if (addTeacherForm) {
    addTeacherForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate that at least one subject is selected
      const subjectSelects = document.querySelectorAll('select[name="subjects[]"]');
      let hasSubject = false;
      
      subjectSelects.forEach(select => {
        if (select.value) {
          hasSubject = true;
        }
      });
      
      if (!hasSubject) {
        alert('Please select at least one subject');
        return;
      }
      
      // In a real application, this would send data to the server
      // Here we'll just show a success message
      alert('Teacher added successfully!');
      
      // Optionally reset the form
      addTeacherForm.reset();
    });
  }
  
  // Subject row management
  const subjectsContainer = document.getElementById('subjectsContainer');
  
  // Function to add new subject row
  function addSubjectRow() {
    const newRow = document.createElement('div');
    newRow.className = 'subject-row';
    
    newRow.innerHTML = `
      <select name="subjects[]" class="form-select subject-select">
        <option value="">Select subject</option>
        <option value="Mathematics">Mathematics</option>
        <option value="English">English</option>
        <option value="Kiswahili">Kiswahili</option>
        <option value="Science">Science</option>
        <option value="Social Studies">Social Studies</option>
        <option value="Physics">Physics</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Biology">Biology</option>
        <option value="Geography">Geography</option>
        <option value="History">History</option>
      </select>
      <button type="button" class="btn btn-outline btn-small remove-subject-btn">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Add event listener to remove button
    const removeButton = newRow.querySelector('.remove-subject-btn');
    removeButton.addEventListener('click', function() {
      newRow.remove();
    });
    
    subjectsContainer.appendChild(newRow);
  }
  
  // Event delegation for add subject button
  if (subjectsContainer) {
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('add-subject-btn') || 
          (e.target.parentElement && e.target.parentElement.classList.contains('add-subject-btn'))) {
        addSubjectRow();
      }
    });
  }
  
  // Bulk upload form handling
  const bulkUploadForm = document.getElementById('bulkUploadForm');
  const csvFileInput = document.getElementById('csvFile');
  const fileName = document.getElementById('fileName');
  const uploadBtn = document.getElementById('uploadBtn');
  
  if (csvFileInput) {
    csvFileInput.addEventListener('change', function() {
      if (this.files.length > 0) {
        fileName.textContent = this.files[0].name;
        uploadBtn.disabled = false;
      } else {
        fileName.textContent = 'No file selected';
        uploadBtn.disabled = true;
      }
    });
  }
  
  if (bulkUploadForm) {
    bulkUploadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real application, this would process the CSV file
      // Here we'll just show a success message
      alert('Bulk upload started. Teachers will be processed.');
    });
  }
});
