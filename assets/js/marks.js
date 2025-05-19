document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const classFilter = document.getElementById('classFilter');
  const subjectFilter = document.getElementById('subjectFilter');
  const assessmentFilter = document.getElementById('assessmentFilter');
  const termFilter = document.getElementById('termFilter');
  const yearFilter = document.getElementById('yearFilter');
  const loadStudentsBtn = document.getElementById('loadStudentsBtn');
  const marksTableContainer = document.getElementById('marksTableContainer');
  const noSelectionMessage = document.getElementById('noSelectionMessage');
  const marksTableBody = document.getElementById('marksTableBody');
  const saveMarksBtn = document.getElementById('saveMarksBtn');
  
  // Statistics elements
  const classAverage = document.getElementById('classAverage');
  const highestMark = document.getElementById('highestMark');
  const lowestMark = document.getElementById('lowestMark');
  
  // Current state
  let studentsData = [];
  let marksModified = false;
  
  // Event listeners for filters
  classFilter.addEventListener('change', handleClassChange);
  subjectFilter.addEventListener('change', handleSubjectChange);
  assessmentFilter.addEventListener('change', handleAssessmentChange);
  loadStudentsBtn.addEventListener('click', loadStudents);
  saveMarksBtn.addEventListener('click', saveMarks);

  // Initialize streamFilter if it exists
  
  // Handle class selection
  function handleClassChange() {
    resetView();
  
  
  
  // Handle subject selection
  function handleSubjectChange() {
    resetAssessment();
    assessmentFilter.disabled = !subjectFilter.value;
    loadStudentsBtn.disabled = true;
    
    if (subjectFilter.value && termFilter.value && yearFilter.value) {
      // Fetch assessments for the selected class and subject
      fetchAssessments();
    }
  }
  
  // Handle assessment selection
  function handleAssessmentChange() {
    loadStudentsBtn.disabled = !assessmentFilter.value;
  }
  
  // Fetch streams for selected class (if applicable)
  
  // Fetch assessments for selected filters
  function fetchAssessments() {
    const termValue = termFilter.value;
    const yearValue = yearFilter.value;

    if (!termValue || !yearValue) {
      assessmentFilter.innerHTML = '<option value="">Select Assessment</option>';
      return;
    }

    fetch(`api/get_assessments.php?term=${encodeURIComponent(termValue)}&year=${encodeURIComponent(yearValue)}`)
      .then(response => response.json())
      .then(data => {
        assessmentFilter.innerHTML = '<option value="">Select Assessment</option>';
        if (data.success && data.assessments && data.assessments.length > 0) {
          data.assessments.forEach(assessment => {
            const option = document.createElement('option');
            option.value = assessment;
            option.textContent = assessment;
            assessmentFilter.appendChild(option);
          });
          assessmentFilter.disabled = false;
        } else {
          const option = document.createElement('option');
          option.value = "";
          option.textContent = "No assessments found";
          option.disabled = true;
          assessmentFilter.appendChild(option);
        }
      })
      .catch(error => {
        console.error('Error fetching assessments:', error);
        alert('Error fetching assessments from the database.');
      });
  }

  // Add event listeners for filter changes
  termFilter.addEventListener('change', fetchAssessments);
  yearFilter.addEventListener('change', fetchAssessments);
  
  // Load students based on selected filters
  function loadStudents() {
    // Check if all required filters are selected
    if (!classFilter.value || !subjectFilter.value || !assessmentFilter.value || 
        !termFilter.value || !yearFilter.value) {
      alert('Please select all required filters');
      return;
    }
    
    // Build URL with all parameters
    let url = `api/get_students_with_marks.php?class=${encodeURIComponent(classFilter.value)}` +
              `&subject=${encodeURIComponent(subjectFilter.value)}` +
              `&assessment=${encodeURIComponent(assessmentFilter.value)}` +
              `&term=${encodeURIComponent(termFilter.value)}` +
              `&year=${encodeURIComponent(yearFilter.value)}`;
    
    // Add stream if applicable
    if (streamFilter && streamFilter.value) {
      url += `&stream=${encodeURIComponent(streamFilter.value)}`;
    }
    
    // Fetch students with marks
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.success && data.students) {
          studentsData = data.students;
          populateMarksTable(data.students);
          
          // Show the table and hide the message
          marksTableContainer.classList.remove('hidden');
          noSelectionMessage.classList.add('hidden');
        } else {
          alert('No students found for the selected criteria');
        }
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        alert('Error fetching students from the database.');
      });
  }
  
  // Populate the marks table with student data
  function populateMarksTable(students) {
    // Clear the table
    marksTableBody.innerHTML = '';
    
    // Add rows for each student
    students.forEach(student => {
      const row = document.createElement('tr');
      
      // Calculate grade from previous mark
      const previousMark = student.previousMark ? parseFloat(student.previousMark) : null;
      const grade = previousMark !== null ? calculateGrade(previousMark) : '';
      
      row.innerHTML = `
        <td>${student.admission_number}</td>
        <td>${student.name}</td>
        <td>${previousMark !== null ? previousMark : ''}</td>
        <td>
          <input type="number" class="form-input mark-input" data-student-id="${student.student_id}" 
                 min="0" max="100" value="">
        </td>
        <td class="grade-cell">${grade}</td>
        <td>
          <select class="form-select comment-select">
            <option value="">Select Comment</option>
            <option value="Excellent work">Excellent work</option>
            <option value="Good effort">Good effort</option>
            <option value="Satisfactory">Satisfactory</option>
            <option value="Needs improvement">Needs improvement</option>
            <option value="Poor performance">Poor performance</option>
          </select>
        </td>
      `;
      
      marksTableBody.appendChild(row);
    });
    
    // Add event listeners to mark inputs
    document.querySelectorAll('.mark-input').forEach(input => {
      input.addEventListener('change', handleMarkChange);
      input.addEventListener('input', handleMarkInput);
    });
    
    // Calculate and display statistics
    updateStatistics();
  }
  
  // Handle mark change
  function handleMarkChange(e) {
    marksModified = true;
    
    // Update the grade cell
    const mark = parseInt(e.target.value, 10);
    if (!isNaN(mark)) {
      const gradeCell = e.target.parentElement.nextElementSibling;
      gradeCell.textContent = calculateGrade(mark);
      
      // Update statistics
      updateStatistics();
    }
  }
  
  // Handle mark input (validation)
  function handleMarkInput(e) {
    let value = parseInt(e.target.value, 10);
    
    // Ensure the value is between 0 and 100
    if (isNaN(value)) {
      e.target.value = '';
    } else if (value < 0) {
      e.target.value = 0;
    } else if (value > 100) {
      e.target.value = 100;
    }
  }
  
  // Save all marks
  function saveMarks() {
    if (!marksModified) {
      alert('No changes to save.');
      return;
    }
    
    // Collect all marks
    const marks = [];
    document.querySelectorAll('.mark-input').forEach(input => {
      const studentId = input.getAttribute('data-student-id');
      const markValue = input.value.trim();
      
      // Only include marks that have been entered
      if (markValue !== '') {
        const commentSelect = input.closest('tr').querySelector('.comment-select');
        const comment = commentSelect.value;
        
        marks.push({
          studentId,
          mark: markValue,
          comment,
          subject: subjectFilter.value,
          assessment: assessmentFilter.value,
          term: termFilter.value,
          year: yearFilter.value
        });
      }
    });
    
    if (marks.length === 0) {
      alert('No marks entered to save.');
      return;
    }
    
    // Send marks to server
    fetch('api/save_marks.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ marks: marks })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(data.message || 'Marks saved successfully!');
        marksModified = false;
        
        // Reload students to show the updated marks
        loadStudents();
      } else {
        alert('Error saving marks: ' + (data.message || 'Unknown error'));
      }
    })
    .catch(error => {
      console.error('Error saving marks:', error);
      alert('Error saving marks.');
    });
  }
  
  // Calculate grade from mark
  function calculateGrade(mark) {
    if (!mark && mark !== 0) return '';
    
    if (mark >= 80) return 'A';
    if (mark >= 75) return 'A-';
    if (mark >= 70) return 'B+';
    if (mark >= 65) return 'B';
    if (mark >= 60) return 'B-';
    if (mark >= 55) return 'C+';
    if (mark >= 50) return 'C';
    if (mark >= 45) return 'C-';
    if (mark >= 40) return 'D+';
    if (mark >= 35) return 'D';
    if (mark >= 30) return 'D-';
    return 'E';
  }
  
  // Update statistics
  function updateStatistics() {
    const marks = [];
    document.querySelectorAll('.mark-input').forEach(input => {
      const mark = parseInt(input.value, 10);
      if (!isNaN(mark)) {
        marks.push(mark);
      }
    });
    
    if (marks.length === 0) {
      classAverage.textContent = '--';
      highestMark.textContent = '--';
      lowestMark.textContent = '--';
      return;
    }
    
    // Calculate statistics
    const sum = marks.reduce((a, b) => a + b, 0);
    const avg = Math.round((sum / marks.length) * 10) / 10;
    const max = Math.max(...marks);
    const min = Math.min(...marks);
    
    // Update the display
    classAverage.textContent = avg;
    highestMark.textContent = max;
    lowestMark.textContent = min;
  }
  
  // Reset the view
  function resetView() {
    resetSubjectAndAssessment();
    
    if (streamFilter) {
      streamFilter.innerHTML = '<option value="">Select Stream</option>';
      streamFilter.disabled = true;
    }
    
    marksTableContainer.classList.add('hidden');
    noSelectionMessage.classList.remove('hidden');
    studentsData = [];
  }
  
  // Reset subject and assessment filters
  function resetSubjectAndAssessment() {
    // We don't reset the subject options as they are pre-populated for teachers
    resetAssessment();
  }
  
  // Reset assessment filter
  function resetAssessment() {
    assessmentFilter.innerHTML = '<option value="">Select Assessment</option>';
    assessmentFilter.disabled = true;
    loadStudentsBtn.disabled = true;
  }
  
  // Initialize the form
  function initializeForm() {
    // Initialize the filters
    classFilter.value = '';
    if (streamFilter) {
      streamFilter.disabled = true;
    }
    subjectFilter.disabled = true;
    assessmentFilter.disabled = true;
    loadStudentsBtn.disabled = true;
    marksTableContainer.classList.add('hidden');
    noSelectionMessage.classList.remove('hidden');
    
    // Try to fetch assessments if term and year are pre-selected
    if (termFilter.value && yearFilter.value) {
      fetchAssessments();
    }
  }
  
  // Initialize the form
  initializeForm();
});