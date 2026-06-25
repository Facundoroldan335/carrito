import { botines, itemsCarrito } from "./module.js";
// Seleccionamos los contenedores del HTML
const productos = document.querySelector(".productos");
const carrito = document.querySelector(".carrito");
const totalCarrito = document.querySelector(".totalCarrito");
// Recorremos todos los botines para mostrarlos en pantalla
botines.forEach((producto) => {
  const p = document.createElement("p");
  const articulo = document.createElement("article");
  const btnAgregar = document.createElement("button");
  btnAgregar.textContent = "Añadir a Carrito";
  btnAgregar.addEventListener("click", function () {
    const elementoEncontrado = itemsCarrito.find(
      (element) => element.id === producto.id,
    );
    if (elementoEncontrado) {
      elementoEncontrado.cantidad += 1;
    } else {
      itemsCarrito.push({...producto,cantidad: 1,});
    }
    console.log(itemsCarrito);
    clearUI();
    renderCarrito();
  });
  // Información del producto
  p.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
    ${producto.nombre}
    <span class="precio">$${producto.precio}</span>
  `;
  articulo.setAttribute("id", producto.id);
  articulo.append(p, btnAgregar);
  productos.append(articulo);
});
// Delegación de eventos para los botones del carrito
carrito.addEventListener("click", function (event) {
  const isBtnSuma = event.target.classList.contains("btn-suma");
  const isBtnResta = event.target.classList.contains("btn-resta");
  const isBtnEliminar = event.target.classList.contains("btn-eliminar");
  if (!isBtnSuma && !isBtnResta && !isBtnEliminar) return;
  const idProducto = parseInt(event.target.dataset.id);
  // Buscamos el producto dentro del carrito
  const elemento = itemsCarrito.find(
    (el) => el.id === idProducto
  );
  // Buscamos la posición del producto en el array
  const index = itemsCarrito.findIndex(
    (el) => el.id === idProducto
  );
  console.log(idProducto, elemento, index);
  if (!elemento) return;
  if (isBtnSuma) {
    elemento.cantidad += 1;
  }
  else if (isBtnResta && elemento.cantidad > 1) {
    elemento.cantidad -= 1;
  }
  else if (isBtnEliminar) {
    itemsCarrito.splice(index, 1);
  }
  clearUI();
  renderCarrito();
});
// Función que muestra los productos del carrito
function renderCarrito() {
  if (itemsCarrito.length === 0) return;
  const total = itemsCarrito.reduce((acc, el) => acc + el.precio * el.cantidad,0,);
  const fragmentCarrito = document.createDocumentFragment();
  // Recorremos todos los productos del carrito
  itemsCarrito.forEach((elemento) => {
    const articuloCarrito = document.createElement("div");
    articuloCarrito.innerHTML = `
  <p> ${elemento.nombre} - $${elemento.precio * elemento.cantidad} x ${elemento.cantidad}</p>
  <button class="btn-suma" data-id="${elemento.id}">+</button>
  <button class="btn-resta" data-id="${elemento.id}">-</button>
  <button class="btn-eliminar" data-id="${elemento.id}">X</button>
    `;
    fragmentCarrito.append(articuloCarrito);
  });

  totalCarrito.textContent = `Total: $${total}`;
  carrito.append(fragmentCarrito);
}
// Función para limpiar el carrito visualmente
function clearUI() {
  carrito.textContent = "";
  totalCarrito.textContent = "Total: $0";
}