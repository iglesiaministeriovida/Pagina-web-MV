/**
 * js/videos.js
 * Carga lazy y Modal Interactivo para videos de YouTube (Ministerio Vida)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyectar estilos para el modal de video si no existen
    const styleId = 'video-modal-styles';
    if (!document.getElementById(styleId)) {
        const styles = `
            .video-modal {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.94);
                backdrop-filter: blur(16px);
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
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid rgba(245, 158, 11, 0.3);
                box-shadow: 0 20px 50px rgba(0,0,0,0.8);
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

    // 2. Crear estructura DOM del modal
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
        document.getElementById('video-modal-iframe-container').innerHTML = ''; // Detener video
        document.body.style.overflow = '';
    };

    modal.querySelector('.video-modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // 3. Configurar selectores de tarjetas de video
    const videoCards = document.querySelectorAll('.sermon-card, .video-card-clean, .video-card');

    videoCards.forEach(card => {
        const videoId = card.getAttribute('data-youtube-id');
        if (!videoId) return;

        card.addEventListener('click', (e) => {
            e.preventDefault();
            const iframeHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            document.getElementById('video-modal-iframe-container').innerHTML = iframeHTML;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
});
