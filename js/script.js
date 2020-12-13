//--------------------------------------VARIABLES------------------------------------
const carrito = document.getElementById('carrito');
const producto = document.getElementById('lista-producto');
const listaProducto = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//--------------------------------------LISTENER------------------------------------
cargarEventListener();

function cargarEventListener() {
    
    producto.addEventListener('click', comprarProducto);
    carrito.addEventListener('click', eliminarProducto);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

//--------------------------------------FUNCIONES------------------------------------

//añadir el producto
function comprarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.parentElement.parentElement;
        // almacenar en leerDatosProducto
        leerDatosProducto(producto);
    }
}

//leer los datos del prodcuto
function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('.imagen_producto img').src,
        titulo: producto.querySelector('.nombre_producto p').textContent,
        precio: producto.querySelector('.precio_producto p').textContent,
        id: producto.querySelector('a').getAttribute('data-id')
        }
    insertarCarrito(infoProducto);
}

//insertar producto en el carrito mediante una fila
function insertarCarrito(producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
        <img src="${producto.imagen}" width="100">
        </td>
        <td>${producto.titulo}</td>
        <td> ${producto.precio}</td>
        <td>
        <a href="#" class="borrar-producto" data-id"${producto.id}">x</a>
        </td>
    `;
    listaProducto.appendChild(row);
    guardarProductoLocalStorage(producto);
}

// eliminar productos
function eliminarProducto(e) {
    e.preventDefault();
    let producto, productoID;
    if (e.target.classList.contains('borrar-producto')) {
        e.target.parentElement.parentElement.remove();
        producto = e.target.parentElement.parentElement;
        productoID = producto.querySelector('a').getAttribute('data-id');
    }
    eliminarProductoLocalStorage(productoID);

}

// eliminar usando boton vaciar carrito
function vaciarCarrito() {
    while (listaProducto.firstChild) {
        listaProducto.removeChild(listaProducto.firstChild);
    }
    vaciarLocalStorage();
    return false;
}

// guardar productos en el local storage
function guardarProductoLocalStorage(producto) {
    let productos;
    productos = obtenerProductosLocalStorage();
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
}
//sacar productos del local storage
function obtenerProductosLocalStorage() {
    let productoLS;
    if (localStorage.getItem('productos') === null) {
        productoLS = [];
    } else {
        productoLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productoLS;
}

// mostrar los prodcutos del local storage
function leerLocalStorage() {
    let productoLS;
    productoLS = obtenerProductosLocalStorage();
    productoLS.forEach(function(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
            <img src="${producto.imagen}" width="100">
            </td>
            <td>${producto.titulo}</td>
            <td> ${producto.precio}</td>
            <td>
            <a href="#" class="borrar-producto" data-id"${producto.id}">x</a>
            </td>
        `;
        listaProducto.appendChild(row);
    });
}

//eliminar producto del local sotrage
function eliminarProductoLocalStorage(producto) {
    let productoLS;
    productoLS = obtenerProductosLocalStorage();
    productoLS.forEach(function(productoLS, index) {
        if (productoLS === producto) {
            productoLS.splice(index, 1);
        }
    });
    localStorage.setItem('producto', JSON.stringify(productoLS));
}

//vaciar local storage

function vaciarLocalStorage() {
    localStorage.clear();
}