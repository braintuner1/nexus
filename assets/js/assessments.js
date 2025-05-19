document.addEventListener('DOMContentLoaded', function() {
  // Modal elements
  const modal = document.getElementById('assessmentModal');
  const openModalBtn = document.getElementById('createAssessmentBtn');
  const closeModalBtn = document.querySelector('.close-btn');
  const cancelBtn = document.getElementById('cancelBtn');
  const assessmentForm = document.getElementById('assessmentForm');

  // Open modal
  if (openModalBtn) {
    openModalBtn.addEventListener('click', function() {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
  }

  // Close modal function
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
  }
  
  // Close modal when clicking outside modal content
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Submit assessment form using the fetch API so real data is processed
  if (assessmentForm) {
    assessmentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const title = document.getElementById('assessmentTitle').value;
      const subject = document.getElementById('subject').value;
      const dueDate = document.getElementById('dueDate').value;
      const maxMarks = document.getElementById('maxMarks').value;
      
      // Get selected classes as an array
      const classCheckboxes = document.querySelectorAll('input[name="classes"]:checked');
      const selectedClasses = Array.from(classCheckboxes).map(cb => cb.value);
      
      if (selectedClasses.length === 0) {
        alert('Please select at least one class');
        return;
      }
      
      // Prepare the data for submission
      const assessmentData = {
        title: title,
        subject: subject,
        dueDate: dueDate,
        maxMarks: maxMarks,
        classes: selectedClasses
      };
      
      // Send the data to the real API endpoint
      fetch('api/create_assessment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(assessmentData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Redirect to the assessments list page or details page after success
          window.location.href = 'assessments.php';
        } else {
          alert(`Error creating assessment: ${data.error}`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error creating assessment');
      })
      .finally(() => {
        closeModal();
        assessmentForm.reset();
      });
    });
  }
  
  // Action Button Handlers
  
  // Edit button: Redirect to edit page using the assessment ID passed via a data attribute
  const editButtons = document.querySelectorAll('.edit-btn');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const assessmentId = row.getAttribute('data-assessment-id');
      if (assessmentId) {
        window.location.href = `edit_assessment.php?assessment_id=${encodeURIComponent(assessmentId)}`;
      } else {
        alert('Assessment ID not found');
      }
    });
  });
  
  // View button: Redirect to the assessment details page using the assessment ID
  const viewButtons = document.querySelectorAll('.view-btn');
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const assessmentId = row.getAttribute('data-assessment-id');
      if (assessmentId) {
        window.location.href = `assessment_details.php?assessment_id=${encodeURIComponent(assessmentId)}`;
      } else {
        alert('Assessment ID not found');
      }
    });
  });
  
  // Report button: Redirect to the assessment report page using the assessment ID
  const reportButtons = document.querySelectorAll('.report-btn');
  reportButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const assessmentId = row.getAttribute('data-assessment-id');
      if (assessmentId) {
        window.location.href = `assessment_report.php?assessment_id=${encodeURIComponent(assessmentId)}`;
      } else {
        alert('Assessment ID not found');
      }
    });
  });
});
