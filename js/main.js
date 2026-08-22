/**
 * MINISTERIO VIDA — JAVASCRIPT PRINCIPAL (ORIVEX WEBFLOW STYLE)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. LUZ INTERACTIVA DINÁMICA DE FONDO (Spotlight / Aura de Luz con física fluida LERP)
    const glow = document.getElementById('interactiveGlow');
    if (glow) {
        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2.5;
        let currentX = targetX;
        let currentY = targetY;

        // Capturar movimiento del ratón / puntero
        const updatePointer = (clientX, clientY) => {
            targetX = clientX;
            targetY = clientY;
        };

        window.addEventListener('pointermove', (e) => {
            updatePointer(e.clientX, e.clientY);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                updatePointer(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        // Al hacer scroll, la luz reacciona suavemente con el desplazamiento
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const deltaY = window.scrollY - lastScrollY;
            targetY = Math.max(50, Math.min(window.innerHeight - 50, targetY - deltaY * 0.25));
            lastScrollY = window.scrollY;
        }, { passive: true });

        // Loop de renderizado continuo a 60fps con inercia elegante
        const animateGlow = () => {
            currentX += (targetX - currentX) * 0.085;
            currentY += (targetY - currentY) * 0.085;

            glow.style.setProperty('--mouse-x', `${currentX.toFixed(1)}px`);
            glow.style.setProperty('--mouse-y', `${currentY.toFixed(1)}px`);

            requestAnimationFrame(animateGlow);
        };
        animateGlow();
    }

    // 1. Header scroll effect
    const header = document.querySelector('.orivex-header');
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

    // 3. Smooth Scroll con Offset de Navegación
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

    // 4. Scroll Reveal (IntersectionObserver)
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // 5. Resaltar enlace activo según la sección visible
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.orivex-nav-menu .nav-link-item');

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

    // 6. Formulario de Contacto
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
