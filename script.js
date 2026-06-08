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

    // 5. Removed animations to improve performance

    // 6. "Ver mais casos" Logic
    const btnVerMais = document.getElementById('btn-ver-mais');
    const hiddenResults = document.querySelectorAll('.hidden-result');

    if (btnVerMais && hiddenResults.length > 0) {
        btnVerMais.addEventListener('click', () => {
            hiddenResults.forEach(result => {
                result.classList.remove('hidden-result');
            });
            // Hide the button after clicking
            btnVerMais.style.display = 'none';
        });
    }
});

