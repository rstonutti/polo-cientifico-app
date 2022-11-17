const validaCampos = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-jwt");
const validaRoles = require("../middlewares/validar-roles");
const validarImagen = require("../middlewares/validar-imagen");

module.exports = {
  ...validaCampos,
  ...validarJWT,
  ...validaRoles,
  ...validarImagen,
};
