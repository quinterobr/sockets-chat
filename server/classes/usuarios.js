class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id) {
        return this.personas.filter(persona => persona.id === id)[0];
    }

    getPersonas() {
        return this.personas;
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        return personaBorrada;
    }

    getPersonaPorSala(sala) {
        let PersonasEnSala = this.personas.filter(persona => persona.sala === sala);
        return PersonasEnSala;
    }


}

module.exports = { Usuarios };