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

function renderizarMensajes(msn) {
    console.log('msn renderizado', msn);
    var html = '';
    html += ' <li class="animated fadeIn">';
    html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    html += '<div class="chat-content">';
    html += '<h5>' + msn.nombre + '</h5>';
    html += '<div class="box bg-light-info">' + msn.msn + '</div>';
    html += '</div>'
    html += '<div class="chat-time">10:56 am</div>';
    html += '</li>';

    divChatbox.append(html);
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
        renderizarMensajes(mensaje);
    });

})