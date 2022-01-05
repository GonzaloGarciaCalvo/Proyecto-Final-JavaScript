
/*   VARIABLES      */

const arrayDeProductos = [];
let ordenDeCompra = [];
let importeTotal;
let pagar;
let miData;
const almacenados = JSON.parse(localStorage.getItem("ordenDeCompra"));

// Trae datos  de productos
const URL = "datos/productos.json";
$.getJSON(URL, (response, status) => {
    if( status == "success") { 
			for(const elemento of response){
				arrayDeProductos.push(new Producto(elemento.id, elemento.nombre, elemento.precio, elemento.color, elemento.stock, elemento.estilo, elemento.img, elemento.cantidad))
			}
    } 
	cargarProductos(arrayDeProductos);
})

//Carga productos
function cargarProductos(productos){
	for (const producto of productos) {
		$("#contenedorProductos").append(`<div id=${producto.id + "ropa"} class="col-12 col-sm-12 col-md-3 card box my-3">
		<img src= ${producto.img} width="150px" class="card-img-top mt-3"  alt=${producto.name}>
		<p class="my-0">${producto.nombre}</p>
		<p class="my-2">Precio $ ${producto.precio}</p>	<br>
		<button type="button" class="btn btn-secondary" id=${producto.id}>Añadir al carrito</button>
		<h5 class="agregarAlCarrito" id="agregado${producto.id}" >Agregado al carrito</h5>
		</div>`)
		$(`#${producto.id}`).on('click',  () => comprarProductos(producto));
		$(`#${producto.id}`).on('click',  () => $(`#agregado${producto.id}`).delay(0).slideDown(200).delay(750).slideUp(300));
	}
}

//animacion de leyenda h2
function miAnimacion () {
	$("#bienvenida").css({
		"font-weight": "600",
		"color": "rgba(155, 0, 70, 0.99)",
		"font-size": "1.8rem"
	})
} 
$("#bienvenida").delay(800).fadeOut(1000).delay(700).slideDown(800, miAnimacion);



// Esta funcion permite comprar productos, previamente chequea si hay stock, es llamada en cargar productos
function comprarProductos(item) {
	let compra = ordenDeCompra.find((elemento) => elemento.id === item.id); // orden de compra es array de obj comprados
	let auxiliar;
	if (compra) {
		if (compra.cantidad < item.stock) {
			auxiliar = compra;
			compra.aumentarCantidad();
		} else {
			informarSinStock(compra);
		};
	} else {
		auxiliar = item;
		ordenDeCompra.push(auxiliar);
		auxiliar.aumentarCantidad(); 
	}
	importe(ordenDeCompra);
	localStorage.setItem("ordenDeCompra", JSON.stringify(ordenDeCompra));
}

// Esta funcion calcula el importe total de los productos cargados y agrega leyenda de importe total debajo del titulo carrito
function importe(compra) {   
	importeTotal = 0;
	for (const item of compra) {
		if (importeGuardado) {
			importeTotal =
				importeTotal + item.precio * item.cantidad; 
		} else {
			importeTotal = importeTotal + item.precio * item.cantidad;
		}
	}                           
	const contador = document.getElementById("importe"); 
	contador.innerHTML = `IMPORTE TOTAL: $ ${importeTotal}`;
	localStorage.setItem("importeTotal", importeTotal); 
}

// Esta funcion modifica la vista del producto sin stock 
function informarSinStock(producto) {    // CANDIDATO A VISTA
    const contenedor = document.getElementById(`${producto.id + "ropa"}`);  
	contenedor.innerHTML = `<img src= ${producto.img} width="150px" class="card-img-top mt-3" alt=${producto.name}>
							<p>${producto.nombre}</p>
							<p>Precio $ ${producto.precio}</p>
							<b>SIN STOCK</b>
							`;  
}

// cargar carrito si hay orden cargada en el localstorage
function cargarLocalStorage(){
	if(almacenados){
		for(const producto of almacenados){
			ordenDeCompra.push(new Producto(producto.id, producto.nombre, producto.precio, producto.color, producto.stock, producto.estilo, producto.img, producto.cantidad))
		}
		for(const compra of ordenDeCompra){
			if(compra.cantidad > compra.stock){
				informarSinStock(compra)
			}
		}
	}
}
cargarLocalStorage();


//trae el importe guardado en localstorage, si es que lo hay //se usa en calculo de importe y en vista de carrito
let importeGuardado;
if (localStorage.getItem("importeTotal")){
	importeGuardado = parseFloat(localStorage.getItem("importeTotal"))
} else importeGuardado = 0;







