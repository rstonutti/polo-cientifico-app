const {
    Publicacion,
    Rol,
    Tipo,
    Usuario } = require('../models');

//Verificamos si el nombre de usuario existe en mi BD.
const existeNombre = async (nombre = '') => {
    const existeNombre = await Usuario.findOne({ nombre });
    if (existeNombre) {
        //Se usa throw new Error cuando se quiere lanzar mensajes personalizados usando express-validator.
        throw new Error(`El nombre de usuario ${nombre} ya está en uso`);
    };
};

//Verificamos si el correo existe en mi BD.
const existeCorreo = async (correo = '') => {
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`El correo ${correo} ya está en uso`);
    };
};

//Verificamos si el rol existe en la BD.
const existeRol = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe`);
    };
};

const existeTipo = async (tipo = '') => {
    const existeTipo = await Tipo.findOne({ tipo });
    if (!existeTipo) {
        throw new Error(`El tipo ${tipo} no existe`);
    };
};

//Verificamos si existe un usuario con ese ID.
const existeUsuarioID = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    };
};

const existePublicacionID = async (id) => {
    const existePublicacion = await Publicacion.findById(id);
    if (!existePublicacion) {
        throw new Error(`El id ${id} no existe`);
    };
};

module.exports = {
    existeNombre,
    existeCorreo,
    existeRol,
    existeTipo,
    existeUsuarioID,
    existePublicacionID
};