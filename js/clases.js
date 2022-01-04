class Producto {
	constructor(id,nombre,precio,color,stock,estilo,img,cantidad) {
		this.id = id;
		this.nombre = nombre; 
		this.precio = parseFloat(precio);
		this.color = color;
		this.stock = stock;
		this.estilo = estilo;
		this.img = img;
		this.cantidad = cantidad || 0;
	}
	aumentarCantidad() {
		this.cantidad++;
	}
}

class Clientes {      
    constructor(nombre, email, telefono, direccion) {
        this.nombre = nombre;
        this.email = email;
		this.telefono = telefono
        this.direccion = direccion;
    }
}

class Pedido {
	constructor(ordenDeCompra,cliente){
	this.ordenDeCompra = ordenDeCompra;
	this.cliente = cliente;
	}
}