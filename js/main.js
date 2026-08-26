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

    // 6. Modo Oscuro (Dark / Light Theme Toggle)
    const initTheme = () => {
        const savedTheme = localStorage.getItem('mv-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', currentTheme);
    };
    initTheme();

    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', activeTheme);
            localStorage.setItem('mv-theme', activeTheme);
        });
    });

    // 7. Botón Flotante Inteligente de WhatsApp
    const floatingWaBtn = document.getElementById('floatingWhatsapp');
    const heroWaBtn = document.querySelector('.hero-buttons-wrapper .orivex-btn-secondary, .hero-buttons-wrapper a[href*="wa.me"]');

    if (floatingWaBtn) {
        if (heroWaBtn) {
            const waObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // El botón principal del Hero está visible -> ocultar flotante
                        floatingWaBtn.classList.remove('is-active');
                    } else {
                        // El botón del Hero salió de la pantalla -> mostrar flotante en esquina
                        floatingWaBtn.classList.add('is-active');
                    }
                });
            }, {
                root: null,
                threshold: 0.1
            });
            waObserver.observe(heroWaBtn);
        } else {
            // Páginas sin botón de hero -> mostrar tras desplazarse
            const handleSecondaryScroll = () => {
                if (window.scrollY > 260) {
                    floatingWaBtn.classList.add('is-active');
                } else {
                    floatingWaBtn.classList.remove('is-active');
                }
            };
            window.addEventListener('scroll', handleSecondaryScroll, { passive: true });
            handleSecondaryScroll();
        }
    }
});
