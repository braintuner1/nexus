
// Mobile Sidebar Toggle
document.addEventListener('DOMContentLoaded', function() {
  // Handle active nav items
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage) {
      item.classList.add('active');
    } else if (currentPage === 'index.html' && href === 'index.html') {
      item.classList.add('active');
    }
  });
  
  // Handle tab switching
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the tab to activate
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and panes
      document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
      });
      
      document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
      });
      
      // Add active class to clicked button and corresponding pane
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Add fade-in animation to cards
  const cards = document.querySelectorAll('.card, .stat-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
  });
  
  // Trigger the animation after a small delay
  setTimeout(() => {
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100); // Stagger the animations
    });
  }, 100);
});
