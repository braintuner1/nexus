
<?php
// Contains the header for each page
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle ?? 'Emerald School Nexus'; ?></title>
    <meta name="description" content="<?php echo $pageDescription ?? 'School Management System'; ?>">
    <link rel="stylesheet" href="assets/css/styles.css">
    <?php if (isset($additionalCSS)): ?>
        <?php foreach ($additionalCSS as $css): ?>
            <link rel="stylesheet" href="<?php echo $css; ?>">
        <?php endforeach; ?>
    <?php endif; ?>
    <!-- Include Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="app-container">
        <!-- Sidebar Navigation -->
        <?php include 'includes/sidebar.php'; ?>

        <!-- Main Content -->
        <main class="main-content">
            <div class="content-container">
                <!-- Flash Messages -->
                <?php $flash = getFlashMessage(); ?>
                <?php if ($flash): ?>
                    <div class="alert alert-<?php echo $flash['type']; ?>">
                        <?php echo $flash['message']; ?>
                    </div>
                <?php endif; ?>

                <!-- Page Header -->
                <div class="content-header">
                    <div>
                        <h1><?php echo $pageHeader ?? 'Dashboard'; ?></h1>
                        <p><?php echo $pageSubheader ?? ''; ?></p>
                    </div>
                    
                    <?php if (isset($headerAction)): ?>
                        <div>
                            <?php echo $headerAction; ?>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Page Content -->
