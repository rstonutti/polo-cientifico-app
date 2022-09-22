const validacionesDB = require('./validacionesDB');
const generarJWT = require('./generarJWT');
const subirImagen = require('./subirImagen');

module.exports = {
    ...validacionesDB,
    ...generarJWT,
    ...subirImagen
}