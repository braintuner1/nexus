<?php
require_once 'config.php';

// Check if user is already logged in


$error = '';

// Handle login form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $phone = sanitizeInput($_POST['phone']);
    $password = $_POST['password'];
    
    // First try admin login
    $adminQuery = "SELECT * FROM admins WHERE phone_number = ?";
    $stmt = $conn->prepare($adminQuery);
    $stmt->bind_param("s", $phone);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        $admin = $result->fetch_assoc();
        
        // Verify password (in production use password_verify)
        if ($password === $admin['password']) {
            // Set session variables for admin
            $_SESSION['user_id'] = $admin['id'];
            $_SESSION['username'] = $admin['name'];
            $_SESSION['role'] = 'admin';
            
            // Redirect to dashboard
            header("Location: index.php");
            exit;
        } else {
            $error = "Invalid phone number or password";
        }
    } else {
        // Try teacher login if admin login fails
        $teacherQuery = "SELECT * FROM teachers WHERE phone_number = ?";
        $stmt = $conn->prepare($teacherQuery);
        $stmt->bind_param("s", $phone);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows == 1) {
            $teacher = $result->fetch_assoc();
            
            // Verify password (in production use password_verify)
            if ($password === $teacher['password']) {
                // Set session variables
                $_SESSION['teacher_id'] = $teacher['id']; // FIXED: This was 'teacher_id' but should match the DB column name
                $_SESSION['first_name'] = $teacher['first_name']; // FIXED: Changed from 'name' to match DB column
                $_SESSION['role'] = 'teacher';
                $_SESSION['subject_taught'] = $teacher['subject_taught'];
                $_SESSION['class_assigned'] = $teacher['class_assigned'];
                $_SESSION['subject_id'] = $teacher['subject_id']; // FIXED: This should match the subject ID column
                
                // FIXED: Debug session variables
                error_log("Teacher login success - ID: " . $_SESSION['teacher_id']);
                error_log("Subject ID saved to session: " . $_SESSION['subject_id']);
                // Redirect to dashboard
                header("Location: index.php");
                exit;
            } else {
                $error = "Invalid phone number or password";
            }
        } else {
            $error = "Invalid phone number or password";
        }
    }
}

$teacherSubjects = isset($_SESSION['subject_id']) ? explode(',', $_SESSION['subject_id']) : [];
$teacherClasses = isset($_SESSION['class_assigned']) ? explode(',', $_SESSION['class_assigned']) : [];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Emerald School Nexus</title>
    <meta name="description" content="School Management System - Login">
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="stylesheet" href="assets/css/login.css">
    <!-- Include Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* General Styles */
        body {
            font-family: 'Arial', sans-serif;
            background: #f0f4f8;
            margin: 0;
            padding: 0;
        }

        .login-page {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .login-container {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            padding: 30px;
            width: 400px;
        }

        .login-header h1 {
            font-size: 24px;
            color: #333;
            text-align: center;
        }

        .login-header p {
            font-size: 14px;
            color: #666;
            text-align: center;
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            font-size: 14px;
            color: #333;
            margin-bottom: 5px;
        }

        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
        }

        .btn {
            display: block;
            width: 100%;
            padding: 10px;
            background: #28a745;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            text-align: center;
        }

        .btn:hover {
            background: #218838;
        }

        .forgot-password {
            display: block;
            text-align: right;
            font-size: 12px;
            color: #007bff;
            text-decoration: none;
        }

        .forgot-password:hover {
            text-decoration: underline;
        }

        .login-footer {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-top: 20px;
        }

        /* Admin Login Button */
        .admin-login-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: #007bff;
            color: #fff;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
        }

        .admin-login-btn:hover {
            background-color: #0056b3;
        }

        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            width: 400px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
            font-size: 18px;
            margin-bottom: 10px;
            color: #333;
        }

        .close-btn {
            float: right;
            cursor: pointer;
            font-size: 20px;
            color: #333;
        }

        .close-btn:hover {
            color: #000;
        }
    </style>
</head>
<body class="login-page">
    <!-- Admin Login Button -->
    <button class="admin-login-btn" onclick="openModal()">Admin Login</button>

    <!-- Admin Login Modal -->
    <div class="modal" id="adminModal">
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal()">&times;</span>
            <div class="modal-header">Admin Login</div>
            <form method="POST" action="admin_login.php">
                <div class="form-group">
                    <label for="admin-phone">Phone Number</label>
                    <input type="text" id="admin-phone" name="phone" placeholder="Enter admin phone number" required>
                </div>
                <div class="form-group">
                    <label for="admin-password">Password</label>
                    <input type="password" id="admin-password" name="password" placeholder="Enter admin password" required>
                </div>
                <button type="submit" class="btn">Login</button>
            </form>
        </div>
    </div>

    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <h1>Emerald School Nexus</h1>
                <p>Teacher/Admin Login</p>
            </div>
            
            <?php if (!empty($error)): ?>
                <div class="alert alert-error">
                    <?php echo $error; ?>
                </div>
            <?php endif; ?>
            
            <form method="POST" action="login.php" class="login-form">
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="text" id="phone" name="phone" placeholder="Enter your phone number" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required>
                </div>
                
                <div class="form-group remember-me">
                    <label>
                        <input type="checkbox" name="remember"> Remember me
                    </label>
                    <a href="#" class="forgot-password">Forgot password?</a>
                </div>
                
                <button type="submit" class="btn">Sign In</button>
            </form>
            
            <div class="login-footer">
                <p>&copy; 2025 Emerald School Nexus. All rights reserved.</p>
            </div>
        </div>
    </div>
    
    <script>
        const modal = document.getElementById('adminModal');

        function openModal() {
            modal.classList.add('active');
        }

        function closeModal() {
            modal.classList.remove('active');
        }
    </script>
</body>
</html>
