//Esta funcion filtra por color 
function buscarProductoPorColor() {
	const botonBusqueda = document.getElementById("btnFiltro");
	botonBusqueda.addEventListener("click", filtrarMostrar)
	function filtrarMostrar(){
		while (contenedorProductos.firstChild) {
			contenedorProductos.removeChild(contenedorProductos.firstChild);
		};//si hay algo previamente cargado lo borra
		let colorBusqueda = document.getElementById("selectorColor").value;
		if (colorBusqueda === "todos"){
			cargarProductos(arrayDeProductos); 
		}
		else{
			const encontrado = arrayDeProductos.filter((elemento) => elemento.color === colorBusqueda);			
			cargarProductos(encontrado)
		}
	}
}
buscarProductoPorColor()


// filtra el array por precio, rango tomado del select del html
function buscarPreciosBaratos() {
	const btnFiltroPrecio = document.getElementById("btnFiltroPrecio");
	btnFiltroPrecio.addEventListener("click",filtroPrecio);
	function filtroPrecio(){
		let minimo=0;
		let maximo=document.getElementById("selectorPrecio").value;
		const baratos = arrayDeProductos.filter((producto) => producto.precio >  minimo && producto.precio <= maximo);
		while (contenedorProductos.firstChild) {
			contenedorProductos.removeChild(contenedorProductos.firstChild);
		};//si hay algo previamente cargado lo borra
		cargarProductos(baratos)
	}
}

buscarPreciosBaratos()