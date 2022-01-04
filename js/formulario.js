const formulario = document.getElementById('chartForm');
const misInputs = document.querySelectorAll('#chartForm input');

const expresionDeNombre =  /^[a-zA-ZÀ-ÿ\s]{4,40}$/; // Letras y espacios, pueden llevar acentos.
const expresionDeDireccion =/^[a-zA-Z0-9\_\-\s]{4,16}$/; // Letras, numeros, guion y guion_bajo
const expresionDeCorreo =/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const expresionDeTelefono = /^\d{7,14}$/; // 7 a 14 numeros.
const expresionDeTarjeta =  /^\d+$/;

const campos = {
    nombre: false,
	direccion: false,
	email: false,
	telefono: false,
    tarjeta: false,
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.querySelector(`#grupo__${campo} .inputError`).classList.remove('inputErrorActivo');
        campos[campo] = true;
	} else {
		document.querySelector(`#grupo__${campo} .inputError`).classList.add('inputErrorActivo'); 
		campos[campo] = false;
	}
} 

//este funcion asigna a cada input su espresión regular de validación
 function validarImputsFormulario (){
    for (input of misInputs){
        switch (input.id) {
            case "inputNombre":
                validarCampo(expresionDeNombre, input, 'nombre');
            break;
            case "inputDireccion":
                validarCampo(expresionDeDireccion, input, 'direccion');
            break;
            case "inputEmail":
                validarCampo(expresionDeCorreo, input, 'email');
            break;
            case "inputTelefono":
                validarCampo(expresionDeTelefono, input, 'telefono');
            break;
            case "inputTarjeta":
                validarCampo(expresionDeTarjeta, input, 'tarjeta');
            break;
            
        }
    } 
    if(campos.nombre && campos.direccion  && campos.tarjeta && campos.email && campos.telefono){
        
        estadoFormulario = true;
    }
}

function datosForm (){
    nombreCliente=$("#inputNombre").val();
    emailCliente =$("#inputEmail").val();
    telCliente =$("#inputTelefono").val();
    dirCliente=$("#inputDireccion").val();
    cliente.nombre = `${nombreCliente}`;
	cliente.direccion = dirCliente;
	cliente.email = emailCliente;
	cliente.telefono = telCliente;
}
