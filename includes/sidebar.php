
<aside id="sidebar" class="sidebar">
    <div class="sidebar-header">
        <h1 class="sidebar-title">Emerald School</h1>
    </div>
    
    <nav class="sidebar-nav">
        <?php
        // Define navigation items based on user role
        $navItems = [
            ['path' => 'index.php', 'name' => 'Dashboard', 'icon' => 'fa-home', 'roles' => ['admin', 'teacher']]
        ];
        
        // Admin-specific nav items
        if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin') {
            $navItems = array_merge($navItems, [
                ['path' => 'students.php', 'name' => 'Students', 'icon' => 'fa-users', 'roles' => ['admin']],
                ['path' => 'assessments.php', 'name' => 'Assessments', 'icon' => 'fa-book-open', 'roles' => ['admin']],
                ['path' => 'reports.php', 'name' => 'Reports', 'icon' => 'fa-file-alt', 'roles' => ['admin']],
                ['path' => 'teachers.php', 'name' => 'Teachers', 'icon' => 'fa-chalkboard-teacher', 'roles' => ['admin']],
                ['path' => 'analytics.php', 'name' => 'Analytics', 'icon' => 'fa-chart-bar', 'roles' => ['admin']]
            ]);
        } else {
            // Teacher-specific nav items
            $navItems = array_merge($navItems, [
                ['path' => 'marks.php', 'name' => 'Enter Marks', 'icon' => 'fa-edit', 'roles' => ['teacher']],
                ['path' => 'reports.php', 'name' => 'View Reports', 'icon' => 'fa-chart-bar', 'roles' => ['teacher']]
            ]);
        }
        
        // Get current page filename
        $currentPage = basename($_SERVER['PHP_SELF']);
        
        // Output navigation items based on user role
        foreach ($navItems as $item) {
            // Skip items not allowed for current user role
            if (!isset($_SESSION['role']) || !in_array($_SESSION['role'], $item['roles'])) {
                continue;
            }
            
            $isActive = ($currentPage === $item['path']) ? 'active' : '';
            echo '<a href="' . $item['path'] . '" class="nav-item ' . $isActive . '">';
            echo '<i class="fas ' . $item['icon'] . '"></i>';
            echo '<span>' . $item['name'] . '</span>';
            echo '</a>';
        }
        ?>
    </nav>
    
    <div class="sidebar-footer">
        <div class="sidebar-footer-content">
            <h3>Emerald School Nexus</h3>
            <p>
                <?php if (isset($_SESSION['role'])): ?>
                    <?php echo ucfirst($_SESSION['role']); ?> Mode
                <?php else: ?>
                    Version 1.0
                <?php endif; ?>
            </p>
        </div>
        <?php if (isset($_SESSION['user_id'])): ?>
            <a href="logout.php" class="logout-link">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        <?php endif; ?>
    </div>
</aside>
