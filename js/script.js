// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- JSON de Productos (Corregido y con IDs únicos) ---
    const productsData = [
        {
            "id": "gorra-negra-clasica",
            "nombre": "Gorra Negra Clásica",
            "descripcion": "El básico que nunca falla, ideal para cualquier outfit urbano. Ajuste perfecto. Confeccionada con materiales de alta durabilidad y un diseño atemporal que combina con todo. Ideal para uso diario.",
            "descripcion_corta": "El básico que nunca falla, ideal para cualquier outfit urbano. Ajuste perfecto.",
            "precio": 20.00,
            "imagenes": [
                "imagenes/3.jpeg",
                "imagenes/1.jpeg",
                "imagenes/4.jpeg"
            ],
            "stock": 15,
            "categoria": "clásicas",
            "destacado": true,
            "enOferta": false
        },
        {
            "id": "gorra-blanca-minimalista",
            "nombre": "Gorra Blanca Minimalista",
            "descripcion": "Estilo puro y limpio, un accesorio imprescindible para un look fresco. Fabricada con algodón transpirable para máxima comodidad, perfecta para los días soleados.",
            "descripcion_corta": "Estilo puro y limpio, un accesorio imprescindible para un look fresco.",
            "precio": 22.00,
            "imagenes": [
                "imagenes/3.jpeg"
            ],
            "stock": 10,
            "categoria": "minimalista",
            "destacado": true,
            "enOferta": false
        },
        {
            "id": "gorra-azul-deportiva",
            "nombre": "Gorra Azul Deportiva",
            "descripcion": "Confeccionada para el confort y el estilo en tus actividades diarias. Material ligero y absorbe la humedad, ideal para entrenamientos o para un look casual y activo.",
            "descripcion_corta": "Confeccionada para el confort y el estilo en tus actividades diarias.",
            "precio": 25.00,
            "imagenes": [
                "imagenes/4.jpeg"
            ],
            "stock": 8,
            "categoria": "deportiva",
            "destacado": true,
            "enOferta": false
        },
        {
            "id": "gorra-roja-estilo-retro",
            "nombre": "Gorra Roja Estilo Retro",
            "descripcion": "Diseño vibrante con un toque retro. ¡Ideal para destacar! Fabricada con sarga de algodón de alta calidad y un ajuste snapback para mayor comodidad.",
            "descripcion_corta": "Diseño vibrante con un toque retro. ¡Ideal para destacar!",
            "precio": 21.00,
            "precioOriginal": 28.00,
            "descuento": 25,
            "imagenes": [
                "imagenes/2.jpeg"
            ],
            "stock": 5,
            "categoria": "oferta",
            "destacado": false,
            "enOferta": true
        },
        {
            "id": "gorra-camuflaje-urbana-a", // ID corregido
            "nombre": "Gorra Camuflaje Urbana V1",
            "descripcion": "Perfecta para un look atrevido y moderno. Edición limitada. Su patrón de camuflaje te da un toque distintivo y urbano, ideal para combinar con tu ropa casual.",
            "descripcion_corta": "Perfecta para un look atrevido y moderno. Edición limitada.",
            "precio": 29.75,
            "precioOriginal": 35.00,
            "descuento": 15,
            "imagenes": [
                "imagenes/2.jpeg",
                "imagenes/ss.jpeg"
            ],
            "stock": 7,
            "categoria": "oferta",
            "destacado": false,
            "enOferta": true
        },
        {
            "id": "gorra-camuflaje-urbana-b", // ID corregido
            "nombre": "Gorra Camuflaje Urbana V2",
            "descripcion": "Perfecta para un look atrevido y moderno. Edición limitada. Su patrón de camuflaje te da un toque distintivo y urbano, ideal para combinar con tu ropa casual.",
            "descripcion_corta": "Perfecta para un look atrevido y moderno. Edición limitada.",
            "precio": 29.75,
            "precioOriginal": 35.00,
            "descuento": 15,
            "imagenes": [
                "imagenes/2.jpeg"
            ],
            "stock": 7,
            "categoria": "oferta",
            "destacado": false,
            "enOferta": true
        },
        {
            "id": "gorra-camuflaje-urbana-c", // ID corregido
            "nombre": "Gorra Camuflaje Urbana V3",
            "descripcion": "Perfecta para un look atrevido y moderno. Edición limitada. Su patrón de camuflaje te da un toque distintivo y urbano, ideal para combinar con tu ropa casual.",
            "descripcion_corta": "Perfecta para un look atrevido y moderno. Edición limitada.",
            "precio": 29.75,
            "precioOriginal": 35.00,
            "descuento": 15,
            "imagenes": [
                "imagenes/ss.jpeg"
            ],
            "stock": 7,
            "categoria": "oferta",
            "destacado": false,
            "enOferta": true
        },
        {
            "id": "gorra-gris-casual",
            "nombre": "Gorra Gris Casual",
            "descripcion": "Un estilo relajado para el día a día. Versátil y cómoda, se adapta a cualquier ocasión. Confección robusta y un diseño limpio que nunca pasa de moda.",
            "descripcion_corta": "Un estilo relajado para el día a día. Versátil y cómoda.",
            "precio": 18.00,
            "imagenes": [
                "imagenes/1.jpeg"
            ],
            "stock": 20,
            "categoria": "casual",
            "destacado": false,
            "enOferta": false
        },
        {
            "id": "gorra-verde-militar",
            "nombre": "Gorra Verde Militar",
            "descripcion": "Ideal para un estilo robusto y aventurero. Diseño duradero y resistente. Perfecta para actividades al aire libre o para un toque urbano con carácter.",
            "descripcion_corta": "Estilo robusto y aventurero. Diseño duradero.",
            "precio": 26.00,
            "imagenes": [
                "imagenes/4.jpeg"
            ],
            "stock": 12,
            "categoria": "militar",
            "destacado": true,
            "enOferta": false
        },
        {
            "id": "gorra-rosa-pastel",
            "nombre": "Gorra Rosa Pastel",
            "descripcion": "Un toque suave y moderno para tu look. Material ligero y transpirable. Ideal para quienes buscan un estilo fresco y delicado.",
            "descripcion_corta": "Toque suave y moderno. Ligera y transpirable.",
            "precio": 23.00,
            "imagenes": [
                "imagenes/3.jpeg"
            ],
            "stock": 9,
            "categoria": "moda",
            "destacado": false,
            "enOferta": false
        },
        {
            "id": "gorra-beige-elegante",
            "nombre": "Gorra Beige Elegante",
            "descripcion": "Sofisticación en cada detalle, perfecta para un estilo casual chic. Tela de alta calidad y un ajuste cómodo, ideal para cualquier ocasión.",
            "descripcion_corta": "Sofisticación en cada detalle. Casual chic.",
            "precio": 28.00,
            "imagenes": [
                "imagenes/1.jpeg"
            ],
            "stock": 6,
            "categoria": "elegante",
            "destacado": false,
            "enOferta": false
        }
    ];

    // --- Elementos del DOM Comunes a ambas páginas ---
    const modalProducto = document.getElementById('productModal');
    const cerrarModalBtn = document.querySelector('.cerrar-modal');
    const modalImagenPrincipal = document.getElementById('modal-imagen-principal');
    const modalMiniaturasContainer = document.querySelector('.miniaturas-container');
    const modalTitulo = document.getElementById('modal-titulo-producto');
    const modalDescripcion = document.getElementById('modal-descripcion-producto');
    const modalPrecioOriginal = document.getElementById('modal-precio-original');
    const modalPrecioDescuento = document.getElementById('modal-precio-descuento');
    const modalDescuentoBadge = document.getElementById('modal-descuento-badge');
    const whatsappModalBtn = document.getElementById('whatsappModalBtn');
    const whatsappFab = document.querySelector('.whatsapp-fab');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const themeToggleBtn = document.getElementById('themeToggle'); // Desktop
    const themeToggleMobileBtn = document.getElementById('themeToggleMobile'); // Mobile

    // --- Elementos del DOM para el menú responsive ---
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileNavLinks = document.querySelectorAll('#mobileNavOverlay ul li a');


    const defaultImage = 'https://placehold.co/400x250/8892B0/0A192F?text=Imagen+No+Disp'; // Placeholder si no hay imagen

    // --- Funciones de Utilidad ---

    /**
     * Genera el HTML para una tarjeta de producto.
     * @param {Object} product - Objeto producto del JSON.
     * @param {string} cardClass - Clase CSS para el tipo de tarjeta (e.g., 'producto-card', 'collection-card', 'offer-card').
     * @returns {string} HTML de la tarjeta de producto.
     */
    function createProductCardHTML(product, cardClass) {
        const imagenSrc = (product.imagenes && product.imagenes.length > 0)
            ? product.imagenes[0]
            : defaultImage;

        let priceHTML = `<span class="precio">$${product.precio.toFixed(2)}</span>`;
        let discountBadgeHTML = '';

        if (product.enOferta && product.precioOriginal && product.descuento) {
            priceHTML = `
                <div class="price-container">
                    <span class="original-price">$${product.precioOriginal.toFixed(2)}</span>
                    <span class="discounted-price">$${product.precio.toFixed(2)}</span>
                </div>
            `;
            discountBadgeHTML = `<div class="discount-badge">${product.descuento}% OFF</div>`;
        }

        return `
            <div class="${cardClass}" data-product-id="${product.id}">
                ${discountBadgeHTML}
                <div class="${cardClass.replace('-card', '-image-wrapper')}">
                    <img src="${imagenSrc}" alt="${product.nombre}" class="${cardClass.replace('-card', '-image')}" loading="lazy" onerror="this.onerror=null;this.src='${defaultImage}';">
                </div>
                <div class="${cardClass.replace('-card', '-info')}">
                    <h3>${product.nombre}</h3>
                    <p>${product.descripcion_corta}</p>
                    ${priceHTML}
                    <button class="ver-detalles-btn" data-product-id="${product.id}">
                        Ver Detalles <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza un array de productos en un contenedor dado.
     * @param {HTMLElement} containerElement - El elemento DOM donde renderizar.
     * @param {Array} productsToRender - Array de objetos producto.
     * @param {string} cardClass - Clase CSS de la tarjeta (ej. 'producto-card').
     */
    function renderProducts(containerElement, productsToRender, cardClass) {
        if (!containerElement) {
            console.error(`Contenedor '${containerElement}' no encontrado.`);
            return;
        }
        containerElement.innerHTML = ''; // Limpiar contenido existente

        if (productsToRender.length === 0) {
            containerElement.innerHTML = `<p style="text-align: center; color: var(--color-texto-secundario);">No hay productos disponibles en esta sección.</p>`;
            return;
        }

        productsToRender.forEach(product => {
            containerElement.innerHTML += createProductCardHTML(product, cardClass);
        });
    }

    // --- Carga y Renderizado de Contenido Dinámico ---
    function loadContent() {
        const path = window.location.pathname;

        // Renderizar para index.html
        if (path.includes('index.html') || path === '/') {
            const featuredGrid = document.getElementById('featuredProductsGrid');
            const offersGrid = document.getElementById('offerProductsGrid');

            if (featuredGrid) {
                const featuredProducts = productsData.filter(p => p.destacado);
                renderProducts(featuredGrid, featuredProducts, 'collection-card');
            }

            if (offersGrid) {
                const offerProducts = productsData.filter(p => p.enOferta);
                renderProducts(offersGrid, offerProducts, 'offer-card');
            }
        }

        // Renderizar para catalogo.html
        // ¡LA MODIFICACIÓN CLAVE ESTÁ AQUÍ!
        // Ahora verifica si la ruta termina en '/catalogo' (URL limpia de Netlify)
        // O si el elemento del catálogo (allProductsGrid) existe en la página.
        if (path.endsWith('/catalogo') || document.getElementById('allProductsGrid')) {
            const allProductsGrid = document.getElementById('allProductsGrid');
            if (allProductsGrid) { // Esta comprobación es importante
                renderProducts(allProductsGrid, productsData, 'producto-card');
            }
        }

        // Después de renderizar las tarjetas, adjuntar los event listeners para el modal
        attachModalEventListeners();
    }

    // --- Lógica del Modal ---

    /**
     * Adjunta los event listeners a los botones "Ver Detalles".
     * Se llama después de que las tarjetas de producto son renderizadas dinámicamente.
     */
    function attachModalEventListeners() {
        document.querySelectorAll('.ver-detalles-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.currentTarget.dataset.productId;
                const selectedProduct = productsData.find(p => p.id === productId);

                if (selectedProduct) {
                    openModal(selectedProduct);
                } else {
                    console.warn(`Producto con ID ${productId} no encontrado.`);
                    // En lugar de alert, podrías mostrar un mensaje en la UI
                    // alert('Producto no disponible.');
                }
            });
        });
    }

    /**
     * Abre el modal y muestra los detalles del producto.
     * @param {Object} product - El objeto producto a mostrar.
     */
    function openModal(product) {
        modalImagenPrincipal.src = product.imagenes[0] || defaultImage;
        modalImagenPrincipal.alt = product.nombre;

        modalMiniaturasContainer.innerHTML = '';
        if (product.imagenes && product.imagenes.length > 0) {
            product.imagenes.forEach((imgSrc, index) => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = `Vista ${index + 1} de ${product.nombre}`;
                img.classList.add('miniatura');
                if (index === 0) img.classList.add('activa');
                img.addEventListener('click', () => {
                    modalImagenPrincipal.src = imgSrc;
                    document.querySelectorAll('.miniatura').forEach(thumb => thumb.classList.remove('activa'));
                    img.classList.add('activa');
                });
                modalMiniaturasContainer.appendChild(img);
            });
        } else {
            modalMiniaturasContainer.innerHTML = `<p style="color: var(--color-texto-secundario); font-size: 0.85rem;">No hay miniaturas disponibles.</p>`;
        }


        modalTitulo.textContent = product.nombre;
        modalDescripcion.textContent = product.descripcion; // Mostrar descripción completa

        // Lógica de precios en el modal
        if (product.enOferta && product.precioOriginal && product.descuento) {
            modalPrecioOriginal.textContent = `$${product.precioOriginal.toFixed(2)}`;
            modalPrecioOriginal.style.display = 'inline-block';
            modalPrecioDescuento.textContent = `$${product.precio.toFixed(2)}`;
            modalDescuentoBadge.textContent = `${product.descuento}% OFF`;
            modalDescuentoBadge.style.display = 'inline-block';
        } else {
            modalPrecioOriginal.style.display = 'none';
            modalPrecioDescuento.textContent = `$${product.precio.toFixed(2)}`;
            modalDescuentoBadge.style.display = 'none';
        }

        // Lógica de stock y botón de WhatsApp MEJORADO
        let whatsappMessage = '';
        let productPriceText = product.precio.toFixed(2);
        if (product.enOferta && product.precioOriginal) {
            productPriceText = `${product.precio.toFixed(2)} (Antes $${product.precioOriginal.toFixed(2)}, ${product.descuento}% OFF)`;
        }

        if (typeof product.stock === 'number') {
            if (product.stock > 0) {
                whatsappModalBtn.textContent = 'Preguntar por WhatsApp';
                whatsappModalBtn.classList.remove('disabled');
                whatsappMessage = `Hola! Estoy interesado en la gorra "${product.nombre}" (ID: ${product.id}).`;
                whatsappMessage += `\nSu precio es: $${productPriceText}.`;
                whatsappMessage += `\n¿Me podrías confirmar si está disponible y si tienen más fotos?`;
            } else {
                whatsappModalBtn.textContent = 'Producto Agotado';
                whatsappModalBtn.classList.add('disabled');
                whatsappModalBtn.href = "#"; // Deshabilitar enlace
                whatsappMessage = ''; // Si está agotado, no hay mensaje predefinido para evitar confusión.
            }
        } else { // Para stock como "consultar" o texto (o si no se especifica stock)
            whatsappModalBtn.textContent = 'Preguntar por WhatsApp';
            whatsappModalBtn.classList.remove('disabled');
            whatsappMessage = `Hola! Estoy interesado en la gorra "${product.nombre}" (ID: ${product.id}).`;
            whatsappMessage += `\nSu precio es: $${productPriceText}.`;
            whatsappMessage += `\n¿Podrías darme más información sobre este producto?`;
        }

        // Si hay un mensaje, lo codificamos para la URL de WhatsApp
        if (whatsappMessage) {
            whatsappModalBtn.href = `https://wa.me/584247337211?text=${encodeURIComponent(whatsappMessage)}`;
        } else {
            whatsappModalBtn.href = "https://wa.me/584247337211"; // Solo abre el chat si el producto está agotado o no hay mensaje específico
        }


        modalProducto.style.display = 'flex'; // Usar flex para centrado con CSS
        document.body.style.overflow = 'hidden'; // Evita scroll en el body cuando el modal está abierto
    }

    /**
     * Cierra el modal de producto.
     */
    function closeModal() {
        modalProducto.style.display = 'none';
        document.body.style.overflow = ''; // Restaura scroll en el body
    }

    // Event listeners para cerrar el modal
    if (cerrarModalBtn) {
        cerrarModalBtn.addEventListener('click', closeModal);
    }
    window.addEventListener('click', (event) => {
        if (event.target === modalProducto) {
            closeModal();
        }
    });

    // --- Funcionalidad del Tema Claro/Oscuro ---
    function applyTheme(isLightMode) {
        if (isLightMode) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
            if (themeToggleMobileBtn) themeToggleMobileBtn.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark-mode');
            if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
            if (themeToggleMobileBtn) themeToggleMobileBtn.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
        }
    }

    // Cargar el tema guardado o establecer el predeterminado (dark)
    const currentTheme = localStorage.getItem('theme');
    applyTheme(currentTheme === 'light-mode');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            applyTheme(!document.body.classList.contains('light-mode'));
        });
    }
    if (themeToggleMobileBtn) {
        themeToggleMobileBtn.addEventListener('click', () => {
            applyTheme(!document.body.classList.contains('light-mode'));
        });
    }


    // --- Funcionalidad del Menú Hamburguesa ---
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Evita scroll en el body
        });
    }

    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restaura scroll
        });
    }

    // Cierra el menú móvil al hacer clic en un enlace
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Cierra el menú móvil si se hace clic fuera de él
    window.addEventListener('click', (event) => {
        if (mobileNavOverlay.classList.contains('active') && !mobileNavOverlay.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });


    // --- Funcionalidad de Scroll-to-top ---
    if (scrollToTopBtn) { // Asegura que el botón existe
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Mostrar el botón después de 300px de scroll
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Desplazamiento suave
            });
        });
    }

    // --- Configuración Inicial de Enlaces de WhatsApp FAB ---
    if (whatsappFab) {
        whatsappFab.href = `https://wa.me/584247337211`; // Reemplaza XXXXXXXXXX
    }

    // Cargar el contenido cuando el DOM esté listo
    loadContent();
});