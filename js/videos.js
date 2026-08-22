/**
 * js/videos.js
 * Carga lazy de videos de YouTube y modal interactivo para Ministerio Vida.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1 & 2. YOUTUBE LAZY LOAD & MODAL
    
    // Inyectar estilos para el modal si no existen en CSS
    const styleId = 'video-modal-styles';
    if (!document.getElementById(styleId)) {
        const styles = `
            .video-modal {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.95);
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
                width: 90%;
                max-width: 900px;
                aspect-ratio: 16 / 9;
                position: relative;
                background: #000;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                border: 1px solid var(--border, #2D2D2D);
            }
            .video-modal-content iframe {
                width: 100%;
                height: 100%;
                border: none;
            }
            .video-modal-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 32px;
                cursor: pointer;
                background: none;
                border: none;
                padding: 0;
                line-height: 1;
                transition: color 0.3s ease;
            }
            .video-modal-close:hover {
                color: var(--accent, #D4A017);
            }
        `;
        const styleSheet = document.createElement('style');
        styleSheet.id = styleId;
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    // Crear la estructura del modal
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <button class="video-modal-close">&times;</button>
            <div id="video-modal-iframe-container"></div>
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

    // Configurar cada video card
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        const videoId = card.getAttribute('data-youtube-id');
        if (!videoId) return;

        const thumbnailContainer = card.querySelector('.video-thumbnail');
        if (thumbnailContainer) {
            // Cargar imagen thumbnail
            const img = new Image();
            img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            img.alt = "Video Thumbnail";
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            
            // Fallback
            img.onerror = function() {
                this.onerror = null;
                this.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            };

            // Asegurarnos de limpiar e insertar la imagen detras del boton
            const playBtn = thumbnailContainer.querySelector('.video-play-btn');
            thumbnailContainer.innerHTML = ''; // limpiar
            thumbnailContainer.appendChild(img);
            if (playBtn) thumbnailContainer.appendChild(playBtn);

            // Al click, abrir el modal
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const iframeHTML = \`<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\`;
                document.getElementById('video-modal-iframe-container').innerHTML = iframeHTML;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
});
