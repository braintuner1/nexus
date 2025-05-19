<?php
require_once 'config.php';


$error = '';

// Process the admin login form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $phone = sanitizeInput($_POST['phone']);
    $password = $_POST['password'];
    
    // Query for admin user with the provided phone number
    $query = "SELECT * FROM admins WHERE phone_number = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $phone);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $admin = $result->fetch_assoc();
        
        // In production, use password_verify instead of plain text comparison
        if ($password === $admin['password']) {
            // Set session variables for admin
            $_SESSION['user_id'] = $admin['id'];
            $_SESSION['username'] = $admin['name'];
            $_SESSION['role'] = 'admin';
            
            // Redirect to the dashboard
            header("Location: index.php");
            exit;
        } else {
            $error = "Invalid phone number or password";
        }
    } else {
        $error = "Invalid phone number or password";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Emerald School Nexus</title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <style>
        /* Basic styling for the admin login page */
        body {
            font-family: Arial, sans-serif;
            background: #f0f4f8;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .login-container {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            width: 400px;
        }
        h1 {
            font-size: 24px;
            text-align: center;
            color: #333;
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
            background: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            text-align: center;
        }
        .btn:hover {
            background: #0056b3;
        }
        .error {
            color: #ff0000;
            margin-bottom: 15px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>Admin Login</h1>
        <?php if (!empty($error)): ?>
            <div class="error"><?php echo $error; ?></div>
        <?php endif; ?>
        <form method="POST" action="admin_login.php">
            <div class="form-group">
                <label for="admin-phone">Phone Number</label>
                <input type="text" id="admin-phone" name="phone" placeholder="Enter your phone number" required>
            </div>
            <div class="form-group">
                <label for="admin-password">Password</label>
                <input type="password" id="admin-password" name="password" placeholder="Enter your password" required>
            </div>
            <button type="submit" class="btn">Login</button>
        </form>
    </div>
</body>
</html>