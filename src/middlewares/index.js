//Se crea un archivo index porque al importar la carpeta "Middlewares" la exportación por si misma va a buscar el index
//y nos ahorramos un poco más de código

const validarCampos = require('./validarCampos.js');
const validarJWT    = require('./validarJWT.js');
const validarRoles  = require('./validarRoles.js');
const validarImagen = require('./validarImagen')

//Utilizamos el spread porque entonces se exporta todo lo que venga de cada archivo.

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarImagen
};