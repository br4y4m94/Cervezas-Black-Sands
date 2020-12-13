const btnEnviar  =document.getElementById('enviar');
const nombre  =document.getElementById('nombre');
const email  =document.getElementById('email');
const telefono  =document.getElementById('telefono');
const mensaje  =document.getElementById('mensaje');
const formularioEnviar  =document.getElementById('enviar-email');


eventListener();

function eventListener() {
    document.addEventListener ('DOMContentLoaded', inicioApp);
    //campos del fomrulario
    nombre.addEventListener('blur', validarCampo);
    email.addEventListener('blur', validarCampo);
    telefono.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);
    formularioEnviar.addEventListener('submit', enviarEmail);
}

function inicioApp(){
    btnEnviar.disabled = true;
}

function validarCampo(){
    validarLongitud(this);
    if(this.type === 'email'){
        validarEmail(this); 
    }
    let errores  = document.querySelectorAll('.error');
    if (nombre.value !== '' && email.value !== '' && telefono.value !== '' && mensaje.value !== ''){
        if (errores.length === 0 ){
            btnEnviar.disabled = false;
        }
    }
}

function validarLongitud(campo){
    if(campo.value.length > 0){
        campo.classList.remove('validar-input');   
    } else {
        campo.classList.add('error-input');
    }
}

function validarEmail(campo){
    const mensaje = campo.value;
    if(mensaje.indexOf('@')!== -1){
        campo.classList.remove('error');
    } else {
        campo.classList.add('error');
    }
}

function enviarEmail(e){
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';
    const enviado = document.createElement('img');
    enviado.src = '../img/enviadobien.gif'
    enviado.style.display = 'block'
    enviado.style.width = '5rem'
    enviado.style.height = '5rem'
    setTimeout(function(){
        spinnerGif.style.display = 'none';
        document.querySelector('#loaders').appendChild(enviado);
        setTimeout(function(){
            enviado.remove();
            formularioEnviar.reset();
        }, 2000);
    }, 2000);
    e.preventDefault();
}