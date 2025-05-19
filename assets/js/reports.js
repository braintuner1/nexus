
document.addEventListener('DOMContentLoaded', function() {
  // Progress Chart
  const progressCtx = document.getElementById('progressChart');
  
  if (progressCtx) {
    const progressChart = new Chart(progressCtx, {
      type: 'line',
      data: {
        labels: ['Term 1', 'Term 2', 'Term 3', 'Term 1', 'Term 2'],
        datasets: [
          {
            label: 'Mathematics',
            data: [65, 68, 72, 75, 78],
            borderColor: '#10b981',
            tension: 0.4,
            fill: false
          },
          {
            label: 'English',
            data: [70, 72, 73, 75, 76],
            borderColor: '#60a5fa',
            tension: 0.4,
            fill: false
          },
          {
            label: 'Science',
            data: [62, 65, 70, 72, 75],
            borderColor: '#f59e0b',
            tension: 0.4,
            fill: false
          },
          {
            label: 'Social Studies',
            data: [68, 70, 72, 74, 75],
            borderColor: '#8b5cf6',
            tension: 0.4,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Student Progress Over Time'
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 50,
            max: 100,
            title: {
              display: true,
              text: 'Score (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Term'
            }
          }
        }
      }
    });
  }
  
  // Generate Report Modal
  const generateReportBtn = document.getElementById('generateReportBtn');
  
  if (generateReportBtn) {
    generateReportBtn.addEventListener('click', function() {
      alert('Generate report functionality would open a modal or navigate to a form here.');
      // In a real implementation, this would open a modal with a form to select parameters
    });
  }

  // Handle report actions
  const actionButtons = document.querySelectorAll('.btn-icon');
  
  actionButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (this.hasAttribute('disabled')) {
        return;
      }
      
      const action = this.getAttribute('title');
      
      if (action === 'View Report' || action === 'View Details') {
        alert('View report details would open here');
      } else if (action === 'Download Report') {
        alert('Download report functionality would trigger here');
      } else if (action === 'Print Report') {
        alert('Print report functionality would trigger here');
      }
    });
  });
  
  // Progress view button
  const viewProgressBtn = document.querySelector('.filters-container .btn-outline');
  
  if (viewProgressBtn) {
    viewProgressBtn.addEventListener('click', function() {
      const studentSelect = document.getElementById('student-select');
      const subjectSelect = document.getElementById('subject-select');
      
      alert(`Viewing progress for ${studentSelect.value || 'All Students'} in ${subjectSelect.value || 'All Subjects'}`);
      // In a real implementation, this would update the chart with new data
    });
  }
});
