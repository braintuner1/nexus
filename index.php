
<?php
require_once 'config.php';

// Require login for all users
requireLogin();

// Page configuration
$pageTitle = 'Dashboard - Emerald School Nexus';
$pageDescription = 'School Management System Dashboard';
$pageHeader = 'Dashboard';
$pageSubheader = 'Welcome back, ' . $_SESSION['username'];

// Different actions based on role
if ($_SESSION['role'] === 'admin') {
    $headerAction = '
        <a href="add-teachers.php" class="btn btn-primary">
            <i class="fas fa-user-plus"></i>
            Add New Teacher
        </a>
    ';
} else {
    $headerAction = '
        <a href="marks.php" class="btn btn-primary">
            <i class="fas fa-check-square"></i>
            Enter Marks
        </a>
    ';
}

$additionalJS = [];

// Include the header
include 'includes/header.php';
?>

<!-- Stats Cards -->
<div class="stats-grid">
    <?php if ($_SESSION['role'] === 'admin'): ?>
    <div class="stat-card emerald-gradient">
        <div class="stat-info">
            <p class="stat-title">Total Students</p>
            <h3 class="stat-value">524</h3>
            <div class="stat-trend positive">
                <span>+5.2%</span>
                <span class="trend-label">from last term</span>
            </div>
        </div>
        <div class="stat-icon">
            <i class="fas fa-users"></i>
        </div>
    </div>
    
    <div class="stat-card blue-gradient">
        <div class="stat-info">
            <p class="stat-title">Total Teachers</p>
            <h3 class="stat-value">42</h3>
        </div>
        <div class="stat-icon">
            <i class="fas fa-chalkboard-teacher"></i>
        </div>
    </div>
    
    <div class="stat-card amber-gradient">
        <div class="stat-info">
            <p class="stat-title">Assessments Completed</p>
            <h3 class="stat-value">8</h3>
            <div class="stat-trend positive">
                <span>+12.5%</span>
                <span class="trend-label">from last term</span>
            </div>
        </div>
        <div class="stat-icon">
            <i class="fas fa-clipboard-check"></i>
        </div>
    </div>
    
    <div class="stat-card purple-gradient">
        <div class="stat-info">
            <p class="stat-title">Pending Reports</p>
            <h3 class="stat-value">3</h3>
        </div>
        <div class="stat-icon">
            <i class="fas fa-file-alt"></i>
        </div>
    </div>
    <?php else: ?>
    <!-- Teacher-specific stats -->
    <div class="stat-card emerald-gradient">
        <div class="stat-info">
            <p class="stat-title">Your Classes</p>
            <h3 class="stat-value"><?php echo count(explode(',', $_SESSION['class_assigned'])); ?></h3>
        </div>
        <div class="stat-icon">
            <i class="fas fa-users"></i>
        </div>
    </div>
    
    <div class="stat-card blue-gradient">
        <div class="stat-info">
            <p class="stat-title">Your Subjects</p>
            <h3 class="stat-value"><?php echo count(explode(',', $_SESSION['subject_taught'])); ?></h3>
        </div>
        <div class="stat-icon">
            <i class="fas fa-book"></i>
        </div>
    </div>
    
    <div class="stat-card amber-gradient">
        <div class="stat-info">
            <p class="stat-title">Pending Marks</p>
            <h3 class="stat-value">2</h3>
        </div>
        <div class="stat-icon">
            <i class="fas fa-clipboard"></i>
        </div>
    </div>
    <?php endif; ?>
</div>

<!-- Quick Access Cards -->
<h2 class="section-title">Quick Access</h2>
<div class="cards-grid">
    <?php if ($_SESSION['role'] === 'admin'): ?>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Students</h3>
            <div class="card-icon emerald-bg">
                <i class="fas fa-users"></i>
            </div>
        </div>
        <div class="card-content">
            <p>Manage student records, add new students, and view performance data.</p>
        </div>
        <div class="card-footer">
            <a href="students.php" class="btn btn-outline">Manage Students</a>
        </div>
    </div>
    
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Teachers</h3>
            <div class="card-icon blue-bg">
                <i class="fas fa-chalkboard-teacher"></i>
            </div>
        </div>
        <div class="card-content">
            <p>Add, edit, and manage teacher records and assignments.</p>
        </div>
        <div class="card-footer">
            <a href="add-teachers.php" class="btn btn-outline">Manage Teachers</a>
        </div>
    </div>
    
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Report Cards</h3>
            <div class="card-icon amber-bg">
                <i class="fas fa-file-alt"></i>
            </div>
        </div>
        <div class="card-content">
            <p>Generate student report cards based on assessment results.</p>
        </div>
        <div class="card-footer">
            <a href="reports.php" class="btn btn-outline">Generate Reports</a>
        </div>
    </div>
    <?php else: ?>
    <!-- Teacher specific quick access -->
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Enter Marks</h3>
            <div class="card-icon emerald-bg">
                <i class="fas fa-edit"></i>
            </div>
        </div>
        <div class="card-content">
            <p>Enter and manage marks for your subjects and classes.</p>
        </div>
        <div class="card-footer">
            <a href="marks.php" class="btn btn-outline">Enter Marks</a>
        </div>
    </div>
    
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">View Reports</h3>
            <div class="card-icon blue-bg">
                <i class="fas fa-chart-bar"></i>
            </div>
        </div>
        <div class="card-content">
            <p>View performance reports for your classes.</p>
        </div>
        <div class="card-footer">
            <a href="reports.php" class="btn btn-outline">View Reports</a>
        </div>
    </div>
    <?php endif; ?>
</div>

<!-- Recent Activities -->
<h2 class="section-title">Recent Activities</h2>
<div class="card activities-card">
    <div class="card-content">
        <ul class="activities-list">
            <?php
            // In a real application, these would be fetched from the database
            // Different activities shown based on role
            if ($_SESSION['role'] === 'admin') {
                $activities = [
                    [
                        'icon' => 'fas fa-book-open',
                        'icon_bg' => 'emerald-bg',
                        'title' => 'Mid-Term Assessments Created',
                        'description' => 'Form 3 mid-term assessment has been added',
                        'time' => '2 hours ago'
                    ],
                    [
                        'icon' => 'fas fa-users',
                        'icon_bg' => 'blue-bg',
                        'title' => 'New Students Added',
                        'description' => '5 new students have been added to Form 1C',
                        'time' => 'Yesterday'
                    ],
                    [
                        'icon' => 'fas fa-award',
                        'icon_bg' => 'amber-bg',
                        'title' => 'Reports Generated',
                        'description' => 'End-term reports for Form 4 have been generated',
                        'time' => '3 days ago'
                    ]
                ];
            } else {
                // Teacher-specific activities
                $activities = [
                    [
                        'icon' => 'fas fa-edit',
                        'icon_bg' => 'emerald-bg',
                        'title' => 'Marks Uploaded',
                        'description' => 'You uploaded marks for Form 2A Mathematics',
                        'time' => 'Yesterday'
                    ],
                    [
                        'icon' => 'fas fa-clipboard-check',
                        'icon_bg' => 'blue-bg',
                        'title' => 'Assessment Complete',
                        'description' => 'Form 3B Physics CAT 1 marking completed',
                        'time' => '2 days ago'
                    ]
                ];
            }
            
            foreach($activities as $activity):
            ?>
                <li class="activity-item">
                    <div class="activity-icon <?php echo $activity['icon_bg']; ?>">
                        <i class="<?php echo $activity['icon']; ?>"></i>
                    </div>
                    <div class="activity-details">
                        <p class="activity-title"><?php echo $activity['title']; ?></p>
                        <p class="activity-description"><?php echo $activity['description']; ?></p>
                        <p class="activity-time"><?php echo $activity['time']; ?></p>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</div>

<?php
// Include the footer
include 'includes/footer.php';
?>
