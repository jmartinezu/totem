let productosData = []; // Para guardar lo que viene del JSON
let carrito = [];

const productosGrid = document.getElementById('productos-grid');
const carritoItemsContenedor = document.getElementById('carrito-items');
const totalPrecioElemento = document.getElementById('total-precio');

// 1. Cargar productos desde el JSON
async function cargarProductos() {
    try {
        const respuesta = await fetch('assets/js/productos.json');
        productosData = await respuesta.json();
        renderizarProductos(productosData);
    } catch (error) {
        console.error("Error cargando el menú", error);
    }
}

// 2. Renderizar productos en el grid
function renderizarProductos(items) {
    productosGrid.innerHTML = '';
    items.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${prod.id})">Añadir</button>
        `;
        productosGrid.appendChild(div);
    });
}

// 3. Función para agregar al carrito (ahora sí definida)
window.agregarAlCarrito = (id) => {
    const producto = productosData.find(p => p.id === id);
    
    // Verificamos si ya está en el carrito para aumentar cantidad o añadir nuevo
    const itemEnCarrito = carrito.find(item => item.id === id);
    
    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    actualizarInterfazCarrito();
};

// 4. Actualizar la UI del carrito
function actualizarInterfazCarrito() {
    carritoItemsContenedor.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="item-info">
                <strong>${item.nombre}</strong>
                <span><span class="item-qty">${item.cantidad}</span> x $${item.precio.toFixed(2)}</span>
            </div>
            <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
        `;
        carritoItemsContenedor.appendChild(div);
    });

    totalPrecioElemento.innerText = `$${total.toFixed(2)}`;
}

// Inicializar
cargarProductos();