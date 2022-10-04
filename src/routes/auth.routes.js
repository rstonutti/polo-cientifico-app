const router = require("express").Router();
const { check } = require("express-validator");
const {
  existeCorreo,
  existeNombre,
  existeRol,
  existeUsuarioID,
} = require("../helpers/validacionesDB");
const {
  registrar,
  login,
  revalidarToken,
} = require("../controllers/auth.controllers");
const {
  validarCampos,
  validarJWT,
  adminRole,
  tieneRole,
} = require("../middlewares");

router.post(
  "/registrar",
  [
    check("nombre", "El nombre de usuario no debe estar vacío").not().isEmpty(),
    check(
      "nombre",
      "El nombre de usuario debe tener como minimo 2 caracteres"
    ).isLength({ min: 2 }),
    check("nombre").custom(existeNombre),
    check("contrasenia", "La contraseña no debe estar vacía").not().isEmpty(),
    check(
      "contrasenia",
      "La contraseña debe tener como minimo 8 caracteres"
    ).isLength({ min: 8 }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(existeCorreo),
    validarCampos,
  ],
  registrar
);

router.post("/login", login);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
