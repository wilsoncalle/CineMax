// Manipulación del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        if (navMenu) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        }
    });
    
    // Animación de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Trailer popup (simulado)
    const trailerOverlay = document.querySelector('.trailer-overlay');
    
    if (trailerOverlay) {
        trailerOverlay.addEventListener('click', function() {
            showTrailerPopup();
        });
    }
    
    function showTrailerPopup() {
        // Crear modal para el trailer
        const modal = document.createElement('div');
        modal.className = 'trailer-modal';
        modal.innerHTML = `
            <div class="trailer-modal-content">
                <span class="close-modal">&times;</span>
                <div class="trailer-placeholder">
                    <h3>Trailer de película destacada</h3>
                    <p>En una implementación real, aquí se reproduciría un video de YouTube o similar.</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Estilo para el modal (inline para simplicidad del ejemplo)
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '2000';
        
        const modalContent = modal.querySelector('.trailer-modal-content');
        modalContent.style.backgroundColor = '#222';
        modalContent.style.padding = '30px';
        modalContent.style.borderRadius = '6px';
        modalContent.style.width = '80%';
        modalContent.style.maxWidth = '800px';
        modalContent.style.position = 'relative';
        
        const closeButton = modal.querySelector('.close-modal');
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '15px';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#fff';
        
        const trailerPlaceholder = modal.querySelector('.trailer-placeholder');
        trailerPlaceholder.style.color = '#fff';
        trailerPlaceholder.style.textAlign = 'center';
        trailerPlaceholder.style.padding = '100px 0';
        
        // Cerrar el modal
        closeButton.addEventListener('click', function() {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        });
        
        // También cerrar al hacer clic fuera del contenido
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }
        });
    }
    
    // Efecto parallax para la sección hero
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            // Efecto de parallax muy sutil
            hero.style.backgroundPositionY = `${scrollPosition * 0.15}px`;
        }
    });
    
    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica de envío del formulario mediante AJAX
            // Por ahora, solo simulamos la acción
            
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const messageInput = this.querySelector('#message');
            const submitButton = this.querySelector('button[type="submit"]');
            
            if (nameInput && emailInput && messageInput && submitButton &&
                nameInput.value && emailInput.value && messageInput.value) {
                // Simular envío
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Enviando...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    showNotification('Mensaje enviado correctamente. Gracias por contactarnos.');
                    
                    // Resetear formulario
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1500);
            } else {
                showNotification('Por favor, completa todos los campos requeridos.', 'error');
            }
        });
    }
    
    function showNotification(message, type = 'success') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilo para la notificación
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '4px';
        notification.style.color = '#fff';
        notification.style.zIndex = '3000';
        notification.style.maxWidth = '300px';
        notification.style.opacity = '1';
        notification.style.transition = 'opacity 0.5s ease';
        
        if (type === 'success') {
            notification.style.backgroundColor = '#0A39E4';
        } else {
            notification.style.backgroundColor = '#e44a0a';
        }
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }
    
    // ---- TMDb API Integration & Movie Display ----
    
    const apiKey = 'c0840fb5f5f8687cea8b594994cedca5';
    const language = 'es-ES';
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';
    const baseApiUrl = 'https://api.themoviedb.org/3';
    
    const popularMoviesEndpoint = `${baseApiUrl}/movie/popular?api_key=${apiKey}&language=${language}`;
    const genresEndpoint = `${baseApiUrl}/genre/movie/list?api_key=${apiKey}&language=${language}`;
    const discoverEndpointBase = `${baseApiUrl}/discover/movie?api_key=${apiKey}&language=${language}&sort_by=popularity.desc`;
    
    const moviesContainer = document.getElementById('cartelera-peliculas');
    const genreFiltersContainer = document.getElementById('genre-filters');
    
    // Function to display movies in the grid
    function displayMovies(movies) {
        if (!moviesContainer) return;
        moviesContainer.innerHTML = '';
        
        if (!movies || movies.length === 0) {
            moviesContainer.innerHTML = '<p>No se encontraron películas para esta selección.</p>';
            return;
        }
        
        movies.forEach(movie => {
            if (movie.poster_path) {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                const posterUrl = imageBaseUrl + movie.poster_path;
                
                movieCard.innerHTML = `
                    <div class="movie-poster">
                        <img src="${posterUrl}" alt="${movie.title}" loading="lazy">
                        <div class="movie-overlay">
                            <button class="btn-tickets" data-movie-title="${encodeURIComponent(movie.title)}">Ver Detalles</button>
                        </div>
                    </div>
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <div class="movie-meta">
                            <span class="rating">
                                <i class="fas fa-star"></i> ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                            </span>
                        </div>
                        <span class="genre">${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</span>
                    </div>
                `;
                moviesContainer.appendChild(movieCard);
            }
        });
        
        attachTicketModalListeners();
    }
    
    // Function to fetch movies (popular or filtered by genre)
    async function fetchMovies(endpoint) {
        if (!moviesContainer) {
            console.error('Error: Container for movies not found.');
            return;
        }
        moviesContainer.innerHTML = '<div class="loading-indicator"><p>Cargando películas...</p></div>';
        
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.status_message || 'Unknown error'}`);
            }
            const data = await response.json();
            displayMovies(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
            moviesContainer.innerHTML = `<p>Hubo un error al cargar las películas: ${error.message}. Por favor, inténtalo de nuevo más tarde.</p>`;
        }
    }
    
    // Function to fetch genres and create filter buttons
    async function fetchAndDisplayGenres() {
        if (!genreFiltersContainer) {
            console.error("Genre filters container not found");
            return;
        }
        
        try {
            const response = await fetch(genresEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const genres = data.genres;
            
            genreFiltersContainer.innerHTML = '';
            
            // Add "All" button
            const allButton = document.createElement('button');
            allButton.classList.add('filter-btn', 'active');
            allButton.textContent = 'Todos';
            allButton.addEventListener('click', () => {
                setActiveFilterButton(allButton);
                fetchMovies(popularMoviesEndpoint);
            });
            genreFiltersContainer.appendChild(allButton);
            
            // Add buttons for each genre
            if (genres && genres.length > 0) {
                genres.forEach(genre => {
                    const genreButton = document.createElement('button');
                    genreButton.classList.add('filter-btn');
                    genreButton.textContent = genre.name;
                    genreButton.dataset.genreId = genre.id;
                    genreButton.addEventListener('click', () => {
                        setActiveFilterButton(genreButton);
                        const discoverUrl = `${discoverEndpointBase}&with_genres=${genre.id}`;
                        fetchMovies(discoverUrl);
                    });
                    genreFiltersContainer.appendChild(genreButton);
                });
            } else {
                genreFiltersContainer.innerHTML += '<p>No se pudieron cargar los géneros.</p>';
            }
            
        } catch (error) {
            console.error('Error fetching genres:', error);
            genreFiltersContainer.innerHTML = '<p>Error al cargar géneros.</p>';
        }
    }
    
    // Helper function to manage active state of filter buttons
    function setActiveFilterButton(activeButton) {
        if (!genreFiltersContainer) return;
        const filterButtons = genreFiltersContainer.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
    
    // Function to attach listeners to "Ver Detalles" buttons
    function attachTicketModalListeners() {
        if (!moviesContainer) return;
        const buyButtons = moviesContainer.querySelectorAll('.btn-tickets');
        buyButtons.forEach(button => {
            const newMovieTitle = button.dataset.movieTitle;
            const clickHandler = (e) => {
                e.preventDefault();
                const decodedTitle = decodeURIComponent(newMovieTitle);
                showTicketModal(decodedTitle);
            };
            button.removeEventListener('click', button._clickHandler);
            button.addEventListener('click', clickHandler);
            button._clickHandler = clickHandler;
        });
    }
    
    // --- Ticket Purchase Modal ---
    function showTicketModal(movieTitle) {
        const existingModal = document.querySelector('.ticket-modal');
        if (existingModal) {
            document.body.removeChild(existingModal);
        }
        
        const modal = document.createElement('div');
        modal.className = 'ticket-modal';
        modal.innerHTML = `
            <div class="ticket-modal-content">
                <span class="close-modal">&times;</span>
                <h2>Comprar entradas para "${movieTitle}"</h2>
                <div class="ticket-form">
                    <p>En una implementación real, aquí iría un formulario para seleccionar fecha, hora, asientos, etc.</p>
                    <div class="ticket-actions">
                        <button class="btn-primary continue-purchase">Continuar con la compra</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '2000';
        
        const modalContent = modal.querySelector('.ticket-modal-content');
        modalContent.style.backgroundColor = '#222';
        modalContent.style.padding = '30px';
        modalContent.style.borderRadius = '6px';
        modalContent.style.width = '90%';
        modalContent.style.maxWidth = '600px';
        modalContent.style.position = 'relative';
        modalContent.style.color = '#fff';
        
        const closeButton = modal.querySelector('.close-modal');
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '15px';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#fff';
        
        const closeModal = () => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        };
        
        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        const continueButton = modal.querySelector('.continue-purchase');
        if (continueButton) {
            continueButton.addEventListener('click', function() {
                showNotification(`Compra simulada para "${movieTitle}". En una implementación real, continuaría el proceso de compra.`);
                closeModal();
            });
        }
    }
    
    // --- Initial Load ---
    fetchAndDisplayGenres();
    fetchMovies(popularMoviesEndpoint);
});