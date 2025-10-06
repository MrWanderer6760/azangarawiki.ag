function initTheme() {
    const savedTheme = localStorage.getItem('azangara-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

document.getElementById('themeToggle').addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('azangara-theme', newTheme);
    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

document.getElementById('mobileMenuToggle').addEventListener('click', function() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
    this.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
});

document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const menuToggle = document.getElementById('mobileMenuToggle');
    
    if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target) && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        menuToggle.textContent = '☰';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Анимация карточек навигации
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    const welcomeCard = document.querySelector('.welcome-card');
    welcomeCard.style.opacity = '0';
    welcomeCard.style.transform = 'translateY(20px)';
    welcomeCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
        welcomeCard.style.opacity = '1';
        welcomeCard.style.transform = 'translateY(0)';
    }, 300);
});

function preloadImages() {
    const imageUrls = [
        'images/logo.png',
        'images/background.png',
        'images/banner.png',
        'images/en.png',
        'images/wiki1-logo.png',
        'images/wiki2-logo.png',
        'images/azangara-nav.png',
        'images/castles-nav.png',
        'images/bonuses-nav.png',
        'images/monsters-nav.png',
        'images/versions-nav.png',
        'images/guides-nav.png',
        'images/leaderboard-nav.png',
        'images/debug-nav.png',
        'images/cut-content-nav.png',
        'images/custom-levels-nav.png'
    ];
    
    imageUrls.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

window.addEventListener('load', () => {
    initTheme();
    preloadImages();
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

document.querySelectorAll('.nav-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px) scale(1)';
    });
});