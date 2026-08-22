/**
 * MINISTERIO VIDA — JAVASCRIPT PRINCIPAL (ORIVEX WEBFLOW STYLE - MULTI-PAGE)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.querySelector('.orivex-header');
    const handleScroll = () => {
        if (window.scrollY > 25) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. Menú Móvil
    const burger = document.getElementById('burgerToggle');
    const drawer = document.getElementById('mobileDrawer');

    if (burger && drawer) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = burger.classList.toggle('active');
            drawer.classList.toggle('active');
            burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        drawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                drawer.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (drawer.classList.contains('active') && !drawer.contains(e.target) && !burger.contains(e.target)) {
                burger.classList.remove('active');
                drawer.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 3. Smooth Scroll para enlaces internos con almohadilla (#)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 90;
                const elementPos = targetElement.getBoundingClientRect().top;
                const offsetPos = elementPos + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll Reveal (IntersectionObserver)
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // 5. Formulario de Contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Enviando mensaje...</span>`;

            setTimeout(() => {
                submitBtn.innerHTML = `<span>¡Mensaje Enviado con Éxito! ✓</span>`;
                submitBtn.style.background = '#25D366';
                submitBtn.style.color = '#FFFFFF';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 4000);
            }, 700);
        });
    }
});
