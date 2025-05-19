<?php
require_once 'config.php';
// Add session/login checks if required (similar to marks.php)

// --- Assume header.php includes Bootstrap, Font Awesome, and styles ---
include 'includes/header.php'; 
?>

<!DOCTYPE html>
<html>
<head>
    <title>Emerald School - Enter Marks</title>
</head>
<body>
<!-- Use the same header structure as marks.php -->
<div class="main-content">
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="page-header">
            <h1 class="page-title">Emerald School Nexus - Enter Marks</h1>
            <p class="page-subtitle">Upload marks for assessments</p>
        </div>

        <!-- Filters Card -->
        <div class="card mb-4">
            <div class="card-content">
                <div class="filter-group-container">
                    <form id="filtersForm">
                        <div class="filter-group">
                            <label for="term">Term:</label>
                            <select name="term" id="term" class="form-select" required>
                                <option value="Term 1">Term 1</option>
                                <option value="Term 2">Term 2</option>
                                <option value="Term 3">Term 3</option>
                            </select>
                        </div>

                        <div class="filter-group">
                            <label for="year">Year:</label>
                            <input type="number" name="year" id="year" class="form-control" value="2025" required>
                        </div>

                        <div class="filter-group">
                            <label for="class">Class:</label>
                            <select name="class" id="class" class="form-select" required>
                                <option value="Primary 4">Primary 4</option>
                                <option value="Primary 5">Primary 5</option>
                            </select>
                        </div>

                        <div class="filter-group">
                            <label for="assessment">Assessment:</label>
                            <select name="assessment_name" id="assessment_name" class="form-select" required>
                                <?php foreach($assessments as $a): ?>
                                <option value="<?= $a['assessment_id'] ?>">
                                    <?= htmlspecialchars($a['assessment_name']) ?>
                                </option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <button type="button" onclick="loadStudents()" class="btn btn-secondary">
                            <i class="fas fa-users mr-2"></i>Load Students
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Marks Form Card -->
        <div class="card">
            <div class="card-content">
                <form id="marksForm" action="save_marks.php" method="POST">
                    <div class="table-responsive">
                        <table class="data-table marks-table">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Marks</th>
                                    <th>Grade</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($student as $student): ?>
                                <tr>
                                    <td><?= htmlspecialchars($student['first_name'].' '.$student['last_name']) ?></td>
                                    <td>
                                        <input type="number" class="form-control" 
                                               name="marks[<?= $student['student_id'] ?>]" 
                                               min="0" max="100" required>
                                    </td>
                                    <td>
                                        <select name="grades[<?= $student['student_id'] ?>]" class="form-select" required>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                        </select>
                                    </td>
                                    <td>
                                        <textarea name="comments[<?= $student['student_id'] ?>]" 
                                                  class="form-control" rows="2"></textarea>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>

                    <input type="hidden" name="assessment_id" value="<?= $_GET['assessment'] ?? '' ?>">
                    <button type="submit" class="btn btn-primary mt-4">
                        <i class="fas fa-save mr-2"></i>Save All Marks
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
function loadStudents() {
    const formData = new FormData(document.getElementById('filtersForm'));
    const params = new URLSearchParams(formData);
    window.location = `?${params.toString()}`;
}
</script>

<?php include 'includes/footer.php'; ?>
</body>
</html>