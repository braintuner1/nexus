/**
 * Grade Calculator for Emerald School Nexus
 * Automatically calculates grades based on marks
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get all mark inputs
    const markInputs = document.querySelectorAll('input[name="mark[]"]');
    
    // Add event listeners to each mark input
    markInputs.forEach((input, index) => {
        // Initial grade calculation on page load if mark exists
        if (input.value) {
            calculateGrade(input.value, index);
        }
        
        // Calculate grade when mark is changed
        input.addEventListener('input', function() {
            calculateGrade(this.value, index);
        });
    });
    
    // Function to calculate grade based on mark
    function calculateGrade(mark, index) {
        const numericMark = parseFloat(mark);
        let grade = '';
        
        // Only proceed if mark is a valid number
        if (!isNaN(numericMark)) {
            // Get the corresponding grade select element
            const gradeSelect = document.querySelectorAll('select[name="grade[]"]')[index];
            
            // Calculate grade based on mark
            if (numericMark >= 80) {
                grade = 'A';
            } else if (numericMark >= 70) {
                grade = 'B';
            } else if (numericMark >= 60) {
                grade = 'C';
            } else if (numericMark >= 50) {
                grade = 'D';
            } else if (numericMark >= 40) {
                grade = 'E';
            } else if (numericMark >= 0) {
                grade = 'F';
            }
            
            // Set the grade in the select element
            if (grade && gradeSelect) {
                gradeSelect.value = grade;
            }
        }
    }
    
    // Handle bulk actions for marks
    const bulkActionSelect = document.getElementById('bulk-action');
    if (bulkActionSelect) {
        bulkActionSelect.addEventListener('change', function() {
            const action = this.value;
            
            if (action === '') return;
            
            const selectedStudents = document.querySelectorAll('input[name="selected_students[]"]:checked');
            if (selectedStudents.length === 0) {
                alert('Please select at least one student');
                this.value = '';
                return;
            }
            
            if (action === 'pass') {
                // Set 40 (pass mark) for all selected students
                selectedStudents.forEach(checkbox => {
                    const rowIndex = checkbox.dataset.index;
                    const markInput = document.querySelector(`input[name="mark[]"][data-index="${rowIndex}"]`);
                    markInput.value = '40';
                    calculateGrade('40', parseInt(rowIndex));
                });
            } else if (action === 'fail') {
                // Set 39 (fail mark) for all selected students
                selectedStudents.forEach(checkbox => {
                    const rowIndex = checkbox.dataset.index;
                    const markInput = document.querySelector(`input[name="mark[]"][data-index="${rowIndex}"]`);
                    markInput.value = '39';
                    calculateGrade('39', parseInt(rowIndex));
                });
            } else if (action === 'clear') {
                // Clear marks for all selected students
                selectedStudents.forEach(checkbox => {
                    const rowIndex = checkbox.dataset.index;
                    const markInput = document.querySelector(`input[name="mark[]"][data-index="${rowIndex}"]`);
                    const gradeSelect = document.querySelector(`select[name="grade[]"][data-index="${rowIndex}"]`);
                    const commentInput = document.querySelector(`input[name="comment[]"][data-index="${rowIndex}"]`);
                    markInput.value = '';
                    gradeSelect.value = '';
                    commentInput.value = '';
                });
            }
            
            // Reset the select
            this.value = '';
        });
    }
    
    // Select/Deselect all students
    const selectAllCheckbox = document.getElementById('select-all-students');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const studentCheckboxes = document.querySelectorAll('input[name="selected_students[]"]');
            studentCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    
    // Dynamic assessment loading
    function loadAssessments() {
        const term = document.getElementById('term').value;
        const year = document.getElementById('year').value;
        const assessmentSelect = document.getElementById('assessment');
        
        if (!term || !year) return;
        
        // Clear existing options
        while (assessmentSelect.options.length > 1) {
            assessmentSelect.remove(1);
        }
        
        // Show loading state
        assessmentSelect.innerHTML = '<option value="">Loading...</option>';
        
        // Fetch assessments from server
        fetch(`get_assessments.php?term=${term}&year=${year}`)
            .then(response => response.json())
            .then(data => {
                assessmentSelect.innerHTML = '<option value="" selected disabled>Select Assessment</option>';
                
                // Add new options
                data.forEach(assessment => {
                    const option = document.createElement('option');
                    option.value = assessment.assessment_name;
                    option.textContent = assessment.assessment_name;
                    assessmentSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error loading assessments:', error);
                assessmentSelect.innerHTML = '<option value="" selected disabled>Error loading assessments</option>';
            });
    }
    
    // Add event listeners for term and year selects
    const termSelect = document.getElementById('term');
    const yearSelect = document.getElementById('year');
    
    if (termSelect && yearSelect) {
        termSelect.addEventListener('change', loadAssessments);
        yearSelect.addEventListener('change', loadAssessments);
    }
});
