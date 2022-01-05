let estadoFormulario = false;

//vista del carrito, botones e importe total.
function vistaCarrito(){
    return `<h2>CARRITO</h2>
            <h4 id='importe'>IMPORTE TOTAL: $ ${importeGuardado}</h4>
            <button class="btn btn-secondary" id="botonComprar" >Comprar</button>
            <button class="btn btn-secondary" id="btnCerrarCarrito" >Cerrar</button>
            <br>
            `;
} 


let comprar;  
let nombreCliente;
let emailCliente;
let telCliente;
let dirCliente;
let cliente = new Clientes( "nombreCliente","emailCliente","telCliente", "dirCliente");
let nuevoPedido = new Pedido (ordenDeCompra, cliente);

//implementa vista del carrito y funcionalidades de botones, implementa validación de input del formulario
function estructuraCarrito(){
	let tituloCarrito = document.createElement("div");   
	tituloCarrito.id="titleChart";
	tituloCarrito.innerHTML = vistaCarrito();	
	miCarrito.append(tituloCarrito);
	let btnClose = document.getElementById("btnCerrarCarrito");
	btnClose.addEventListener("click", closeChart);
	pagar = document.getElementById("botonPagar")
	pagar.addEventListener("click", verificarFormulario )
	function verificarFormulario(e) {
		//si el formulario esta ok, finaliza compra
		e.preventDefault();
		validarImputsFormulario ();
		if ( estadoFormulario ) {
			datosForm(); 
			finalizarCompra();
			estadoFormulario = false;
			formulario.reset();
		} 
	} 
	comprar = document.getElementById("botonComprar")
	comprar.addEventListener("click", ()=>{ 	
	ordenarBotones(); 
	});
}
estructuraCarrito()

//ordena que botón es visible según la etapa del proceso
function ordenarBotones(){
	let totalAComprar = localStorage.getItem("importeTotal")
	if (totalAComprar > 0){
		document.getElementById("chartForm").style.display="block";
		document.getElementById("botonComprar").style.visibility="hidden";
		document.getElementById("botonPagar").style.display="inline";
	} 
}

//Esta función tiene la estructura de los cards de productos en carrito
function vistaProductoEnCarrito(producto){ 
    return `<div id=${producto.id + "zapato"} class="col-12 col-sm-12 col-md-3 card productoCarrito">
            <img src= ${producto.img} width="150px" class="card-img-top mt-3"  alt=${producto.name}>
            <p class="my-0 pComprado">${producto.nombre}</p>
            <p class="my-2">Precio $ ${producto.precio}</p>	
            <p>Cantidad ${producto.cantidad}</p>
            <button type="button" class="btn btn-secondary btn-sm" id=${producto.id+"remover"}>Quitar</button>
            </div>` //
}

//Despliega el carrito, funcionalidad de botones de producto en carrito para quitar elementros del mismo
function openChart() {
	document.getElementById("miCarrito").style.width = "100%";
	for (const producto of ordenDeCompra) {
		$(".productosComprados").append(vistaProductoEnCarrito(producto))
		$(`#${producto.id+"remover"}`).on('click',  () => quitarProductos());
		function quitarProductos(){
			//quita productos del carrito y de ordenDeCompra
			if (producto.cantidad > 1) {	
				producto.cantidad--;
				let itemToRemove = document.getElementById(`${producto.id + "zapato"}`);
				itemToRemove.innerHTML = vistaProductoEnCarrito(producto);
				$(`#${producto.id+"remover"}`).on('click',  () => quitarProductos());
				//repito funcionalidad itemToRemove.innerHTML hace perder la funcionalidad del botón
				importe(ordenDeCompra); 		
			}
			else if (producto.cantidad === 1) {
				producto.cantidad--;
				let itemToRemove = document.getElementById(`${producto.id + "zapato"}`);
				itemToRemove.parentNode.removeChild(itemToRemove);
				let om = ordenDeCompra.findIndex(elemento => elemento.id === producto.id);
				let removido = ordenDeCompra.splice(om,1);
				importe(ordenDeCompra);	
								
			}
			localStorage.setItem("ordenDeCompra", JSON.stringify(ordenDeCompra));
			if (importeTotal === 0){
				//Si avanzado el proceso de compra, ya abierto el formulario, se quita producto, resetea carrito 
				finalizarCarrito()
				document.getElementById("chartForm").style.display = "none"; 	
			}
		}
	} 
}  

//botón para abrir carrito, miCarrito tiene width 0 por defecto, con btnOpen pasa a 100%
let btnOpen = document.getElementById("abrirCarrito");
btnOpen.addEventListener("click", openChart);


//cierre de carrito, quita elementos para que no se dupliquen en una nueva selección del miemo producto
function closeChart() {
	while (productosComprados.firstChild) {
		productosComprados.removeChild(productosComprados.firstChild);
	};
	document.getElementById("miCarrito").style.width = "0";
} 
let btnClose = document.getElementById("btnCerrarCarrito");
btnClose.addEventListener("click", closeChart);

//Quita lo elementos del carrito finalizada la compra
function finalizarCarrito(){
	let carrito = document.getElementById("titleChart")
	carrito.parentNode.removeChild(carrito);
	closeChart();
	estructuraCarrito();
}

// Comprueba que se haya enviado exitosamente la información de la compra, muestra mensaje de despedida al cliente, configura boton de cierre dle carrito, y quita los elementos comprados del carrito
function finalizarCompra(){
	$.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(nuevoPedido),function(respuesta, estado){
        if (estado) {
			pagar.style.display = "none";
			document.getElementById("importe").style.display = "none";
			let tituloCarrito = document.getElementById("titleChart");
			tituloCarrito.innerHTML = `<h6>Gracias por su compra</h6>
			                        <h6>Su pedido ha sido procesado</h6>
			                        <button class="btn btn-secondary" id="btnFinalizarCarrito" type="reset" >Cerrar</button>`;
			ordenDeCompra = [];
			localStorage.clear();
			let btnClose = document.getElementById("btnFinalizarCarrito");
            btnClose.addEventListener("click", finalizarCarrito);
			document.getElementById("chartForm").style.display = "none"; 
			while (productosComprados.firstChild) {
				productosComprados.removeChild(productosComprados.firstChild);
			}
		}
    });
	
}