document.addEventListener('DOMContentLoaded', () => {
    // --- Configuración Global ---
    const whatsappNumber = '584247337211';
    const defaultImage = 'https://via.placeholder.com/300x300?text=Imagen+no+disponible';

    // --- Elementos del DOM ---
    const catalogoGrid = document.getElementById('catalogoProductos');
    const coleccionDestacadaGrid = document.getElementById('coleccionDestacadaGrid'); // Nuevo ID para la sección destacada
    const ofertasEspecialesGrid = document.getElementById('ofertasEspecialesGrid'); // Nuevo ID para la sección de ofertas

    const modalProducto = document.getElementById('modalProducto');
    const cerrarModalBtn = document.querySelector('.cerrar-modal');
    const modalImagenPrincipal = document.getElementById('modal-imagen-principal');
    const modalNombreProducto = document.getElementById('modal-nombre-producto');
    const modalDescripcionProducto = document.getElementById('modal-descripcion-producto');
    const modalPrecioProducto = document.getElementById('modal-precio-producto');
    const modalStockProducto = document.getElementById('modal-stock-producto');
    const miniaturasContainer = document.querySelector('.miniaturas-container');
    const whatsappModalBtn = document.querySelector('.whatsapp-modal-btn');
    const whatsappFab = document.querySelector('.whatsapp-fab');
    const contactWhatsappBtn = document.querySelector('.contact-whatsapp-btn');

    let allProducts = []; // Almacenará todos los productos cargados

    // --- Funciones para la Creación de Tarjetas de Producto ---

    /**
     * Crea un elemento de tarjeta de producto con la información proporcionada.
     * @param {Object} product - El objeto producto del JSON.
     * @param {string} cardType - Clase CSS para el tipo de tarjeta (e.g., 'producto-card', 'collection-card', 'offer-card')
     * @param {boolean} isOffer - Si es una oferta, para mostrar precios originales y descuentos.
     * @returns {HTMLElement} - El elemento div que representa la tarjeta del producto.
     */
    function createProductCard(product, cardType, isOffer = false) {
        const productCard = document.createElement('div');
        productCard.classList.add(cardType);

        const imagenSrc = (product.imagenes && product.imagenes.length > 0)
            ? product.imagenes[0]
            : defaultImage;

        let priceHtml = `<p class="precio">$${product.precio.toFixed(2)}</p>`;
        if (isOffer && product.precioOriginal && product.descuento) {
            priceHtml = `
                <p class="price">
                    <span class="original-price">$${product.precioOriginal.toFixed(2)}</span>
                    <span class="discounted-price">$${product.precio.toFixed(2)}</span>
                </p>
            `;
        }

        let discountBadge = '';
        if (isOffer && product.descuento) {
            discountBadge = `<span class="discount-badge">-${product.descuento}%</span>`;
        }

        productCard.innerHTML = `
            ${discountBadge}
            <div class="${cardType.replace('-card', '-image-wrapper')}">
                <img src="${imagenSrc}" alt="${product.nombre}" class="${cardType.replace('-card', '-image')}" loading="lazy">
            </div>
            <div class="${cardType.replace('-card', '-info')}">
                <h3>${product.nombre}</h3>
                <p>${product.descripcion_corta || product.descripcion.substring(0, 100) + '...'}</p> ${priceHtml}
                <button class="ver-detalles-btn" data-product-id="${product.id}">
                    Ver Detalles <i class="fas fa-eye"></i>
                </button>
            </div>
        `;
        return productCard;
    }

    /**
     * Renderiza una lista de productos en un contenedor específico.
     * @param {HTMLElement} container - El elemento DOM donde se renderizarán los productos.
     * @param {Array} productsToRender - Un array de objetos producto.
     * @param {string} cardType - Clase CSS para el tipo de tarjeta.
     * @param {boolean} isOfferSection - Indica si es la sección de ofertas para aplicar lógica de precios.
     */
    function renderProducts(container, productsToRender, cardType, isOfferSection = false) {
        if (!container) {
            console.error(`Contenedor '${container.id}' no encontrado en el DOM.`);
            return;
        }
        container.innerHTML = ''; // Limpia el contenedor
        if (productsToRender.length === 0) {
            container.innerHTML = `<p style="text-align: center; color: var(--color-texto-secundario);">No hay productos disponibles en esta sección.</p>`;
            return;
        }
        productsToRender.forEach(product => {
            const card = createProductCard(product, cardType, isOfferSection);
            container.appendChild(card);
        });
    }

    // --- Carga Principal de Datos y Renderizado ---
    async function cargarContenido() {
        try {
            const response = await fetch('productos.json');
            if (!response.ok) {
                throw new Error(`Error de red o archivo no encontrado: ${response.status}`);
            }
            const productos = await response.json();
            allProducts = productos; // Guarda todos los productos

            // Renderizar la sección de Catálogo Principal
            renderProducts(catalogoGrid, allProducts, 'producto-card');

            // Renderizar la sección de Colección Destacada (filtrar o seleccionar productos)
            // Aquí puedes definir tu lógica: por ejemplo, los primeros 3, o los que tengan 'destacado: true' en JSON
            const destacados = allProducts.filter(p => p.destacado).slice(0, 3); // Asume que tienes un campo 'destacado: true'
            if (coleccionDestacadaGrid) {
                renderProducts(coleccionDestacadaGrid, destacados, 'collection-card');
            }

            // Renderizar la sección de Ofertas Especiales (filtrar por ofertas)
            // Asume que tienes un campo 'enOferta: true' o 'descuento' en JSON
            const ofertas = allProducts.filter(p => p.enOferta); // O p.descuento > 0
            if (ofertasEspecialesGrid) {
                renderProducts(ofertasEspecialesGrid, ofertas, 'offer-card', true); // 'true' para indicar que es una oferta
            }


        } catch (error) {
            console.error('Error al cargar el contenido:', error);
            // Mensajes de error en los contenedores respectivos
            if (catalogoGrid) catalogoGrid.innerHTML = '<p>Error al cargar productos.</p>';
            if (coleccionDestacadaGrid) coleccionDestacadaGrid.innerHTML = '<p>Error al cargar colección destacada.</p>';
            if (ofertasEspecialesGrid) ofertasEspecialesGrid.innerHTML = '<p>Error al cargar ofertas.</p>';
        }
    }

    // --- Manejador de Eventos para Abrir el Modal (Delegación) ---
    // Usamos el 'document' como oyente para capturar clics en cualquier parte y luego filtrar.
    // Esto es robusto para elementos que se añaden dinámicamente.
    document.addEventListener('click', handleProductDetailsClick);

    function handleProductDetailsClick(event) {
        // Usa event.target.closest para encontrar el botón 'ver-detalles-btn'
        // incluso si se hace clic en el icono <i> dentro del botón.
        const button = event.target.closest('.ver-detalles-btn');
        if (button) {
            event.preventDefault(); // Evita que el enlace salte a #
            const productId = button.dataset.productId;
            const selectedProduct = allProducts.find(p => p.id === productId);

            if (selectedProduct) {
                mostrarModalProducto(selectedProduct);
            } else {
                console.warn(`Producto con ID ${productId} no encontrado en allProducts.`);
                alert('Lo sentimos, el detalle de este producto no está disponible en este momento.');
            }
        }
    }

    // 3. Muestra el modal de detalles del producto (sin cambios significativos aquí)
    function mostrarModalProducto(product) {
        if (!modalProducto) {
            console.error('El modal de producto no se encontró en el DOM.');
            return;
        }

        modalImagenPrincipal.src = (product.imagenes && product.imagenes.length > 0)
            ? product.imagenes[0]
            : defaultImage;
        modalImagenPrincipal.alt = product.nombre;

        modalNombreProducto.textContent = product.nombre;
        modalDescripcionProducto.textContent = product.descripcion;

        // Mostrar precio en el modal
        if (product.enOferta && product.precioOriginal && product.descuento) {
            modalPrecioProducto.innerHTML = `
                <span class="original-price-modal">$${product.precioOriginal.toFixed(2)}</span>
                <span class="discounted-price-modal">$${product.precio.toFixed(2)}</span>
                <span class="descuento-badge-modal">-${product.descuento}%</span>
            `;
        } else {
            modalPrecioProducto.textContent = `$${product.precio.toFixed(2)}`;
        }


        // Lógica de stock
        if (typeof product.stock === 'number') {
            modalStockProducto.textContent = `Stock: ${product.stock > 0 ? product.stock + ' unidades' : 'Agotado'}`;
            if (product.stock <= 0) {
                whatsappModalBtn.textContent = 'Producto Agotado';
                whatsappModalBtn.classList.add('disabled');
                whatsappModalBtn.href = "#";
            } else {
                whatsappModalBtn.textContent = 'Preguntar por WhatsApp';
                whatsappModalBtn.classList.remove('disabled');
                const message = encodeURIComponent(`Hola! Estoy interesado en el producto: ${product.nombre}. ID: ${product.id}. ¿Está disponible?`);
                whatsappModalBtn.href = `https://wa.me/${whatsappNumber}?text=${message}`;
            }
        } else {
            modalStockProducto.textContent = `Stock: ${product.stock}`;
            whatsappModalBtn.textContent = 'Preguntar por WhatsApp';
            whatsappModalBtn.classList.remove('disabled');
            const message = encodeURIComponent(`Hola! Estoy interesado en el producto: ${product.nombre}. ID: ${product.id}. ¿Podrías darme más información?`);
            whatsappModalBtn.href = `https://wa.me/${whatsappNumber}?text=${message}`;
        }

        // Limpia las miniaturas anteriores y carga las nuevas
        miniaturasContainer.innerHTML = '';
        if (product.imagenes && product.imagenes.length > 0) {
            product.imagenes.forEach((imgSrc, index) => {
                const miniatura = document.createElement('img');
                miniatura.src = imgSrc;
                miniatura.alt = `Vista ${index + 1} de ${product.nombre}`;
                miniatura.classList.add('miniatura');
                if (index === 0) miniatura.classList.add('activa');

                miniatura.addEventListener('click', () => {
                    modalImagenPrincipal.src = imgSrc;
                    document.querySelectorAll('.miniatura').forEach(thumb => thumb.classList.remove('activa'));
                    miniatura.classList.add('activa');
                });
                miniaturasContainer.appendChild(miniatura);
            });
        } else {
             miniaturasContainer.innerHTML = '<p style="color: var(--color-texto-secundario); font-size: 0.85rem;">No hay miniaturas disponibles.</p>';
        }

        modalProducto.style.display = 'block';
    }

    // --- Event Listeners para el Modal (mantienen su función) ---
    if (cerrarModalBtn) {
        cerrarModalBtn.addEventListener('click', () => {
            modalProducto.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modalProducto) {
            modalProducto.style.display = 'none';
        }
    });

    // --- Configuración Inicial de Enlaces de WhatsApp ---
    if (whatsappFab) {
        whatsappFab.href = `https://wa.me/${whatsappNumber}`;
    }

    if (contactWhatsappBtn) {
        contactWhatsappBtn.href = `https://wa.me/${whatsappNumber}`;
    }

    // --- Inicio de la Aplicación ---
    cargarContenido();
});