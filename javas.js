let nombre = document.getElementById("nombre");
let tel = document.getElementById("telefono");
let correo = document.getElementById("correo");
let agregar = document.getElementById("agregar");
let tabla = document.getElementById("tablabody");
let reservaform = document.getElementById("reservaform");

let contactos = [];

class Contacto {
    constructor(nombre, telefono, email) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
    }

    modificarTelefono(nuevoTelefono) {
        this.telefono = nuevoTelefono;
    }

    modificarEmail(nuevoEmail) {
        this.email = nuevoEmail;
    }
}

function agregarContacto() {
    if (!reservaform.checkValidity()) {
        reservaform.reportValidity();
        return;
    }

    let nuevoContacto = new Contacto(nombre.value, tel.value, correo.value);
    contactos.push(nuevoContacto);

    listarContactos();

    reservaform.reset();
}

reservaform.addEventListener("submit", (event) => {
    event.preventDefault();
    agregarContacto();
});

function agregarFilaTabla(contacto, index) {
    let fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${contacto.nombre}</td>
        <td>${contacto.telefono}</td>
        <td>${contacto.email}</td>
        <td>
           <button class="btn btn-danger" onclick="eliminarContacto(${index})">
                <i class="bi bi-trash3"></i> Eliminar
            </button>
            <button class="btn btn-warning" onclick="editarContacto(${index})">
                <i class="bi bi-pencil-square"></i> Editar
            </button>
        </td>
    `;

    tabla.appendChild(fila);
}


function listarContactos() {
    tabla.innerHTML = "";
    contactos.forEach((contacto, index) => {
        agregarFilaTabla(contacto, index);
    });
}


function eliminarContacto(index) {
    contactos.splice(index, 1);
    listarContactos();
}


function editarContacto(index) {
    let contacto = contactos[index];

    nombre.value = contacto.nombre;
    tel.value = contacto.telefono;
    correo.value = contacto.email;

    agregar.textContent = "Actualizar";

    agregar.onclick = function () {
        if (!reservaform.checkValidity()) {
            reservaform.reportValidity();
            return;
        }

        contacto.nombre = nombre.value;
        contacto.modificarTelefono(tel.value);
        contacto.modificarEmail(correo.value);

        listarContactos();

        
        reservaform.reset();
        agregar.textContent = "Agregar";

        
        agregar.onclick = agregarContacto;
    };
}

agregar.onclick = agregarContacto;
