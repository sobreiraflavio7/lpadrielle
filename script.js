document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Toggle icon between list and X
        const icon = mobileBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        });
    });

    // 3. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Close other open answers
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current answer
            question.classList.toggle('active');
            const answer = question.nextElementSibling;
            
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // 4. Fresh Rebuilt Slider Drag Logic
    const drSlider = document.getElementById('dr-slider');
    const drClip = document.getElementById('dr-clip');
    const drHandle = document.getElementById('dr-handle');

    if (drSlider && drClip && drHandle) {
        let isDragging = false;

        const updateDrSlider = (x) => {
            const rect = drSlider.getBoundingClientRect();
            let percentage = ((x - rect.left) / rect.width) * 100;
            percentage = Math.max(0, Math.min(percentage, 100));
            
            drClip.style.width = `${percentage}%`;
            drHandle.style.left = `${percentage}%`;
        };

        drSlider.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateDrSlider(e.clientX);
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateDrSlider(e.clientX);
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        drSlider.addEventListener('touchstart', (e) => {
            isDragging = true;
            updateDrSlider(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            updateDrSlider(e.touches[0].clientX);
            if(e.cancelable) e.preventDefault();
        }, { passive: false });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    // 5. Animate on Scroll (arrastar para dentro)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove the class when it leaves the viewport going UP
                // so it can animate again when scrolling DOWN
                const boundingClientRect = entry.target.getBoundingClientRect();
                if (boundingClientRect.top > 0) {
                    entry.target.classList.remove('visible');
                }
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(`
        .hero-content, 
        .methodology-content, 
        .methodology-image-wrapper, 
        .section-title, 
        .section-subtitle, 
        .result-card, 
        .authority-text, 
        .authority-image-wrapper, 
        .testimonial-card, 
        .testimonial-media, 
        .faq-item, 
        .location-text, 
        .location-media,
        .clinic-placeholder
    `);

    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        // Optional: add slight delay for elements in a grid
        if (el.classList.contains('result-card') || el.classList.contains('testimonial-card') || el.classList.contains('testimonial-media')) {
            el.style.transitionDelay = `${(index % 3) * 0.15}s`;
        }
        observer.observe(el);
    });

    // 6. "Ver mais casos" Logic
    const btnVerMais = document.getElementById('btn-ver-mais');
    const hiddenResults = document.querySelectorAll('.hidden-result');

    if (btnVerMais && hiddenResults.length > 0) {
        btnVerMais.addEventListener('click', () => {
            hiddenResults.forEach(result => {
                result.classList.remove('hidden-result');
                // Adiciona a classe animate-on-scroll pra eles aparecerem animados
                result.classList.add('animate-on-scroll');
                observer.observe(result);
            });
            // Hide the button after clicking
            btnVerMais.style.display = 'none';
        });
    }
});

