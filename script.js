// Main JavaScript for Gacor Legends

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('gacorCurrentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Load user data for navigation
function loadUserData() {
    const userData = localStorage.getItem('gacorCurrentUser');
    if (userData) {
        const user = JSON.parse(userData);
        const navUsername = document.getElementById('navUsername');
        const navProfileImage = document.getElementById('navProfileImage');
        
        if (navUsername) {
            navUsername.textContent = user.username;
        }
        if (navProfileImage && user.profileImage) {
            navProfileImage.src = user.profileImage;
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('gacorCurrentUser');
    window.location.href = 'login.html';
}

// Go to profile page
function goToProfile() {
    window.location.href = 'profile.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check auth for protected pages
    const protectedPages = ['home.html', 'penjelasan.html', 'p2w.html', 'team.html', 'profile.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        if (!checkAuth()) {
            return;
        }
    }
    
    // Load user data
    loadUserData();
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .team-card, .p2w-category');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add initial styles for animation
const style = document.createElement('style');
style.textContent = `
    .feature-card, .team-card, .p2w-category {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(style);
