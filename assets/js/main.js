const categories = [
    {
        id: 'pisos',
        title: 'Pisos',
        description: 'Elegancia y durabilidad en cada paso. Nuestros acabados en granito y mármol transforman cualquier espacio.',
        folder: 'assets/src/images/pisos',
        files: ['PISO (2).jpeg', 'PISO (2).mp4', 'piso.jpeg', 'piso.jpg', 'piso.mp4', 'PISO2.mp4', 'PISO3.mp4', 'PISO4.mp4', 'PISO5.mp4', 'pulido.mp4', 'video.mp4']
    },
    {
        id: 'gradas',
        title: 'Gradas y Escaleras',
        description: 'Diseños robustos y estéticos para conectar tus espacios con la mejor calidad en piedra natural y cemento.',
        folder: 'assets/src/images/gradas_y_escaleras',
        files: ['ESCALERA (2).jpeg', 'escalera.jpeg', 'ESCALERA2.jpeg', 'ESCALERA3.mp4', 'ESCALERAS.jpeg', 'escaleras.jpg', 'escaleras.mp4', 'escaleras1.jpg', 'escaleras2.jpg', 'escaleras3.jpg', 'escaleras5.jpg', 'GRADA.mp4', 'gradas.jpg']
    },
    {
        id: 'jardin',
        title: 'Borde de Jardín y piscinas',
        description: 'La delimitación perfecta para tus áreas verdes y de descanso, combinando resistencia y ornamentación.',
        folder: 'assets/src/images/border_de_jardin',
        files: ['bordepiscina.jpeg', 'bordepiscina1.mp4', 'fuente.jpg', 'jardinera.jpg', 'pasillo.mp4', 'PISCINA.jpeg', 'piscina5.jpeg', 'piscina6.mp4', 'piscina7.mp4', 'PISINA.jpeg']
    },
    {
        id: 'rampla',
        title: 'Rampla de Entrada',
        description: 'Accesos funcionales y estéticamente superiores, diseñados para soportar el tránsito con estilo.',
        folder: 'assets/src/images/rampla_de_entrada',
        files: ['rampla.mp4', 'rampla2.mp4']
    },
    {
        id: 'anden',
        title: 'Anden',
        description: 'Construcciones urbanas y residenciales que garantizan seguridad y una vista impecable.',
        folder: 'assets/src/images/anden',
        files: ['anden.jpg', 'anden5.jpeg']
    },
    {
        id: 'cocina',
        title: 'Cocina',
        description: 'Mesones y acabados que resisten el tiempo y el uso, brindando la sofisticación que tu hogar merece.',
        folder: 'assets/src/images/cocina',
        files: ['COCINA.mp4', 'COCINA2.jpeg', 'COCINA3.mp4', 'meson cocina.jpg', 'COCINA4.mp4']
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('categories-container');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-modal');

    // Create Category Sections
    categories.forEach(cat => {
        const section = document.createElement('section');
        section.id = cat.id;
        section.className = 'category-section';

        section.innerHTML = `
            <h2 class="category-title">${cat.title}</h2>
            <p class="category-desc">${cat.description}</p>
            <div class="carousel-container">
                <button class="carousel-btn prev-btn" id="prev-${cat.id}"><i class="fas fa-chevron-left"></i></button>
                <div class="carousel-wrapper">
                    <div class="carousel-track" id="track-${cat.id}">
                        <!-- Las imágenes se cargarán aquí -->
                    </div>
                </div>
                <button class="carousel-btn next-btn" id="next-${cat.id}"><i class="fas fa-chevron-right"></i></button>
            </div>
        `;

        container.appendChild(section);

        const track = document.getElementById(`track-${cat.id}`);
        const wrapper = track.parentElement;
        const prevBtn = document.getElementById(`prev-${cat.id}`);
        const nextBtn = document.getElementById(`next-${cat.id}`);

        // Cargar los archivos especificados en el array 'files'
        cat.files.forEach(fileName => {
            const filePath = `${cat.folder}/${fileName}`;
            const isVideo = fileName.toLowerCase().endsWith('.mp4');
            const item = document.createElement('div');
            item.className = 'carousel-item';

            if (isVideo) {
                // Para videos, mostramos el video silenciado en el carrusel
                item.innerHTML = `
                    <video muted loop playsinline>
                        <source src="${filePath}" type="video/mp4">
                    </video>
                    <div class="play-overlay"><i class="fas fa-play"></i></div>
                `;
                // Iniciar reproducción al pasar el mouse
                item.addEventListener('mouseenter', () => item.querySelector('video').play());
                item.addEventListener('mouseleave', () => {
                    const v = item.querySelector('video');
                    v.pause();
                    v.currentTime = 0;
                });
            } else {
                item.innerHTML = `<img src="${filePath}" alt="${cat.title}" onerror="this.parentElement.style.display='none'">`;
            }

            // Al hacer clic, se abre el modal
            item.addEventListener('click', () => {
                modal.style.display = 'block';
                modal.innerHTML = '<span class="close-modal">&times;</span>'; // Reset modal content

                if (isVideo) {
                    const videoTag = document.createElement('video');
                    videoTag.src = filePath;
                    videoTag.controls = true;
                    videoTag.autoplay = true;
                    videoTag.className = 'modal-content';
                    modal.appendChild(videoTag);
                } else {
                    const imgTag = document.createElement('img');
                    imgTag.src = filePath;
                    imgTag.className = 'modal-content';
                    modal.appendChild(imgTag);
                }

                // Re-bind close button since we reset innerHTML
                document.querySelector('.close-modal').onclick = () => {
                    modal.style.display = 'none';
                    modal.innerHTML = ''; // Stop video playback
                };
            });

            track.appendChild(item);
        });

        // --- Lógica de Desplazamiento Mejorada ---

        const scrollStep = 400; // Un poco más grande para navegar mejor

        nextBtn.addEventListener('click', () => {
            wrapper.scrollBy({ left: scrollStep, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            wrapper.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        });

        // Soporte para arrastrar con el mouse (Desktop)
        let isDown = false;
        let startX;
        let scrollLeftPos;

        wrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            wrapper.style.scrollBehavior = 'auto'; // Deshabilitar suave para el arrastre
            startX = e.pageX - wrapper.offsetLeft;
            scrollLeftPos = wrapper.scrollLeft;
        });

        wrapper.addEventListener('mouseleave', () => {
            isDown = false;
            wrapper.style.scrollBehavior = 'smooth';
        });

        wrapper.addEventListener('mouseup', () => {
            isDown = false;
            wrapper.style.scrollBehavior = 'smooth';
        });

        wrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - wrapper.offsetLeft;
            const walk = (x - startX) * 1.5; // Ajuste de sensibilidad
            wrapper.scrollLeft = scrollLeftPos - walk;
        });
    });

    // Cerrar el modal
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});
