<?php
require_once 'config.php';
requireLogin();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Assessment - Emerald School Nexus</title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="stylesheet" href="assets/css/forms.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="app-container">
        <?php include 'includes/sidebar.php'; ?>

        <main class="main-content">
            <div class="content-container">
                <!-- Page Header -->
                <div class="content-header">
                    <div>
                        <h1>Add New Assessment</h1>
                        <p>Fill in the form below to create a new assessment</p>
                    </div>
                </div>

                <!-- Status Messages -->
                <?php if (isset($_SESSION['error'])): ?>
                    <div class="alert alert-danger"><?= $_SESSION['error'] ?></div>
                    <?php unset($_SESSION['error']); ?>
                <?php endif; ?>
                
                <?php if (isset($_SESSION['success'])): ?>
                    <div class="alert alert-success"><?= $_SESSION['success'] ?></div>
                    <?php unset($_SESSION['success']); ?>
                <?php endif; ?>

                <!-- Assessment Form -->
                <div class="card">
                    <div class="card-content">
                        <form method="POST" action="save-assessment.php" class="form-container">
                            <div class="form-section">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="term">Term</label>
                                        <select id="term" name="term" class="form-select" required>
                                            <option value="1">Term 1</option>
                                            <option value="2">Term 2</option>
                                            <option value="3">Term 3</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="assessment_year">Academic Year *</label>
                                        <input type="text" id="assessment_year" name="assessment_year" 
                                               class="form-input" required 
                                               placeholder="YYYY" pattern="\d{4}"
                                               maxlength="4"
                                               value="<?= htmlspecialchars($_POST['assessment_year'] ?? '') ?>">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group full-width">
                                        <label for="assessment_name">Assessment Name *</label>
                                        <input type="text" id="assessment_name" name="assessment_name"
                                               class="form-input" required
                                               placeholder="E.g., Term 1 Mathematics Final Exam"
                                               value="<?= htmlspecialchars($_POST['assessment_name'] ?? '') ?>">
                                    </div>
                                </div>

                                <div class="form-actions">
                                    <button type="reset" class="btn btn-outline">Clear Form</button>
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-save"></i> Save Assessment
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="assets/js/main.js"></script>
    <script>
        // Year input validation
        document.getElementById('assessment_year').addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0,4);
        });
    </script>
</body>
</html>