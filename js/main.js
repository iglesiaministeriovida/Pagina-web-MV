/**
 * MINISTERIO VIDA — JAVASCRIPT PRINCIPAL
 * Navegación, Drawer Móvil, IntersectionObserver y Formulario
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. NAVBAR SCROLL EFFECT
    const siteHeader = document.querySelector('.site-header');
    
    const handleScroll = () => {
        if (window.scrollY > 30) {
            siteHeader?.classList.add('scrolled');
        } else {
            siteHeader?.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. MENÚ MÓVIL (DRAWER)
    const navToggle = document.getElementById('navToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');

    if (navToggle && mobileDrawer) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navToggle.classList.toggle('active');
            mobileDrawer.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Cerrar al hacer clic en un enlace del drawer
        mobileDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                mobileDrawer.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (mobileDrawer.classList.contains('active') && !mobileDrawer.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                mobileDrawer.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 3. SCROLL SUAVE CON OFFSET DE NAVBAR
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER)
    const scrollObserverOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, scrollObserverOptions);

    const animatedElements = document.querySelectorAll('.scroll-reveal');
    animatedElements.forEach(el => scrollObserver.observe(el));

    // 5. RESALTAR ENLACE ACTIVO SEGÚN LA SECCIÓN
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .menu-link');

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

    // 6. FORMULARIO DE CONTACTO / PETICIONES DE ORACIÓN
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Enviando mensaje...</span>`;

            setTimeout(() => {
                submitBtn.innerHTML = `<span>¡Mensaje Enviado con Éxito! ✓</span>`;
                submitBtn.style.background = '#22c55e';
                submitBtn.style.color = '#fff';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 4000);
            }, 700);
        });
    }
});
