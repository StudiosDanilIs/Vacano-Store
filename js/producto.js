document.addEventListener('DOMContentLoaded', () => {
    // --- JSON de Productos ---
    const productsData = [{
        "id": "gorra-negra-clasica",
        "nombre": "Gorra Negra Clásica",
        "descripcion": "El básico que nunca falla, ideal para cualquier outfit urbano. Ajuste perfecto. Confeccionada con materiales de alta durabilidad y un diseño atemporal que combina con todo. Ideal para uso diario.",
        "descripcion_corta": "El básico que nunca falla, ideal para cualquier outfit urbano. Ajuste perfecto.",
        "precio": 75.00, // Precio en soles
        "imagenes": [
            "/imagenes/3.jpeg",
            "/imagenes/1.jpeg",
            "/imagenes/4.jpeg"
        ],
        "stock": 15,
        "categoria": "clásicas",
        "destacado": true,
        "enOferta": false
    }, {
        "id": "gorra-blanca-minimalista",
        "nombre": "Gorra Blanca Minimalista",
        "descripcion": "Estilo puro y limpio, un accesorio imprescindible para un look fresco. Fabricada con algodón transpirable para máxima comodidad, perfecta para los días soleados.",
        "descripcion_corta": "Estilo puro y limpio, un accesorio imprescindible para un look fresco.",
        "precio": 80.00, // Precio en soles
        "imagenes": [
            "/imagenes/3.jpeg"
        ],
        "stock": 10,
        "categoria": "minimalista",
        "destacado": true,
        "enOferta": false
    }, {
        "id": "gorra-azul-deportiva",
        "nombre": "Gorra Azul Deportiva",
        "descripcion": "Confeccionada para el confort y el estilo en tus actividades diarias. Material ligero y absorbe la humedad, ideal para entrenamientos o para un look casual y activo.",
        "descripcion_corta": "Confeccionada para el confort y el estilo en tus actividades diarias.",
        "precio": 90.00, // Precio en soles
        "imagenes": [
            "/imagenes/4.jpeg"
        ],
        "stock": 8,
        "categoria": "deportiva",
        "destacado": true,
        "enOferta": false
    }, {
        "id": "gorra-roja-estilo-retro",
        "nombre": "Gorra Roja Estilo Retro",
        "descripcion": "Diseño vibrante con un toque retro. ¡Ideal para destacar! Fabricada con sarga de algodón de alta calidad y un ajuste snapback para mayor comodidad.",
        "descripcion_corta": "Diseño vibrante con un toque retro. ¡Ideal para destacar!",
        "precio": 78.75, // Precio en soles (25% de descuento de 105.00)
        "precioOriginal": 105.00, // Precio en soles
        "descuento": 25,
        "imagenes": [
            "/imagenes/2.jpeg"
        ],
        "stock": 5,
        "categoria": "oferta",
        "destacado": false,
        "enOferta": true
    }, {
        "id": "gorra-camuflaje-urbana-v1",
        "nombre": "Gorra Camuflaje Urbana V1",
        "descripcion": "Perfecta para un look atrevido y moderno. Edición limitada. Su patrón de camuflaje te da un toque distintivo y urbano, ideal para combinar con tu ropa casual.",
        "descripcion_corta": "Perfecta para un look atrevido y moderno. Edición limitada.",
        "precio": 105.00, // Precio en soles (15% de descuento de 123.53 aprox)
        "precioOriginal": 123.53, // Precio en soles
        "descuento": 15,
        "imagenes": [
            "/imagenes/2.jpeg",
            "/imagenes/ss.jpeg"
        ],
        "stock": 7,
        "categoria": "oferta",
        "destacado": false,
        "enOferta": true
    }, {
        "id": "gorra-camuflaje-urbana-v2",
        "nombre": "Gorra Camuflaje Urbana V2",
        "descripcion": "Perfecta para un look atrevido y moderno. Edición limitada. Su patrón de camuflaje te da un toque distintivo y urbano, ideal para combinar con tu ropa casual.",
        "descripcion_corta": "Perfecta para un look atrevido y moderno. Edición limitada.",
        "precio": 105.00, // Precio en soles (15% de descuento de 123.53 aprox)
        "precioOriginal": 123.53, // Precio en soles
        "descuento": 15,
        "imagenes": [
            "/imagenes/2.jpeg"
        ],
        "stock": 7,
        "categoria": "oferta",
        "destacado": false,
        "enOferta": true
    }, {
        "id": "gorra-camuflaje-urbana-v3",
        "nombre": "Gorra Camuflaje Urbana V3",
        "descripcion": "Perfecta para un look atrevido y moderno. Edición limitada. Su patrón de camuflaje te da un toque distintivo y urbano, ideal para combinar con tu ropa casual.",
        "descripcion_corta": "Perfecta para un look atrevido y moderno. Edición limitada.",
        "precio": 105.00, // Precio en soles (15% de descuento de 123.53 aprox)
        "precioOriginal": 123.53, // Precio en soles
        "descuento": 15,
        "imagenes": [
            "/imagenes/ss.jpeg"
        ],
        "stock": 7,
        "categoria": "oferta",
        "destacado": false,
        "enOferta": true
    }, {
        "id": "gorra-gris-casual",
        "nombre": "Gorra Gris Casual",
        "descripcion": "Un estilo relajado para el día a día. Versátil y cómoda, se adapta a cualquier ocasión. Confección robusta y un diseño limpio que nunca pasa de moda.",
        "descripcion_corta": "Un estilo relajado para el día a día. Versátil y cómoda.",
        "precio": 65.00, // Precio en soles
        "imagenes": [
            "/imagenes/1.jpeg"
        ],
        "stock": 20,
        "categoria": "casual",
        "destacado": false,
        "enOferta": false
    }, {
        "id": "gorra-verde-militar",
        "nombre": "Gorra Verde Militar",
        "descripcion": "Ideal para un estilo robusto y aventurero. Diseño duradero y resistente. Perfecta para actividades al aire libre o para un toque urbano con carácter.",
        "descripcion_corta": "Estilo robusto y aventurero. Diseño duradero.",
        "precio": 95.00, // Precio en soles
        "imagenes": [
            "/imagenes/4.jpeg"
        ],
        "stock": 12,
        "categoria": "militar",
        "destacado": true,
        "enOferta": false
    }, {
        "id": "gorra-rosa-pastel",
        "nombre": "Gorra Rosa Pastel",
        "descripcion": "Un toque suave y moderno para tu look. Material ligero y transpirable. Ideal para quienes buscan un estilo fresco y delicado.",
        "descripcion_corta": "Toque suave y moderno. Ligera y transpirable.",
        "precio": 85.00, // Precio en soles
        "imagenes": [
            "/imagenes/3.jpeg"
        ],
        "stock": 9,
        "categoria": "moda",
        "destacado": false,
        "enOferta": false
    }, {
        "id": "gorra-beige-elegante",
        "nombre": "Gorra Beige Elegante",
        "descripcion": "Sofisticación en cada detalle, perfecta para un estilo casual chic. Tela de alta calidad y un ajuste cómodo, ideal para cualquier ocasión.",
        "descripcion_corta": "Sofisticación en cada detalle. Casual chic.",
        "precio": 100.00, // Precio en soles
        "imagenes": [
            "/imagenes/1.jpeg"
        ],
        "stock": 6,
        "categoria": "elegante",
        "destacado": false,
        "enOferta": false
    }];

    // --- Elementos del DOM Comunes ---
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
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileNavLinks = document.querySelectorAll('#mobileNavOverlay ul li a');
    const header = document.querySelector('.header');

    const defaultImage = 'https://placehold.co/400x250/8892B0/0A192F?text=Imagen+No+Disp';
    const phoneNumber = '+51933450055'; // Nuevo número de teléfono

    // --- Funciones de Utilidad ---

    /**
     * Genera el HTML para una tarjeta de producto.
     * @param {Object} product - Objeto producto del JSON.
     * @param {string} cardClass - Clase CSS para el tipo de tarjeta (e.g., 'producto-card', 'collection-card', 'offer-card').
     * @returns {string} HTML de la tarjeta de producto.
     */
    function createProductCardHTML(product, cardClass) {
        const imagenSrc = (product.imagenes && product.imagenes.length > 0) ?
            product.imagenes[0] :
            defaultImage;

        let priceHTML = `<span class="precio">S/${product.precio.toFixed(2)}</span>`;
        let discountBadgeHTML = '';

        if (product.enOferta && product.precioOriginal && product.descuento) {
            priceHTML = `
                <div class="price-container">
                    <span class="original-price">S/${product.precioOriginal.toFixed(2)}</span>
                    <span class="discounted-price">S/${product.precio.toFixed(2)}</span>
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
            console.error(`Contenedor no encontrado.`);
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

        // Renderizar para inicio.html
        if (path.includes('/index.html') || path === '/') {
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
        if (path.endsWith('/catalogo.html') || document.getElementById('allProductsGrid')) {
            const allProductsGrid = document.getElementById('allProductsGrid');
            if (allProductsGrid) {
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
        modalDescripcion.textContent = product.descripcion;

        if (product.enOferta && product.precioOriginal && product.descuento) {
            modalPrecioOriginal.textContent = `S/${product.precioOriginal.toFixed(2)}`;
            modalPrecioOriginal.style.display = 'inline-block';
            modalPrecioDescuento.textContent = `S/${product.precio.toFixed(2)}`;
            modalDescuentoBadge.textContent = `${product.descuento}% OFF`;
            modalDescuentoBadge.style.display = 'inline-block';
        } else {
            modalPrecioOriginal.style.display = 'none';
            modalPrecioDescuento.textContent = `S/${product.precio.toFixed(2)}`;
            modalDescuentoBadge.style.display = 'none';
        }

        let whatsappMessage = '';
        let productPriceText = `S/${product.precio.toFixed(2)}`;
        if (product.enOferta && product.precioOriginal) {
            productPriceText = `S/${product.precio.toFixed(2)} (Antes S/${product.precioOriginal.toFixed(2)}, ${product.descuento}% OFF)`;
        }

        if (typeof product.stock === 'number') {
            if (product.stock > 0) {
                whatsappModalBtn.textContent = 'Preguntar por WhatsApp';
                whatsappModalBtn.classList.remove('disabled');
                whatsappMessage = `Hola! Estoy interesado en la gorra "${product.nombre}" (ID: ${product.id}).`;
                whatsappMessage += `\nSu precio es: ${productPriceText}.`;
                whatsappMessage += `\n¿Me podrías confirmar si está disponible y si tienen más fotos?`;
            } else {
                whatsappModalBtn.textContent = 'Producto Agotado';
                whatsappModalBtn.classList.add('disabled');
                whatsappModalBtn.href = "#";
                whatsappMessage = '';
            }
        } else {
            whatsappModalBtn.textContent = 'Preguntar por WhatsApp';
            whatsappModalBtn.classList.remove('disabled');
            whatsappMessage = `Hola! Estoy interesado en la gorra "${product.nombre}" (ID: ${product.id}).`;
            whatsappMessage += `\nSu precio es: ${productPriceText}.`;
            whatsappMessage += `\n¿Podrías darme más información sobre este producto?`;
        }

        if (whatsappMessage) {
            whatsappModalBtn.href = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
        } else {
            whatsappModalBtn.href = `https://wa.me/${phoneNumber.replace('+', '')}`;
        }

        modalProducto.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Cierra el modal de producto.
     */
    function closeModal() {
        modalProducto.style.display = 'none';
        document.body.style.overflow = '';
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
            const iconHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
            if (themeToggleBtn) themeToggleBtn.innerHTML = iconHTML;
            if (themeToggleMobileBtn) themeToggleMobileBtn.innerHTML = iconHTML;
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark-mode');
            const iconHTML = '<i class="fas fa-sun"></i> Modo Claro';
            if (themeToggleBtn) themeToggleBtn.innerHTML = iconHTML;
            if (themeToggleMobileBtn) themeToggleMobileBtn.innerHTML = iconHTML;
        }
    }

    // Cargar el tema guardado o establecer el predeterminado (dark)
    const currentTheme = localStorage.getItem('theme');
    applyTheme(currentTheme === 'light-mode');

    // Event listeners para los botones de cambio de tema
    [themeToggleBtn, themeToggleMobileBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                applyTheme(!document.body.classList.contains('light-mode'));
            });
        }
    });

    // --- Funcionalidad del Menú Hamburguesa ---
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Cierra el menú móvil al hacer clic en un enlace o fuera de él
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('click', (event) => {
        if (mobileNavOverlay.classList.contains('active') &&
            !mobileNavOverlay.contains(event.target) &&
            !hamburgerMenu.contains(event.target)) {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });


    // --- Funcionalidad de Scroll-to-top y ocultar/mostrar header ---
    let lastScrollY = 0;
    const scrollThreshold = 50;

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            // Scroll-to-top button visibility
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }

            // Header visibility
            if (header) { // Asegura que el header existe
                if (window.scrollY > lastScrollY && window.scrollY > scrollThreshold) {
                    header.classList.add('hidden');
                } else if (window.scrollY < lastScrollY) {
                    header.classList.remove('hidden');
                }

                if (window.scrollY === 0) {
                    header.classList.remove('hidden');
                }
            }
            lastScrollY = window.scrollY;
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // --- Configuración Inicial de Enlaces de WhatsApp FAB ---
    if (whatsappFab) {
        whatsappFab.href = `https://wa.me/${phoneNumber.replace('+', '')}`;
    }

    // Cargar el contenido cuando el DOM esté listo
    loadContent();
});