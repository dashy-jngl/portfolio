/* ============================================
   Johan Van Gass — Portfolio Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Sidebar active state on scroll --- */
    const sections = document.querySelectorAll('section[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                sidebarLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === '#' + id;
                    link.classList.toggle('active', isActive);
                });
            }
        });
    }, {
        rootMargin: '-15% 0px -55% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));

    /* --- Smooth click for sidebar --- */
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* --- Contact Form AJAX Submit --- */
    const form = document.getElementById('contactForm');
    const overlay = document.getElementById('modalOverlay');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const modalClose = document.getElementById('modalClose');
    const submitBtn = document.getElementById('submitBtn');

    function showModal(icon, title, text, showClose) {
        modalIcon.textContent = icon;
        modalTitle.textContent = title;
        modalText.textContent = text;
        modalClose.style.display = showClose ? 'inline-block' : 'none';
        overlay.classList.add('visible');
    }

    function hideModal() {
        overlay.classList.remove('visible');
    }

    modalClose.addEventListener('click', hideModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) hideModal();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        showModal('⏳', 'Sending...', 'Hang tight, your message is on its way.', false);

        const data = new FormData(form);

        try {
            const res = await fetch('https://formspree.io/hash.chisako@gmail.com', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: data
            });

            if (res.ok) {
                showModal('✅', 'Message Sent!', "Thanks for reaching out — I'll get back to you soon.", true);
                form.reset();
            } else {
                showModal('⚠️', 'Something went wrong', 'Please try again or reach out on GitHub.', true);
            }
        } catch (err) {
            showModal('⚠️', 'Connection error', 'Could not send the message. Please check your connection and try again.', true);
        }

        submitBtn.disabled = false;
    });

    /* --- Staggered card entrance --- */
    const cards = document.querySelectorAll('.project-card, .cert-item, .exp-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 80);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });

});
