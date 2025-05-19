
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assessments - Emerald School Nexus</title>
    <meta name="description" content="School Management System - Assessments">
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="stylesheet" href="assets/css/assessments.css">
    <!-- Include Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  </head>
  <body>
    <div class="app-container">
      <!-- Sidebar Navigation -->
      <aside id="sidebar" class="sidebar">
        <div class="sidebar-header">
          <h1 class="sidebar-title">Emerald School</h1>
        </div>
        
        <nav class="sidebar-nav">
          <a href="index.html" class="nav-item">
            <i class="fas fa-home"></i>
            <span>Dashboard</span>
          </a>
          <a href="students.html" class="nav-item">
            <i class="fas fa-users"></i>
            <span>Students</span>
          </a>
          <a href="assessments.html" class="nav-item active">
            <i class="fas fa-book-open"></i>
            <span>Assessments</span>
          </a>
          <a href="reports.html" class="nav-item">
            <i class="fas fa-file-alt"></i>
            <span>Reports</span>
          </a>
          <a href="teachers.html" class="nav-item">
            <i class="fas fa-chalkboard-teacher"></i>
            <span>Teachers</span>
          </a>
          <a href="analytics.html" class="nav-item">
            <i class="fas fa-chart-bar"></i>
            <span>Analytics</span>
          </a>
        </nav>
        
        <div class="sidebar-footer">
          <div class="sidebar-footer-content">
            <h3>Emerald School Nexus</h3>
            <p>Version 1.0</p>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <div class="content-container">
          <!-- Header -->
          <div class="content-header">
            <div>
              <h1>Assessments</h1>
              <p>Create and manage student assessments</p>
            </div>
            
            <div>
              <button class="btn btn-primary" >
                <a href="add-assessment.php" class="fas fa-plus"></a>
                Create Assessment
              </button>
            </div>
          </div>
          
          <!-- Tabs -->
          <div class="tabs-container">
            <div class="tabs">
              <button class="tab-button active" data-tab="upcoming">Upcoming</button>
              <button class="tab-button" data-tab="ongoing">Ongoing</button>
              <button class="tab-button" data-tab="completed">Completed</button>
            </div>
            
            <div class="tab-content">
              <!-- Upcoming Assessments Tab -->
              <div id="upcoming" class="tab-pane active">
                <div class="card">
                  <div class="card-content">
                    <table class="data-table assessments-table">
                      <thead>
                        <tr>
                          <th>Assessment</th>
                          <th>Subject</th>
                          <th>Class</th>
                          <th>Due Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>End of Term Exam</td>
                          <td>Mathematics</td>
                          <td>Form 2A, 2B, 2C</td>
                          <td>15 Jun 2025</td>
                          <td><span class="status-badge scheduled">Scheduled</span></td>
                          <td>
                            <div class="action-buttons">
                              <button class="action-btn edit-btn">
                                <i class="fas fa-edit"></i>
                              </button>
                              <button class="action-btn view-btn">
                                <i class="fas fa-eye"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Mid-Term Assessment</td>
                          <td>English Language</td>
                          <td>Form 3A, 3B</td>
                          <td>22 May 2025</td>
                          <td><span class="status-badge scheduled">Scheduled</span></td>
                          <td>
                            <div class="action-buttons">
                              <button class="action-btn edit-btn">
                                <i class="fas fa-edit"></i>
                              </button>
                              <button class="action-btn view-btn">
                                <i class="fas fa-eye"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Weekly Quiz</td>
                          <td>Science</td>
                          <td>Form 1A</td>
                          <td>10 May 2025</td>
                          <td><span class="status-badge scheduled">Scheduled</span></td>
                          <td>
                            <div class="action-buttons">
                              <button class="action-btn edit-btn">
                                <i class="fas fa-edit"></i>
                              </button>
                              <button class="action-btn view-btn">
                                <i class="fas fa-eye"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <!-- Ongoing Assessments Tab -->
              <div id="ongoing" class="tab-pane">
                <div class="card">
                  <div class="card-content">
                    <table class="data-table assessments-table">
                      <thead>
                        <tr>
                          <th>Assessment</th>
                          <th>Subject</th>
                          <th>Class</th>
                          <th>Due Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>CAT 2</td>
                          <td>Kiswahili</td>
                          <td>Form 4A, 4B, 4C</td>
                          <td>05 May 2025</td>
                          <td><span class="status-badge ongoing">In Progress</span></td>
                          <td>
                            <div class="action-buttons">
                              <button class="action-btn edit-btn">
                                <i class="fas fa-edit"></i>
                              </button>
                              <button class="action-btn view-btn">
                                <i class="fas fa-eye"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Project Assessment</td>
                          <td>Computer Studies</td>
                          <td>Form 3C</td>
                          <td>06 May 2025</td>
                          <td><span class="status-badge ongoing">In Progress</span></td>
                          <td>
                            <div class="action-buttons">
                              <button class="action-btn edit-btn">
                                <i class="fas fa-edit"></i>
                              </button>
                              <button class="action-btn view-btn">
                                <i class="fas fa-eye"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <!-- Completed Assessments Tab -->
              <div id="completed" class="tab-pane">
                <div class="card">
                  <div class="card-content">
                    <table class="data-table assessments-table">
                      <thead>
                        <tr>
                          <th>Assessment</th>
                          <th>Subject</th>
                          <th>Class</th>
                          <th>Completion Date</th>
                          <th>Average Score</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>CAT 1</td>
                          <td>Mathematics</td>
                          <td>Form 2A, 2B, 2C</td>
                          <td>20 Apr 2025</td>
                          <td>68%</td>
                          <td>
                            <div class="action-buttons">
                              <button class="action-btn view-btn">
                                <i class="fas fa-eye"></i>
                              </button>
                              <button class="action-btn report-btn">
                                <i class="fas fa-file-alt"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Term 1 Exam</td>
                          <td>English Language</td>
                          <td>Form 3A, 3B</td>
                          <td>15 Apr 2025</td>
                          <td>75%</td>
                          <td>
                            <div class="action-buttons">
                              <button class="action-btn view-btn">
                                <i class="fas fa-eye"></i>
                              </button>
                              <button class="action-btn report-btn">
                                <i class="fas fa-file-alt"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Weekly Quiz</td>
                          <td>Science</td>
                          <td>Form 1A</td>
                          <td>12 Apr 2025</td>
                          <td>72%</td>
                          <td>
                            <div class="action-buttons">
                              <button class="action-btn view-btn">
                                <i class="fas fa-eye"></i>
                              </button>
                              <button class="action-btn report-btn">
                                <i class="fas fa-file-alt"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Create Assessment Modal -->
          <div id="assessmentModal" class="modal">
            <div class="modal-content">
              <div class="modal-header">
                <h2>Create New Assessment</h2>
                <button class="close-btn">&times;</button>
              </div>
              <div class="modal-body">
                <form id="assessmentForm">
                  <div class="form-group">
                    <label for="assessmentTitle">Assessment Title</label>
                    <input type="text" id="assessmentTitle" required>
                  </div>
                  <div class="form-group">
                    <label for="subject">Subject</label>
                    <select id="subject" required>
                      <option value="">Select Subject</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="English">English Language</option>
                      <option value="Science">Science</option>
                      <option value="Social Studies">Social Studies</option>
                      <option value="Kiswahili">Kiswahili</option>
                      <option value="Computer">Computer Studies</option>
                    </select>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label for="classes">Class(es)</label>
                      <div class="checkbox-group">
                        <div class="checkbox-item">
                          <input type="checkbox" id="form1a" name="classes" value="Form 1A">
                          <label for="form1a">Form 1A</label>
                        </div>
                        <div class="checkbox-item">
                          <input type="checkbox" id="form1b" name="classes" value="Form 1B">
                          <label for="form1b">Form 1B</label>
                        </div>
                        <div class="checkbox-item">
                          <input type="checkbox" id="form2a" name="classes" value="Form 2A">
                          <label for="form2a">Form 2A</label>
                        </div>
                        <div class="checkbox-item">
                          <input type="checkbox" id="form2b" name="classes" value="Form 2B">
                          <label for="form2b">Form 2B</label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="dueDate">Due Date</label>
                      <input type="date" id="dueDate" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="maxMarks">Maximum Marks</label>
                    <input type="number" id="maxMarks" min="1" value="100" required>
                  </div>
                  <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" rows="3"></textarea>
                  </div>
                  <div class="form-actions">
                    <button type="button" class="btn btn-outline" id="cancelBtn">Cancel</button>
                    <button type="submit" class="btn btn-primary">Create Assessment</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    
    <script src="assets/js/main.js"></script>
    <script src="assets/js/assessments.js"></script>
  </body>
</html>
