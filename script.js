// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTopBtn.style.display = 'flex';
    } else {
        navbar.classList.remove('scrolled');
        backToTopBtn.style.display = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to top button
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Form message display
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('form-message');
    messageDiv.textContent = message;
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + '+';
        }, 50);
    });
}

// Trigger stats animation when about section is visible
let statsAnimated = false;
window.addEventListener('scroll', () => {
    if (!statsAnimated) {
        const aboutSection = document.getElementById('about');
        const rect = aboutSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animateStats();
            statsAnimated = true;
        }
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) homeLink.classList.add('active');
}); 