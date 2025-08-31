// Global variables
let currentBet = null;
let hasSupported = false;

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navList = document.querySelector(".nav-list");
            const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
            if (navList && navList.classList.contains("mobile-open")) {
                navList.classList.remove("mobile-open");
                mobileMenuBtn.classList.remove("active");
            }
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navList = document.querySelector('.nav-list');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    navList.classList.toggle('mobile-open');
    menuBtn.classList.toggle('active');
}

// Support driver function with improved mobile handling
function supportDriver(driverName) {
    // Prevent double-clicking
    if (hasSupported) return;
    hasSupported = true;
    
    // Create floating hearts animation
    createFloatingHearts();
    
    // Show support message
    showSupportMessage(driverName);
    
    // Mark as supported for live stream access
    localStorage.setItem('hasSupported', 'true');
    localStorage.setItem('supportedDriver', driverName);
    
    // Redirect to support link after animation with proper mobile handling
    setTimeout(() => {
        // Use window.open for better mobile compatibility
        const link = 'https://gamehub.g2afse.com/click?pid=3751&offer_id=822';
        
        // For mobile devices, use location.href for better compatibility
        if (isMobileDevice()) {
            window.location.href = link;
        } else {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
        hasSupported = false;
    }, 1500);
}

// Detect mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768);
}

// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(heartsContainer);

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 20}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                animation: floatUp 3s ease-out forwards;
                pointer-events: none;
            `;
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
    }
    
    setTimeout(() => {
        heartsContainer.remove();
    }, 4000);
}

// Show support message
function showSupportMessage(driverName) {
    const driverNames = {
        'norris': 'Ландо Норриса',
        'leclerc': 'Шарля Леклера',
        'verstappen': 'Макса Ферстаппена'
    };
    
    const message = document.createElement('div');
    message.className = 'support-message';
    message.innerHTML = `
        <div>🏁 Спасибо за поддержку!</div>
        <div style="font-size: 1.2rem; margin-top: 0.5rem;">
            Вы поддержали ${driverNames[driverName]}
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'popIn 0.5s ease-out reverse';
        setTimeout(() => {
            message.remove();
        }, 500);
    }, 1000);
}

// Live stream modal functions
function showLiveStream() {
    const modal = document.getElementById('liveStreamModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLiveStream() {
    const modal = document.getElementById('liveStreamModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Betting functions
function placeBet(eventType, option) {
    currentBet = {
        type: eventType,
        option: option,
        odds: option === 'yes' ? 1.85 : 2.10
    };
    
    showBettingModal();
}

function showBettingModal() {
    const modal = document.getElementById('bettingModal');
    const details = document.getElementById('bettingDetails');
    
    const eventNames = {
        'safety-car': 'Выход Сейфти-Кара'
    };
    
    const optionNames = {
        'yes': 'ДА',
        'no': 'НЕТ'
    };
    
    details.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h4 style="color: #ff6b35; margin-bottom: 1rem;">${eventNames[currentBet.type]}</h4>
            <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">
                Ваш выбор: <strong>${optionNames[currentBet.option]}</strong>
            </div>
            <div style="font-size: 1.5rem; color: #ff6b35;">
                Коэффициент: <strong>${currentBet.odds}</strong>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBettingModal() {
    const modal = document.getElementById('bettingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function confirmBet() {
    // Close betting modal
    closeBettingModal();
    
    // Show success message
    showBetConfirmation();
    
    // Mark as supported for live stream access
    localStorage.setItem('hasSupported', 'true');
    localStorage.setItem('supportType', 'bet');
    
    // Redirect to betting link
        if (isMobileDevice()) {
            window.location.href = link;
        } else {
            window.open(link, "_blank", "noopener,noreferrer");
        }
}

function showBetConfirmation() {
    const message = document.createElement('div');
    message.className = 'support-message';
    message.innerHTML = `
        <div>🎯 Ставка принята!</div>
        <div style="font-size: 1.2rem; margin-top: 0.5rem;">
            Удачи в игре!
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'popIn 0.5s ease-out reverse';
        setTimeout(() => {
            message.remove();
        }, 500);
    }, 1500);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
        }
    });
}, observerOptions);

// Touch handling for mobile devices
function handleTouchInteractions() {
    if (isMobileDevice()) {
        // Handle driver card flips on mobile
        document.querySelectorAll('.driver-card').forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('flipped');
            });
        });
        
        // Improve button touch targets
        document.querySelectorAll('.support-btn, .odds-option, .quick-support-btn').forEach(btn => {
            btn.style.minHeight = '44px';
            btn.style.minWidth = '44px';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.driver-card, .expert-card, .betting-card, .section-title');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });
    
    // Initialize touch interactions
    handleTouchInteractions();
    
    // Create particles
    createParticles();
    
    // Add ripple effect to buttons
    addRippleEffect();
    
    // Check if user has already supported
    checkSupportStatus();
});

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    hero.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #ff6b35;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add ripple effect to buttons
function addRippleEffect() {
    document.querySelectorAll('.support-btn, .odds-option, .quick-support-btn, .confirm-bet-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Check support status for live stream access
function checkSupportStatus() {
    const hasSupported = localStorage.getItem('hasSupported');
    if (hasSupported === 'true') {
        // User has already supported, could modify UI accordingly
        console.log('User has already supported');
    }
}

// Parallax effect for hero section (disabled on mobile for performance)
if (!isMobileDevice()) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const racingLines = document.querySelector('.racing-lines');
        
        if (hero && racingLines) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
            racingLines.style.transform = `translateX(${-100 + scrolled * 0.1}px)`;
        }
    });
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const liveStreamModal = document.getElementById('liveStreamModal');
    const bettingModal = document.getElementById('bettingModal');
    
    if (e.target === liveStreamModal) {
        closeLiveStream();
    }
    
    if (e.target === bettingModal) {
        closeBettingModal();
    }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLiveStream();
        closeBettingModal();
    }
});

// Prevent zoom on double tap for iOS
document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

let lastTouchEnd = 0;

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling for failed image loads
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.log('Failed to load image:', this.src);
        });
    });
});

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'https://media.formula1.com/image/upload/v1712849107/content/dam/fom-website/drivers/2024Drivers/norris.png',
        '/home/ubuntu/upload/search_images/HY60pFtjD10r.jpeg',
        '/home/ubuntu/upload/search_images/uwXFf5RzsCq8.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadCriticalResources);
