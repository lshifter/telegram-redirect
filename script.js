// DOM Elements
const playButton = document.getElementById('playButton');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    function openModal() {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add entrance animation
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'translateY(-50px)';
                modalContent.style.opacity = '0';
                
                setTimeout(() => {
                    modalContent.style.transform = 'translateY(0)';
                    modalContent.style.opacity = '1';
                }, 10);
            }
        }
    }

    function closeModalFunc() {
        if (modal) {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'translateY(-50px)';
                modalContent.style.opacity = '0';
            }
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    // Event listeners
    if (playButton) {
        playButton.addEventListener('click', openModal);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalFunc();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModalFunc();
        }
    });

    // Play button hover effect
    if (playButton) {
        playButton.addEventListener('mouseenter', () => {
            playButton.style.transform = 'scale(1.1)';
        });

        playButton.addEventListener('mouseleave', () => {
            playButton.style.transform = 'scale(1)';
        });
    }

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

    // Add entrance animations when page loads
    const elements = document.querySelectorAll('.team, .play-button-container, .live-indicator');
    elements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });

    // Add floating animation to play button
    if (playButton) {
        setTimeout(() => {
            playButton.style.animation = 'float 3s ease-in-out infinite';
        }, 1000);
    }
});
