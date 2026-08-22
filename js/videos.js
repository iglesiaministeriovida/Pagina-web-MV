/**
 * js/videos.js
 * Reproducción de video destacada inline y modal interactivo para Ministerio Vida
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo del Reproductor Destacado Grande (Reproducción Directa dentro de la página)
    const featuredCard = document.getElementById('mainFeaturedPlayer');
    if (featuredCard) {
        featuredCard.addEventListener('click', function(e) {
            // Si hicieron clic en el enlace externo a YouTube, dejamos que abra la pestaña
            if (e.target.closest('.btn-yt-link')) return;

            const videoId = this.getAttribute('data-youtube-id') || 'HFzE9sv9Hzo';
            const mediaContainer = this.querySelector('.featured-video-media');
            
            if (mediaContainer && !mediaContainer.querySelector('iframe')) {
                mediaContainer.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                        title="Predicación Ministerio Vida"
                        style="width: 100%; height: 100%; position: absolute; inset: 0; border: none;"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen>
                    </iframe>
                `;
                // Remover cursor pointer en el contenedor una vez reproduciendo
                featuredCard.style.cursor = 'default';
            }
        });
    }

    // 2. Modal Interactivo para los clips inferiores
    const styleId = 'video-modal-styles';
    if (!document.getElementById(styleId)) {
        const styles = `
            .video-modal {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(20px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            .video-modal.active {
                opacity: 1;
                visibility: visible;
            }
            .video-modal-content {
                width: 92%;
                max-width: 960px;
                aspect-ratio: 16 / 9;
                position: relative;
                background: #000;
                border-radius: 16px;
                overflow: hidden;
                border: 1px solid rgba(245, 158, 11, 0.4);
                box-shadow: 0 25px 60px rgba(0,0,0,0.9);
            }
            .video-modal-content iframe {
                width: 100%;
                height: 100%;
                border: none;
            }
            .video-modal-close {
                position: absolute;
                top: -46px;
                right: 0;
                color: #fff;
                font-size: 34px;
                cursor: pointer;
                background: none;
                border: none;
                padding: 0;
                line-height: 1;
                transition: color 0.2s ease;
            }
            .video-modal-close:hover {
                color: #F59E0B;
            }
        `;
        const styleSheet = document.createElement('style');
        styleSheet.id = styleId;
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <button class="video-modal-close" aria-label="Cerrar reproductor">&times;</button>
            <div id="video-modal-iframe-container" style="width:100%; height:100%;"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModal = () => {
        modal.classList.remove('active');
        document.getElementById('video-modal-iframe-container').innerHTML = '';
        document.body.style.overflow = '';
    };

    modal.querySelector('.video-modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Configurar selectores de tarjetas de sermones inferiores
    const sermonCards = document.querySelectorAll('.sermon-orivex-card');
    sermonCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = card.getAttribute('data-youtube-id');
            if (!videoId) return;

            const iframeHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            document.getElementById('video-modal-iframe-container').innerHTML = iframeHTML;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
});
