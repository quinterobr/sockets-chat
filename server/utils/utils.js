const crearMensaje = (nombre, msn) => {
    return {
        nombre,
        msn,
        fecha: new Date().getTime()
    }
}

module.exports = { crearMensaje };