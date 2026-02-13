document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '☰';
                }
            }
        });
    });

    // Simple fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.treatment-card, .doctor-info, .doctor-image, .ba-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // View More Button Logic
    const viewMoreBtn = document.getElementById('view-more-btn');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            const hiddenCards = document.querySelectorAll('.ba-card.hidden');
            const allHiddenCards = document.querySelectorAll('.ba-card'); // To check if we are expanding or collapsing

            // If there are currently hidden cards, we show them
            if (hiddenCards.length > 0) {
                hiddenCards.forEach(card => {
                    card.classList.remove('hidden');
                    // Add animation to newly revealed cards
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    // Trigger reflow
                    void card.offsetWidth;
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
                viewMoreBtn.textContent = 'Show Less';
            } else {
                // If no hidden cards, it means all are shown, so we hide the extra ones (Case 3 and 4)
                // We specifically target the last two cards for this simple implementation, or add a specific class if needed.
                // Better approach: toggle 'hidden' back on the specific elements we revealed.
                // For now, let's just query the last 2 .ba-card elements
                const cards = document.querySelectorAll('.ba-card');
                if (cards.length >= 4) {
                    cards[2].classList.add('hidden');
                    cards[3].classList.add('hidden');
                }
                viewMoreBtn.textContent = 'View Full Gallery';
            }
        });
    }
});
