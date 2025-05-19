
<?php
require_once 'config.php';
requireLogin();

// Set page variables
$pageTitle = 'Reports - Emerald School Nexus';
$pageDescription = 'School Management System Reports';
$pageHeader = 'Reports';
$pageSubheader = 'Generate and manage student reports';
$additionalJS = ['assets/js/reports.js'];

// Generate Report action button
$headerAction = '<a class="btn btn-primary" href="report_card.php" id="generateReportBtn">
                    <i class="fas fa-file-export"></i>
                    Generate New Report
                </a>';

include 'includes/header.php';
?>

<!-- Reports Tabs -->
<div class="tabs-container">
  <div class="tabs">
    <button class="tab-button active" data-tab="academic">Academic Reports</button>
    <button class="tab-button" data-tab="progress">Progress Reports</button>
    <button class="tab-button" data-tab="behavior">Behavior Reports</button>
  </div>
  
  <div class="tab-content">
    <!-- Academic Reports Tab -->
    <div id="academic" class="tab-pane active">
      <div class="card">
        <div class="card-content">
          <h3>Term End Academic Reports</h3>
          <p class="mb-4">Generate comprehensive academic performance reports for students.</p>
          
          <div class="filters-container">
            <div class="filter-group">
              <label for="class-select">Class:</label>
              <select id="class-select" class="form-select">
                <option value="">All Classes</option>
                <option value="Form 1A">Form 1A</option>
                <option value="Form 1B">Form 1B</option>
                <option value="Form 2A">Form 2A</option>
                <option value="Form 2B">Form 2B</option>
                <option value="Form 3A">Form 3A</option>
                <option value="Form 3B">Form 3B</option>
                <option value="Form 4A">Form 4A</option>
                <option value="Form 4B">Form 4B</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label for="term-select">Term:</label>
              <select id="term-select" class="form-select">
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label for="year-select">Year:</label>
              <select id="year-select" class="form-select">
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>
          
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Class</th>
                  <th>Term</th>
                  <th>Date Generated</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <?php
                // In a real application, you would fetch this data from the database
                $reports = [
                  [
                    'name' => 'Form 4A Term 1 Report',
                    'class' => 'Form 4A',
                    'term' => 'Term 1',
                    'date' => '03 Apr 2025',
                    'status' => 'Completed'
                  ],
                  [
                    'name' => 'Form 3B Term 1 Report',
                    'class' => 'Form 3B',
                    'term' => 'Term 1',
                    'date' => '02 Apr 2025',
                    'status' => 'Completed'
                  ],
                  [
                    'name' => 'Form 2A Term 1 Report',
                    'class' => 'Form 2A',
                    'term' => 'Term 1',
                    'date' => '01 Apr 2025',
                    'status' => 'Processing'
                  ]
                ];
                
                foreach ($reports as $report) {
                  $statusClass = $report['status'] === 'Completed' ? 'success' : 'warning';
                  $disabled = $report['status'] !== 'Completed' ? 'disabled' : '';
                  
                  echo "<tr>
                          <td>{$report['name']}</td>
                          <td>{$report['class']}</td>
                          <td>{$report['term']}</td>
                          <td>{$report['date']}</td>
                          <td><span class='badge {$statusClass}'>{$report['status']}</span></td>
                          <td>
                            <div class='actions'>
                              <button class='btn-icon' title='View Report' {$disabled}>
                                <i class='fas fa-eye'></i>
                              </button>
                              <button class='btn-icon' title='Download Report' {$disabled}>
                                <i class='fas fa-download'></i>
                              </button>
                              <button class='btn-icon' title='Print Report' {$disabled}>
                                <i class='fas fa-print'></i>
                              </button>
                            </div>
                          </td>
                        </tr>";
                }
                ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Progress Reports Tab -->
    <div id="progress" class="tab-pane">
      <div class="card">
        <div class="card-content">
          <h3>Student Progress Reports</h3>
          <p class="mb-4">Track student progress over time, highlighting areas of improvement.</p>
          
          <div class="filters-container">
            <div class="filter-group">
              <label for="student-select">Student:</label>
              <select id="student-select" class="form-select">
                <option value="">Select Student</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Robert Johnson">Robert Johnson</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label for="subject-select">Subject:</label>
              <select id="subject-select" class="form-select">
                <option value="">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Science">Science</option>
                <option value="Social Studies">Social Studies</option>
              </select>
            </div>
            
            <button class="btn btn-outline" id="viewProgressBtn">
              <i class="fas fa-search"></i>
              View Progress
            </button>
          </div>
          
          <div class="chart-container mt-4">
            <canvas id="progressChart"></canvas>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Behavior Reports Tab -->
    <div id="behavior" class="tab-pane">
      <div class="card">
        <div class="card-content">
          <h3>Student Behavior Reports</h3>
          <p class="mb-4">Track student behavior, discipline records, and attendance.</p>
          
          <div class="filters-container">
            <div class="filter-group">
              <label for="behavior-class-select">Class:</label>
              <select id="behavior-class-select" class="form-select">
                <option value="">All Classes</option>
                <option value="Form 1A">Form 1A</option>
                <option value="Form 1B">Form 1B</option>
                <option value="Form 2A">Form 2A</option>
                <option value="Form 2B">Form 2B</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label for="behavior-period-select">Period:</label>
              <select id="behavior-period-select" class="form-select">
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="This Term">This Term</option>
                <option value="This Year">This Year</option>
              </select>
            </div>
            
            <button class="btn btn-outline" id="applyBehaviorFiltersBtn">
              <i class="fas fa-filter"></i>
              Apply Filters
            </button>
          </div>
          
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Attendance</th>
                  <th>Discipline Records</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <?php
                // In a real application, you would fetch this data from the database
                $students = [
                  [
                    'name' => 'John Doe',
                    'class' => 'Form 1A',
                    'attendance' => '95%',
                    'disciplineRecords' => 0
                  ],
                  [
                    'name' => 'Jane Smith',
                    'class' => 'Form 1A',
                    'attendance' => '92%',
                    'disciplineRecords' => 1
                  ],
                  [
                    'name' => 'Robert Johnson',
                    'class' => 'Form 1B',
                    'attendance' => '88%',
                    'disciplineRecords' => 2
                  ]
                ];
                
                foreach ($students as $student) {
                  echo "<tr>
                          <td>{$student['name']}</td>
                          <td>{$student['class']}</td>
                          <td>{$student['attendance']}</td>
                          <td>{$student['disciplineRecords']}</td>
                          <td>
                            <div class='actions'>
                              <button class='btn-icon' title='View Details'>
                                <i class='fas fa-eye'></i>
                              </button>
                              <button class='btn-icon' title='Download Report'>
                                <i class='fas fa-download'></i>
                              </button>
                            </div>
                          </td>
                        </tr>";
                }
                ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Recent Reports -->
<h2 class="section-title">Recent Report History</h2>
<div class="card">
  <div class="card-content">
    <ul class="activities-list">
      <li class="activity-item">
        <div class="activity-icon emerald-bg">
          <i class="fas fa-file-alt"></i>
        </div>
        <div class="activity-details">
          <p class="activity-title">Term 1 Reports Generated</p>
          <p class="activity-description">Form 4A term 1 reports have been generated</p>
          <p class="activity-time">2 hours ago</p>
        </div>
      </li>
      <li class="activity-item">
        <div class="activity-icon blue-bg">
          <i class="fas fa-file-alt"></i>
        </div>
        <div class="activity-details">
          <p class="activity-title">Progress Reports Updated</p>
          <p class="activity-description">Mid-term progress reports for Form 3B updated</p>
          <p class="activity-time">Yesterday</p>
        </div>
      </li>
      <li class="activity-item">
        <div class="activity-icon amber-bg">
          <i class="fas fa-file-alt"></i>
        </div>
        <div class="activity-details">
          <p class="activity-title">Behavior Reports Generated</p>
          <p class="activity-description">Monthly behavior reports for Form 1A and 1B generated</p>
          <p class="activity-time">3 days ago</p>
        </div>
      </li>
    </ul>
  </div>
</div>

<?php include 'includes/footer.php'; ?>
