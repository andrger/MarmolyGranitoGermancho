const categories = [
    {
        id: 'pisos',
        title: 'Pisos',
        description: 'Elegancia y durabilidad en cada paso. Nuestros acabados en granito y mármol transforman cualquier espacio.',
        folder: 'assets/src/images/pisos',
        files: ['piso.jpeg', 'piso.jpg', 'piso.mp4', 'pulido.mp4', 'video.mp4']
    },
    {
        id: 'gradas',
        title: 'Gradas y Escaleras',
        description: 'Diseños robustos y estéticos para conectar tus espacios con la mejor calidad en piedra natural y cemento.',
        folder: 'assets/src/images/gradas_y_escaleras',
        files: ['escalera.jpeg', 'escaleras.jpg', 'escaleras.mp4', 'escaleras1.jpg', 'escaleras2.jpg', 'escaleras3.jpg', 'escaleras5.jpg', 'gradas.jpg']
    },
    {
        id: 'jardin',
        title: 'Borde de Jardín',
        description: 'La delimitación perfecta para tus áreas verdes, combinando resistencia y ornamentación.',
        folder: 'assets/src/images/border_de_jardin',
        files: ['bordepiscina.jpeg', 'bordepiscina1.mp4', 'fuente.jpg', 'jardinera.jpg', 'pasillo.mp4', 'piscina5.jpeg']
    },
    {
        id: 'rampla',
        title: 'Rampla de Entrada',
        description: 'Accesos funcionales y estéticamente superiores, diseñados para soportar el tránsito con estilo.',
        folder: 'assets/src/images/rampla_de_entrada',
        files: []
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
        files: ['meson cocina.jpg']
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
                <div class="carousel-track" id="track-${cat.id}">
                    <!-- Las imágenes se cargarán aquí -->
                </div>
            </div>
        `;

        container.appendChild(section);

        const track = document.getElementById(`track-${cat.id}`);

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

        // Animación de desplazamiento suave si hay suficientes elementos
        if (cat.files.length > 2) {
            let scrollAmount = 0;
            const animate = () => {
                scrollAmount -= 0.5;
                if (Math.abs(scrollAmount) >= track.scrollWidth / 2) {
                    scrollAmount = 0;
                }
                track.style.transform = `translateX(${scrollAmount}px)`;
                requestAnimationFrame(animate);
            };
            // Solo activar si hay contenido para desplazar
            setTimeout(animate, 1000);
        }
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
