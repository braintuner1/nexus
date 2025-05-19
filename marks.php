<?php
require_once 'config.php';
requireLogin();

// Check if user is a teacher
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'teacher') {
    setFlashMessage('error', 'Access denied. Only teachers can access this page.');
    header("Location: index.php");
    exit;
}

// Get teacher's assigned subjects and classes
$teacherClasses = isset($_SESSION['class_assigned']) ? explode(',', $_SESSION['class_assigned']) : [];

// Set page variables
$pageTitle = 'Student Marks - Emerald School Nexus';
$pageDescription = 'Upload and manage student marks';
$pageHeader = 'Student Marks';
$pageSubheader = 'Upload and manage marks for assessments';
$additionalCSS = ['assets/css/marks.css'];

$students = [];
$assessments = [];

try {
    // Get assessments for dropdown
    $stmt = $conn->prepare("SELECT assessment_id, assessment_name FROM assessments");
    $stmt->execute();
    $assessments = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    $subjects = [];
    try {
        $stmt = $conn->prepare("SELECT subject_id, subject_taught FROM subjects");
        $stmt->execute();
        $subjects = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    } catch (Exception $e) {
        die("Database error fetching subjects: " . $e->getMessage());
    }

    // Get students based on filters
    if(isset($_GET['class'])) {
        $stmt = $conn->prepare("SELECT student_id, first_name, last_name 
                              FROM students WHERE class = ?");
        $stmt->bind_param("s", $_GET['class']);
        $stmt->execute();
        $students = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
} catch(Exception $e) {
    die("Database error: " . $e->getMessage());
}

include 'includes/header.php';

// Get current year for default selection
$currentYear = date('Y');
?>

<head>
    <link rel="stylesheet" href="styles.css">
    <style>
        /* Modern green and white theme */
        :root {
            --primary-green: #1e8449;
            --light-green: #27ae60;
            --dark-green: #196f3d;
            --accent-green: #2ecc71;
            --lightest-green: #e8f8f5;
            --white: #ffffff;
            --light-gray: #f5f9f7;
            --border-color: #d5e8dc;
            --text-dark: #2c3e50;
            --text-light: #7f8c8d;
            --shadow: 0 4px 12px rgba(30, 132, 73, 0.15);
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: var(--text-dark);
            line-height: 1.6;
            background: var(--light-gray);
            margin: 0;
            padding: 20px;
        }

        .page-header {
            text-align: center;
            margin-bottom: 30px;
            color: var(--primary-green);
        }

        .page-header h1 {
            font-size: 28px;
            margin-bottom: 5px;
        }

        .page-header p {
            color: var(--text-light);
            font-size: 16px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: var(--white);
            border-radius: 12px;
            box-shadow: var(--shadow);
        }

        /* Filter section styling */
        .filter-section {
            margin-bottom: 30px;
            background: var(--white);
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 2px 15px rgba(30, 132, 73, 0.1);
            border: 1px solid var(--border-color);
        }

        .filter-section h3 {
            color: var(--primary-green);
            margin-top: 0;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--light-green);
        }

        .filters-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: space-between;
        }

        .filter-group {
            flex: 1 1 200px;
            margin-bottom: 15px;
        }

        .filter-group label {
            display: block;
            font-weight: 600;
            color: var(--primary-green);
            margin-bottom: 8px;
        }

        select, input[type="number"] {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-size: 14px;
            transition: all 0.3s ease;
            background: var(--white);
        }

        select:focus, input[type="number"]:focus {
            border-color: var(--light-green);
            outline: 0;
            box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.25);
        }

        .btn-container {
            text-align: center;
            margin-top: 25px;
        }

        button {
            padding: 12px 30px;
            border: none;
            border-radius: 6px;
            background: var(--primary-green);
            color: white;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        button:hover {
            background: var(--dark-green);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(30, 132, 73, 0.2);
        }

        /* Table styling */
        .marks-container {
            margin-top: 30px;
            background: var(--white);
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 2px 15px rgba(30, 132, 73, 0.1);
        }

        .marks-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 15px rgba(30, 132, 73, 0.05);
        }

        .marks-table th {
            background: var(--primary-green);
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }

        .marks-table td {
            padding: 12px 15px;
            border-bottom: 1px solid var(--border-color);
        }

        .marks-table tr:nth-child(even) {
            background-color: var(--lightest-green);
        }

        .marks-table tr:last-child td {
            border-bottom: none;
        }

        .marks-table tr:hover {
            background-color: var(--lightest-green);
        }

        .form-control {
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            width: 100px;
            transition: all 0.3s ease;
        }

        .form-control:focus {
            border-color: var(--light-green);
            box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.25);
            outline: 0;
        }

        .form-select {
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            background: white;
            width: 100px;
            transition: all 0.3s ease;
        }

        .form-select:focus {
            border-color: var(--light-green);
            box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.25);
            outline: 0;
        }

        .comment-input {
            width: 250px;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            resize: vertical;
            min-height: 60px;
            transition: all 0.3s ease;
        }

        .comment-input:focus {
            border-color: var(--light-green);
            box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.25);
            outline: 0;
        }

        #marksForm button[type="submit"] {
            margin-top: 25px;
            background: var(--accent-green);
        }

        #marksForm button[type="submit"]:hover {
            background: var(--light-green);
        }

        /* Status indicators */
        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 5px;
        }

        .status-excellent {
            background-color: #2ecc71;
        }

        .status-good {
            background-color: #3498db;
        }

        .status-average {
            background-color: #f39c12;
        }

        .status-poor {
            background-color: #e74c3c;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
            .filter-group {
                flex: 1 1 100%;
            }
            
            .marks-table {
                display: block;
                overflow-x: auto;
            }
            
            .container {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        
        
        <div class="filter-section">
            <h3>Select Assessment Details</h3>
            <form id="filtersForm" action="save_marks.php" method="POST">
                
                <div class="filters-container">
                    <div class="filter-group">
                        <label for="term">Term:</label>
                        <select id="term" name="term" required>
                            <option value="Term 1">Term 1</option>
                            <option value="Term 2">Term 2</option>
                            <option value="Term 3">Term 3</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="year">Year:</label>
                        <input type="number" id="year" name="year" value="<?= $currentYear ?>" required>
                    </div>
                    
                    <!-- In the class dropdown section of marks.php -->
<div class="filter-group">
    <label for="class">Class:</label>
    <select id="class" name="class" required>
        <option value="">Select Class</option>
        <?php
        $classes = [
            'Baby Class', 'Middle Class', 'Top Class',
            'Primary 1', 'Primary 2', 'Primary 3',
            'Primary 4', 'Primary 5', 'Primary 6', 'Primary 7'
        ];
        
        $selectedClass = $_GET['class'] ?? '';
        foreach ($classes as $class) {
            $selected = ($class === $selectedClass) ? 'selected' : '';
            echo "<option value='$class' $selected>$class</option>";
        }
        ?>
    </select>
</div>
                
                   <div class="filter-group">
    <label for="subject_id">Subject:</label>
    <select id="subject_id" name="subject_id" required>
        <option value="">Select Subject</option>
        <?php
        $subjects = [
            'English' => 'English',
            'Mathematics' => 'Mathematics',
            'Science' => 'Science',
            'Social Studies' => 'Social Studies'
        ];
        
        $selectedSubject = $_GET['subject_id'] ?? '';
        foreach ($subjects as $code => $name) {
            $selected = ($code === $selectedSubject) ? 'selected' : '';
            echo "<option value='" . htmlspecialchars($code) . "' $selected>" 
                . htmlspecialchars($name) . "</option>";
        }
        ?>
    </select>
</div>
                    
                  <div class="filter-group">
    <label for="subject_id">Subject:</label>
    <select id="subject_id" name="subject_id" required>
        <option value="">Select Subject</option>
        <?php foreach($subjects as $s): ?>
            <option value="<?= (int)$s['subject_id'] ?>" 
                <?= ((int)$s['subject_id'] === (int)($_GET['subject_id'] ?? 0)) ? 'selected' : '' ?>>
                <?= htmlspecialchars($s['subject_taught']) ?>
            </option>
        <?php endforeach; ?>
    </select>
</div>
                
                <div class="btn-container">
                    <button type="button" onclick="loadStudents()">Load Students</button>
                </div>
            </form>
        </div>

        <div class="marks-container">
    <?php if(count($students) > 0): ?>
        <h3>Enter Student Marks</h3>
        <form id="marksForm" action="save_marks.php" method="POST">
            <table class="marks-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Marks</th>
                        <th>Grade</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($students as $student): ?>
                    <tr>
                        <td><?= htmlspecialchars($student['first_name'].' '.$student['last_name']) ?></td>
                        <td>
                            <input type="number" class="form-control mark-input" 
                                name="marks[<?= $student['student_id'] ?>]" 
                                min="0" max="100" required>
                        </td>
                        <td>
                            <select name="grades[<?= $student['student_id'] ?>]" 
                                    class="form-select grade-select" required>
                                <option value="D1">D1</option>
                                <option value="D2">D2</option>
                                <option value="C3">C3</option>
                                <option value="C4">C4</option>
                                <option value="C5">C5</option>
                                <option value="C6">C6</option>
                                <option value="P7">P7</option>
                                <option value="P8">P8</option>
                                <option value="F9">F9</option>
                            </select>
                        </td>
                        <td>
                            <textarea name="comments[<?= $student['student_id'] ?>]" 
                                    class="form-control comment-input" rows="2"></textarea>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            
            <!-- FIXED: Ensure we pass the correct session values -->
            <input type="hidden" name="assessment_id" value="<?= $_GET['assessment_id'] ?? '' ?>">
            <input type="hidden" name="term" value="<?= $_GET['term'] ?? '' ?>">
            <input type="hidden" name="year" value="<?= $_GET['year'] ?? '' ?>">
            <input type="hidden" name="class" value="<?= $_GET['class'] ?? '' ?>">
           
            <!-- FIXED: Added teacher_id from session -->
            <input type="hidden" name="teacher_id" value="<?= $_SESSION['id'] ?? '' ?>">
            
            <div class="btn-container">
                <button type="submit">Save All Marks</button>
            </div>
        </form>
    <?php else: ?>
        <?php if(isset($_GET['class'])): ?>
            <div class="alert alert-info">
                No students found for the selected class. Please check your selection.
            </div>
        <?php else: ?>
            <div class="alert alert-info">
                Please select filters and click "Load Students" to begin.
            </div>
        <?php endif; ?>
    <?php endif; ?>
</div>
    <script>
    function loadStudents() {
        const formData = new FormData(document.getElementById('filtersForm'));
        const params = new URLSearchParams(formData);
        
        window.location = `?${params.toString()}`;
    }
    
    // Grade calculation based on Ugandan system
    function getGrade(mark) {
        mark = parseInt(mark) || 0;
        if (mark >= 90) return 'D1';
        if (mark >= 80) return 'D2';
        if (mark >= 70) return 'C3';
        if (mark >= 60) return 'C4';
        if (mark >= 50) return 'C5';
        if (mark >= 40) return 'C6';
        if (mark >= 30) return 'P7';
        if (mark >= 20) return 'P8';
        return 'F9';
    }

    // Comment generation based on grade
    function getComment(grade) {
        const comments = {
            'D1': 'Excellent performance! Maintain this outstanding work!',
            'D2': 'Very good work! Keep pushing for excellence!',
            'C3': 'Good performance, aim higher in the next assessment!',
            'C4': 'Satisfactory work, but more effort needed!',
            'C5': 'Average performance, requires more practice!',
            'C6': 'Below average, needs regular revision!',
            'P7': 'Poor performance, urgent improvement needed!',
            'P8': 'Very weak performance, attend remedial classes!',
            'F9': 'Failed! Immediate parent-teacher consultation required!'
        };
        return comments[grade] || 'No comment available';
    }

    // Auto-update grades and comments when marks change
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.mark-input').forEach(input => {
            // Set initial grade and comment when page loads
            const initialMark = input.value;
            const grade = getGrade(initialMark);
            const row = input.closest('tr');
            
            if (row.querySelector('.grade-select')) {
                row.querySelector('.grade-select').value = grade;
            }
            
            if (row.querySelector('.comment-input') && initialMark) {
                row.querySelector('.comment-input').value = getComment(grade);
            }

            // Update grade and comment when mark changes
            input.addEventListener('input', function() {
                const mark = this.value;
                const grade = getGrade(mark);
                const row = this.closest('tr');
                
                // Update grade select
                if (row.querySelector('.grade-select')) {
                    row.querySelector('.grade-select').value = grade;
                }
                
                // Update comment textarea
                if (row.querySelector('.comment-input')) {
                    row.querySelector('.comment-input').value = getComment(grade);
                }
            });
        });
    });
    </script>
</body>

<?php include 'includes/footer.php'; ?>