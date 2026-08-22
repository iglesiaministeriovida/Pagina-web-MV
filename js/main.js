/**
 * MINISTERIO VIDA — JAVASCRIPT PRINCIPAL (TEMA OSCURO DE ALTO CONTRASTE)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.querySelector('.top-nav-wrapper');
    const handleScroll = () => {
        if (window.scrollY > 30) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. Menú Móvil
    const toggleBtn = document.getElementById('toggleMenu');
    const dropdown = document.getElementById('dropdownMenu');

    if (toggleBtn && dropdown) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = toggleBtn.classList.toggle('active');
            dropdown.classList.toggle('active');
            toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        dropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleBtn.classList.remove('active');
                dropdown.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (dropdown.classList.contains('active') && !dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
                toggleBtn.classList.remove('active');
                dropdown.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 3. Smooth Scroll con Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const elementPos = targetElement.getBoundingClientRect().top;
                const offsetPos = elementPos + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll Reveal
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    document.querySelectorAll('.reveal-scroll').forEach(el => observer.observe(el));

    // 5. Active Link Highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-list .nav-btn');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });

    sections.forEach(section => navObserver.observe(section));

    // 6. Formulario de Contacto Directo
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            
            btn.disabled = true;
            btn.innerHTML = `<span>Enviando mensaje...</span>`;

            setTimeout(() => {
                btn.innerHTML = `<span>¡Mensaje Enviado con Éxito! ✓</span>`;
                btn.style.background = '#25D366';
                btn.style.color = '#FFFFFF';
                contactForm.reset();

                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 4000);
            }, 700);
        });
    }
});
