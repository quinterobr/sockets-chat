var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');

// Referencia Jquery

var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');


function renderizarUsuario(personas) {
    var html = '';
    console.log(personas);

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '<a data-id = "' +
            personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);
}

function renderizarMensajes(msn, yo) {
    var fecha = new Date(msn.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();
    var html = '';
    var adminClass = 'Administrador';

    if (msn.nombre === 'info') adminClass = 'danger';


    if (yo) {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>' + msn.nombre + '</h5>';
        html += '<div class="box bg-light-inverse">' + msn.msn + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    } else {
        html += ' <li class="animated fadeIn">';

        if (msn.nombre != 'Administrador') html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';

        html += '<div class="chat-content">';
        html += '<h5>' + msn.nombre + '</h5>';
        html += '<div class="box bg-light-' + adminClass + '">' + msn.msn + '</div>';
        html += '</div>'
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }
    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//Listeners Jquery
divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) console.log(id);
});

formEnviar.on('submit', function(e) {
    e.preventDefault(); // Evita que cuando se haga enter o presione el boton se recargue la página del chat

    if (txtMensaje.val().trim().length === 0) {
        return;
    }
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });

})