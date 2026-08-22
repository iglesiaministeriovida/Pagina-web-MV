/**
 * MINISTERIO VIDA — JAVASCRIPT PRINCIPAL (ORIVEX WEBFLOW STYLE)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. LUZ SOLAR CELESTIAL DINÁMICA (Rayo de sol desde la esquina superior que reacciona al scroll)
    const sunbeam = document.getElementById('sunbeamLight');
    if (sunbeam) {
        let lastScrollY = window.scrollY;
        let scrollVelocity = 0;
        let targetOpacity = 0.25; // 25% de opacidad base
        let currentOpacity = 0.25;
        let targetScale = 1;
        let currentScale = 1;
        let targetAngle = 0;
        let currentAngle = 0;

        const handleScrollSun = () => {
            const scrollPos = window.scrollY;
            const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const scrollRatio = Math.min(scrollPos / maxScroll, 1);

            // Medir la velocidad del scroll
            const delta = scrollPos - lastScrollY;
            scrollVelocity = Math.min(Math.abs(delta), 80);
            lastScrollY = scrollPos;

            // Al hacer scroll/movimiento, leve variación entre 20% y 30% de opacidad
            const velocityIntensity = (scrollVelocity / 80) * 0.08;
            
            // Se mantiene siempre sutil y transparente (entre 0.18 y 0.30)
            targetOpacity = Math.max(0.18, Math.min(0.30, 0.26 - (scrollRatio * 0.08) + velocityIntensity));
            targetScale = 1 + (scrollRatio * 0.35) + (velocityIntensity * 0.15);
            targetAngle = (scrollRatio * 6) + (delta > 0 ? 1.5 : -1.5);
        };

        window.addEventListener('scroll', handleScrollSun, { passive: true });
        handleScrollSun();

        // Loop a 60 FPS con amortiguación suave tipo física
        const renderSunbeam = () => {
            scrollVelocity *= 0.90; // Amortiguación de velocidad

            currentOpacity += (targetOpacity - currentOpacity) * 0.08;
            currentScale += (targetScale - currentScale) * 0.08;
            currentAngle += (targetAngle - currentAngle) * 0.06;

            sunbeam.style.setProperty('--sun-opacity', currentOpacity.toFixed(3));
            sunbeam.style.setProperty('--sun-scale', currentScale.toFixed(3));
            sunbeam.style.setProperty('--beam-scale', (currentScale * 1.08).toFixed(3));
            sunbeam.style.setProperty('--beam-angle', `${currentAngle.toFixed(2)}deg`);

            requestAnimationFrame(renderSunbeam);
        };
        renderSunbeam();
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
