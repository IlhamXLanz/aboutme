// script.js - vertical navigation interactions

document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            follower.style.opacity = '0.5';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            follower.style.opacity = '0';
        });
        
        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .contact-card, .seventy-badge');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                follower.style.transform = 'scale(1.5)';
                follower.style.opacity = '0.2';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                follower.style.transform = 'scale(1)';
                follower.style.opacity = '0.5';
            });
        });
    }

    // Vertical Navigation
    const navLinks = document.querySelectorAll('.nav-link-vertical');
    const sections = document.querySelectorAll('.section');
    
    function switchSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const activeSection = document.getElementById(sectionId.replace('#', ''));
        if (activeSection) {
            activeSection.classList.add('active');
        }
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Trigger entrance animation
        animateSectionEntrance(activeSection);
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            document.querySelector('.vertical-nav').classList.remove('active');
        }
    }
    
    // Add click handlers to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href');
            switchSection(sectionId);
            
            // Update URL without page reload
            history.pushState(null, null, sectionId);
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const sectionId = window.location.hash || '#home';
        switchSection(sectionId);
    });
    
    // Initial section from URL or default to home
    const initialSection = window.location.hash || '#home';
    switchSection(initialSection);
    
    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn-vertical');
    const verticalNav = document.querySelector('.vertical-nav');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            verticalNav.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });
    }
    
    // Section entrance animation
    function animateSectionEntrance(section) {
        if (!section) return;
        
        const elements = section.querySelectorAll(
            '.backend-card, .security-item, .project-card, .contact-card, .stat-item'
        );
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        const moveElements = document.querySelectorAll(
            '.about-image, .security-icons i, .sphere-3d'
        );
        
        moveElements.forEach(el => {
            const speed = el.dataset.speed || 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Scroll animations for progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                bar.style.animation = 'progressPulse 2s infinite';
            }
        });
    }
    
    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars();
    
    // 70% badge interaction
    const seventyBadge = document.querySelector('.seventy-badge');
    if (seventyBadge) {
        seventyBadge.addEventListener('click', () => {
            seventyBadge.style.transform = 'scale(1.1)';
            setTimeout(() => {
                seventyBadge.style.transform = 'scale(1)';
            }, 200);
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.top = '50%';
            ripple.style.left = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 247, 255, 0.3)';
            ripple.style.transition = 'all 0.6s ease';
            seventyBadge.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.width = '200px';
                ripple.style.height = '200px';
                ripple.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Interactive security visual
    const securityVisual = document.querySelector('.security-visual');
    if (securityVisual) {
        securityVisual.addEventListener('mousemove', (e) => {
            const rect = securityVisual.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            const icons = securityVisual.querySelectorAll('.security-icons i');
            icons.forEach(icon => {
                icon.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            });
        });
        
        securityVisual.addEventListener('mouseleave', () => {
            const icons = securityVisual.querySelectorAll('.security-icons i');
            icons.forEach(icon => {
                icon.style.transform = 'rotateX(0) rotateY(0)';
            });
        });
    }
    
    // Console greeting
    console.log(
        '%c🔥 DYANDRA ARIF FAISA | 70% BACKEND & CYBERSECURITY 🔥',
        'font-size: 16px; font-weight: bold; color: #00f7ff; background: #0a0c0f; padding: 10px; border-radius: 10px;'
    );
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!verticalNav.contains(e.target) && !mobileBtn.contains(e.target)) {
                verticalNav.classList.remove('active');
            }
        }
    });
});