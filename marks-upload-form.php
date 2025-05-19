<?php
require_once 'config.php';

// Fetch students and assessments from database
$students = [];
$assessments = [];

try {
    // Get assessments for dropdown
    $stmt = $conn->prepare("SELECT assessment_id, assessment_name FROM assessments");
    $stmt->execute();
    $assessments = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

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
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
    <title>Emerald School - Enter Marks</title>
    <style>
        .marks-table { width: 100%; border-collapse: collapse; }
        .marks-table th, .marks-table td { padding: 8px; border: 1px solid #ddd; }
        .filter-section { margin-bottom: 20px; background: #f5f5f5; padding: 15px; }
        .filter-group { margin-right: 20px; display: inline-block; }
    </style>
</head>
<body>
    <h1>Emerald School Nexus - Enter Marks</h1>
    
    <div class="filter-section">
        <form id="filtersForm">
            <div class="filter-group">
                <label>Term:
                    <select name="term" required>
                        <option value="Term 1">Term 1</option>
                        <option value="Term 2">Term 2</option>
                        <option value="Term 3">Term 3</option>
                    </select>
                </label>
            </div>
            
            <div class="filter-group">
                <label>Year:
                    <input type="number" name="year" value="2025" required>
                </label>
            </div>
            
            <div class="filter-group">
                <label>Class:
                    <select name="class" required>
                        <option value="Primary 4">Primary 4</option>
                        <option value="Primary 5">Primary 5</option>
                    </select>
                </label>
            </div>
            
            <div class="filter-group">
                <label>Assessment:
                    <select name="assessment" required>
                        <?php foreach($assessments as $a): ?>
                        <option value="<?= $a['assessment_id'] ?>">
                            <?= htmlspecialchars($a['assessment_name']) ?>
                        </option>
                        <?php endforeach; ?>
                    </select>
                </label>
            </div>
            
            <button type="button" onclick="loadStudents()">Load Students</button>
        </form>
    </div>

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
                        <input type="number" name="marks[<?= $student['student_id'] ?>]" 
                               min="0" max="100" required>
                    </td>
                    <td>
                        <select name="grades[<?= $student['student_id'] ?>]" required>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </td>
                    <td>
                        <textarea name="comments[<?= $student['student_id'] ?>]" 
                                  rows="2"></textarea>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        
        <input type="hidden" name="assessment_id" 
               value="<?= $_GET['assessment'] ?? '' ?>">
        <button type="submit">Save All Marks</button>
    </form>

    <script>
    function loadStudents() {
        const formData = new FormData(document.getElementById('filtersForm'));
        const params = new URLSearchParams(formData);
        
        window.location = `?${params.toString()}`;
    }
    </script>
</body>
</html>