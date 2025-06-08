// js/common-functions.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM Comunes (Compartidos) ---
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

    // Función para obtener los productos y la configuración regional
    // Esta función será definida en products-ve.js o products-pe.js
    let getRegionalConfig = () => {
        console.error("getRegionalConfig no ha sido definida. Asegúrate de cargar el script regional.");
        return {
            products: [],
            whatsappNumber: 'YOUR_DEFAULT_NUMBER', // Placeholder
            currencySymbol: '$' // Placeholder
        };
    };

    // Esto se ejecutará una vez que el script regional sea cargado
    window.setRegionalConfig = (config) => {
        getRegionalConfig = () => config;
        loadContent(); // Recargar contenido con la nueva configuración
        if (whatsappFab) {
            whatsappFab.href = `https://wa.me/${config.whatsappNumber}`;
        }
    };


    // --- Funciones de Utilidad ---

    /**
     * Genera el HTML para una tarjeta de producto.
     * @param {Object} product - Objeto producto del JSON.
     * @param {string} cardClass - Clase CSS para el tipo de tarjeta (e.g., 'producto-card', 'collection-card', 'offer-card').
     * @returns {string} HTML de la tarjeta de producto.
     */
    function createProductCardHTML(product, cardClass) {
        const { currencySymbol } = getRegionalConfig();

        const imagenSrc = (product.imagenes && product.imagenes.length > 0) ?
            product.imagenes[0] :
            defaultImage;

        let priceHTML = `<span class="precio">${currencySymbol}${product.precio.toFixed(2)}</span>`;
        let discountBadgeHTML = '';

        if (product.enOferta && product.precioOriginal && product.descuento) {
            priceHTML = `
                <div class="price-container">
                    <span class="original-price">${currencySymbol}${product.precioOriginal.toFixed(2)}</span>
                    <span class="discounted-price">${currencySymbol}${product.precio.toFixed(2)}</span>
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
        const { products } = getRegionalConfig();
        const path = window.location.pathname;

        // Renderizar para index.html
        if (path.includes('index.html') || path === '/') {
            const featuredGrid = document.getElementById('featuredProductsGrid');
            const offersGrid = document.getElementById('offerProductsGrid');

            if (featuredGrid) {
                const featuredProducts = products.filter(p => p.destacado);
                renderProducts(featuredGrid, featuredProducts, 'collection-card');
            }

            if (offersGrid) {
                const offerProducts = products.filter(p => p.enOferta);
                renderProducts(offersGrid, offerProducts, 'offer-card');
            }
        }

        // Renderizar para catalogo.html
        if (path.endsWith('/catalogo') || document.getElementById('allProductsGrid')) {
            const allProductsGrid = document.getElementById('allProductsGrid');
            if (allProductsGrid) {
                renderProducts(allProductsGrid, products, 'producto-card');
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
        const { products } = getRegionalConfig();
        document.querySelectorAll('.ver-detalles-btn').forEach(button => {
            button.removeEventListener('click', handleViewDetailsClick); // Evitar duplicados
            button.addEventListener('click', handleViewDetailsClick);
        });

        function handleViewDetailsClick(event) {
            const productId = event.currentTarget.dataset.productId;
            const selectedProduct = products.find(p => p.id === productId);

            if (selectedProduct) {
                openModal(selectedProduct);
            } else {
                console.warn(`Producto con ID ${productId} no encontrado.`);
            }
        }
    }

    /**
     * Abre el modal y muestra los detalles del producto.
     * @param {Object} product - El objeto producto a mostrar.
     */
    function openModal(product) {
        const { whatsappNumber, currencySymbol } = getRegionalConfig();

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
            modalPrecioOriginal.textContent = `${currencySymbol}${product.precioOriginal.toFixed(2)}`;
            modalPrecioOriginal.style.display = 'inline-block';
            modalPrecioDescuento.textContent = `${currencySymbol}${product.precio.toFixed(2)}`;
            modalDescuentoBadge.textContent = `${product.descuento}% OFF`;
            modalDescuentoBadge.style.display = 'inline-block';
        } else {
            modalPrecioOriginal.style.display = 'none';
            modalPrecioDescuento.textContent = `${currencySymbol}${product.precio.toFixed(2)}`;
            modalDescuentoBadge.style.display = 'none';
        }

        let whatsappMessage = '';
        let productPriceText = product.precio.toFixed(2);
        if (product.enOferta && product.precioOriginal) {
            productPriceText = `${product.precio.toFixed(2)} (Antes ${currencySymbol}${product.precioOriginal.toFixed(2)}, ${product.descuento}% OFF)`;
        }

        if (typeof product.stock === 'number') {
            if (product.stock > 0) {
                whatsappModalBtn.textContent = 'Preguntar por WhatsApp';
                whatsappModalBtn.classList.remove('disabled');
                whatsappMessage = `Hola! Estoy interesado en la gorra "${product.nombre}" (ID: ${product.id}).`;
                whatsappMessage += `\nSu precio es: ${currencySymbol}${productPriceText}.`;
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
            whatsappMessage += `\nSu precio es: ${currencySymbol}${productPriceText}.`;
            whatsappMessage += `\n¿Podrías darme más información sobre este producto?`;
        }

        if (whatsappMessage) {
            whatsappModalBtn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        } else {
            whatsappModalBtn.href = `https://wa.me/${whatsappNumber}`;
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

    // Initial load of content will happen once the regional script sets its config
});