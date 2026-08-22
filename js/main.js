/**
 * js/main.js
 * Funcionalidades principales para la página web de Ministerio Vida.
 * Tema oscuro con acentos en amarillo dorado.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. NAVBAR SCROLL EFFECT
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. MOBILE MENU TOGGLE
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevenir scroll
            if (mobileMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Click en link del menu cierra el menu
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Click fuera del menu lo cierra
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // 3. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Offset para el navbar fijo (aprox 80px)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. SCROLL ANIMATIONS (Intersection Observer)
    const animOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const animObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: dejar de observar una vez visible
                // observer.unobserve(entry.target);
            }
        });
    }, animOptions);

    // Preparar elementos que no tengan las clases (opcional/según requerimiento)
    // Aqui asumimos que el HTML ya tiene .fade-in y .slide-up en los elementos.
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        animObserver.observe(el);
    });

    // 5. ACTIVE NAV LINK
    const sections = document.querySelectorAll('section[id]');
    
    const navObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Activar cuando la seccion este al medio
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    // 6. ANNOUNCEMENT BAR DISMISS
    const announcementBar = document.querySelector('.announcement-bar');
    if (announcementBar) {
        const isDismissed = sessionStorage.getItem('announcementDismissed');
        if (isDismissed) {
            announcementBar.style.display = 'none';
        } else {
            const closeBtn = announcementBar.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    announcementBar.style.display = 'none';
                    sessionStorage.setItem('announcementDismissed', 'true');
                });
            }
        }
    }

    // 7. CONTACT FORM HANDLER
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validacion basica
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = 'var(--border)';
                }
            });

            if (isValid) {
                // Placeholder para envio al backend
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
            } else {
                alert('Por favor, completa todos los campos requeridos.');
            }
        });
    }
});
