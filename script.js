// DOM Elements
const playButton = document.getElementById('playButton');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

// Modal functionality
function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'translateY(-50px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transform = 'translateY(0)';
        modalContent.style.opacity = '1';
    }, 10);
}

function closeModalFunc() {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'translateY(-50px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Event listeners
playButton.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunc);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModalFunc();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunc();
    }
});

// Play button hover effect
playButton.addEventListener('mouseenter', () => {
    playButton.style.transform = 'scale(1.1)';
});

playButton.addEventListener('mouseleave', () => {
    playButton.style.transform = 'scale(1)';
});

// Smooth scrolling for anchor links
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

// Add loading animation to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Переход...';
        this.style.pointerEvents = 'none';
        
        // Reset after 2 seconds (in case user comes back)
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.pointerEvents = 'auto';
        }, 2000);
    });
}

// Add parallax effect to main section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const mainSection = document.querySelector('.main-section');
    if (mainSection) {
        mainSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add countdown timer (optional enhancement)
function updateCountdown() {
    const matchDate = new Date('2024-09-09T20:00:00');
    const now = new Date();
    const timeDiff = matchDate - now;
    
    if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        // You can add a countdown display element if needed
        console.log(`До матча: ${days}д ${hours}ч ${minutes}м ${seconds}с`);
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Add entrance animations when page loads
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.team, .play-button-container, .live-indicator');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Apply ripple effect to buttons
document.querySelectorAll('.play-button, .cta-button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add floating animation to play button
const playButtonFloat = () => {
    playButton.style.animation = 'float 3s ease-in-out infinite';
};

// Add float animation CSS
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(floatStyle);

// Start floating animation
setTimeout(playButtonFloat, 1000);

// Add performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Debounce scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations can be added here
}, 10));

