
document.addEventListener('DOMContentLoaded', function() {
  // Sample data for charts
  const performanceData = {
    labels: ['Form 1', 'Form 2', 'Form 3', 'Form 4'],
    datasets: [
      {
        label: 'Average Score',
        data: [67, 72, 65, 70],
        backgroundColor: '#10b981',
      },
      {
        label: 'Pass Rate (%)',
        data: [78, 82, 75, 80],
        backgroundColor: '#60a5fa',
      }
    ]
  };

  const subjectPerformanceData = {
    labels: ['Mathematics', 'English', 'Science', 'Social Studies', 'Kiswahili'],
    datasets: [
      {
        label: 'Average Score',
        data: [62, 75, 68, 71, 73],
        backgroundColor: '#10b981',
      }
    ]
  };
  
  const termTrendData = {
    labels: ['Term 1', 'Term 2', 'Term 3'],
    datasets: [
      {
        label: 'Average Score',
        data: [65, 68, 71],
        borderColor: '#10b981',
        tension: 0.4,
        fill: false
      }
    ]
  };
  
  const attendanceData = {
    labels: ['Form 1', 'Form 2', 'Form 3', 'Form 4'],
    datasets: [
      {
        label: 'Attendance Rate (%)',
        data: [92, 94, 90, 91],
        backgroundColor: '#8884d8',
      }
    ]
  };
  
  // Create charts
  if (document.getElementById('classPerformanceChart')) {
    new Chart(document.getElementById('classPerformanceChart'), {
      type: 'bar',
      data: performanceData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }
    });
  }
  
  if (document.getElementById('subjectPerformanceChart')) {
    new Chart(document.getElementById('subjectPerformanceChart'), {
      type: 'bar',
      data: subjectPerformanceData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }
    });
  }
  
  if (document.getElementById('trendChart')) {
    new Chart(document.getElementById('trendChart'), {
      type: 'line',
      data: termTrendData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }
    });
  }
  
  if (document.getElementById('attendanceChart')) {
    new Chart(document.getElementById('attendanceChart'), {
      type: 'bar',
      data: attendanceData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }
    });
  }
});
