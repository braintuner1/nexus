
document.addEventListener('DOMContentLoaded', function() {
  // Sample teacher data (in a real application, this would be fetched from a database)
  const teachers = [
    {
      staffId: 'TCH001',
      first_name: 'John',
      last_name: 'Smith',
      gender: 'Male',
      email: 'john.smith@school.com',
      subjectsTaught: ['Mathematics', 'Physics'],
      classAssigned: 'Form 3',
      joinDate: '2020-01-15'
    },
    {
      staffId: 'TCH002',
      first_name: 'Sarah',
      last_name: 'Johnson',
      gender: 'Female',
      email: 'sarah.johnson@school.com',
      subjectsTaught: ['English', 'Literature'],
      classAssigned: 'Form 2',
      joinDate: '2019-08-20'
    },
    {
      staffId: 'TCH003',
      first_name: 'Michael',
      last_name: 'Williams',
      gender: 'Male',
      email: 'michael.williams@school.com',
      subjectsTaught: ['Biology', 'Chemistry'],
      classAssigned: 'Form 4',
      joinDate: '2018-05-10'
    },
    {
      staffId: 'TCH004',
      first_name: 'Emily',
      last_name: 'Brown',
      gender: 'Female',
      email: 'emily.brown@school.com',
      subjectsTaught: ['Geography', 'History'],
      classAssigned: '',
      joinDate: '2021-02-05'
    }
  ];
  
  // Function to render teacher rows
  function renderTeachers(teachersToRender) {
    const tableBody = document.querySelector('#teachersTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (teachersToRender.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="8" class="text-center">No teachers found</td></tr>';
      return;
    }
    
    teachersToRender.forEach(teacher => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${teacher.staffId}</td>
        <td>${teacher.first_name} ${teacher.last_name}</td>
        <td>${teacher.gender}</td>
        <td>${teacher.email}</td>
        <td>${teacher.subjectsTaught.join(', ')}</td>
        <td>${teacher.classAssigned || 'None'}</td>
        <td>${formatDate(teacher.joinDate)}</td>
        <td>
          <div class="action-buttons">
            <button class="action-btn view-btn" title="View Details">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn edit-btn" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      `;
      
      tableBody.appendChild(row);
    });
    
    // Update pagination info
    updatePaginationInfo(teachersToRender.length);
    
    // Update summary boxes
    updateSummaryBoxes(teachersToRender);
  }
  
  // Format date function
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  // Update pagination information
  function updatePaginationInfo(count) {
    const startRecord = document.getElementById('startRecord');
    const endRecord = document.getElementById('endRecord');
    const totalRecords = document.getElementById('totalRecords');
    
    if (startRecord && endRecord && totalRecords) {
      startRecord.textContent = count > 0 ? '1' : '0';
      endRecord.textContent = count.toString();
      totalRecords.textContent = count.toString();
    }
  }
  
  // Update summary boxes
  function updateSummaryBoxes(teachersData) {
    const totalStaff = document.getElementById('totalStaff');
    const formTeachers = document.getElementById('formTeachers');
    const maleTeachers = document.getElementById('maleTeachers');
    const femaleTeachers = document.getElementById('femaleTeachers');
    
    if (totalStaff) {
      totalStaff.textContent = teachersData.length;
    }
    
    if (formTeachers) {
      const count = teachersData.filter(t => t.classAssigned).length;
      formTeachers.textContent = count;
    }
    
    if (maleTeachers) {
      const count = teachersData.filter(t => t.gender === 'Male').length;
      maleTeachers.textContent = count;
    }
    
    if (femaleTeachers) {
      const count = teachersData.filter(t => t.gender === 'Female').length;
      femaleTeachers.textContent = count;
    }
  }
  
  // Initialize the table
  renderTeachers(teachers);
  
  // Filter functionality
  const teacherSearch = document.getElementById('teacherSearch');
  const genderFilter = document.getElementById('genderFilter');
  const classFilter = document.getElementById('classFilter');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  
  // Function to apply filters
  function applyFilters() {
    const searchTerm = teacherSearch ? teacherSearch.value.toLowerCase() : '';
    const genderValue = genderFilter ? genderFilter.value : '';
    const classValue = classFilter ? classFilter.value : '';
    
    // Filter the teachers
    let filteredTeachers = teachers.filter(teacher => {
      // Search term filter
      if (searchTerm) {
        const fullName = `${teacher.first_name} ${teacher.last_name}`.toLowerCase();
        const matchesSearch = fullName.includes(searchTerm) || 
                              teacher.staffId.toLowerCase().includes(searchTerm) || 
                              teacher.email.toLowerCase().includes(searchTerm);
                              
        if (!matchesSearch) return false;
      }
      
      // Gender filter
      if (genderValue && teacher.gender !== genderValue) {
        return false;
      }
      
      // Class filter
      if (classValue) {
        if (classValue === 'none') {
          if (teacher.classAssigned) return false;
        } else {
          if (teacher.classAssigned !== classValue) return false;
        }
      }
      
      return true;
    });
    
    // Render the filtered teachers
    renderTeachers(filteredTeachers);
  }
  
  // Event listeners for filters
  if (teacherSearch) {
    teacherSearch.addEventListener('input', applyFilters);
  }
  
  if (genderFilter) {
    genderFilter.addEventListener('change', applyFilters);
  }
  
  if (classFilter) {
    classFilter.addEventListener('change', applyFilters);
  }
  
  // Reset filters
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', function() {
      if (teacherSearch) teacherSearch.value = '';
      if (genderFilter) genderFilter.value = '';
      if (classFilter) classFilter.value = '';
      
      applyFilters();
    });
  }
  
  // Add Teacher Modal functionality
  const addTeacherBtn = document.getElementById('addTeacherBtn');
  const addTeacherModal = document.getElementById('addTeacherModal');
  const closeModalBtn = document.querySelector('.close-modal');
  const cancelTeacherBtn = document.getElementById('cancelTeacherBtn');
  const saveTeacherBtn = document.getElementById('saveTeacherBtn');
  const addTeacherForm = document.getElementById('addTeacherForm');
  
  // Function to open modal
  function openModal() {
    if (addTeacherModal) {
      addTeacherModal.style.display = 'block';
    }
  }
  
  // Function to close modal
  function closeModal() {
    if (addTeacherModal) {
      addTeacherModal.style.display = 'none';
      if (addTeacherForm) {
        addTeacherForm.reset();
      }
    }
  }
  
  // Event listeners for modal
  if (addTeacherBtn) {
    addTeacherBtn.addEventListener('click', openModal);
  }
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  if (cancelTeacherBtn) {
    cancelTeacherBtn.addEventListener('click', closeModal);
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === addTeacherModal) {
      closeModal();
    }
  });
  
  // Add subject functionality
  const subjectsContainer = document.getElementById('subjectsContainer');
  
  if (saveTeacherBtn && addTeacherForm) {
    saveTeacherBtn.addEventListener('click', function() {
      // In a real application, this would validate and save the form data
      // Here we'll just close the modal
      alert('Teacher saved successfully!');
      closeModal();
    });
  }
});
