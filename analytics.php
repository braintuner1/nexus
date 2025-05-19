
<?php
require_once 'config.php';
requireLogin();

// Set page variables
$pageTitle = 'Analytics - Emerald School Nexus';
$pageDescription = 'School Management System Analytics';
$pageHeader = 'Analytics';
$pageSubheader = 'View performance metrics and trends';
$additionalJS = ['assets/js/analytics.js'];

include 'includes/header.php';
?>

<!-- Analytics Tabs -->
<div class="tabs-container">
  <div class="tabs">
    <button class="tab-button active" data-tab="performance">Performance Overview</button>
    <button class="tab-button" data-tab="subjects">Subject Analysis</button>
    <button class="tab-button" data-tab="trends">Performance Trends</button>
  </div>
  
  <div class="tab-content">
    <!-- Performance Overview Tab -->
    <div id="performance" class="tab-pane active">
      <div class="card">
        <div class="card-content">
          <h3>Class Performance Overview</h3>
          <div class="chart-container">
            <canvas id="classPerformanceChart"></canvas>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Subject Analysis Tab -->
    <div id="subjects" class="tab-pane">
      <div class="card">
        <div class="card-content">
          <h3>Subject Performance Analysis</h3>
          <div class="chart-container">
            <canvas id="subjectPerformanceChart"></canvas>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Performance Trends Tab -->
    <div id="trends" class="tab-pane">
      <div class="card">
        <div class="card-content">
          <h3>Performance Trends Over Terms</h3>
          <div class="chart-container">
            <canvas id="trendChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Additional Analytics Cards -->
<div class="two-column-grid">
  <div class="card">
    <div class="card-content">
      <h3>Top Performing Students</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Class</th>
            <th>Average Score</th>
          </tr>
        </thead>
        <tbody>
          <?php
          // In a real application, you would fetch this data from the database
          $topStudents = [
            ['name' => 'Jane Doe', 'class' => 'Form 4A', 'score' => '92%'],
            ['name' => 'John Smith', 'class' => 'Form 3B', 'score' => '89%'],
            ['name' => 'Mary Johnson', 'class' => 'Form 4A', 'score' => '87%']
          ];
          
          foreach ($topStudents as $student) {
            echo "<tr>
                    <td>{$student['name']}</td>
                    <td>{$student['class']}</td>
                    <td>{$student['score']}</td>
                  </tr>";
          }
          ?>
        </tbody>
      </table>
    </div>
  </div>
  
  <div class="card">
    <div class="card-content">
      <h3>Attendance Overview</h3>
      <div class="chart-container">
        <canvas id="attendanceChart"></canvas>
      </div>
    </div>
  </div>
</div>

<?php include 'includes/footer.php'; ?>
