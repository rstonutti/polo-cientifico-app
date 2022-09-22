const router = require("express").Router();
const { check } = require("express-validator");

const {
  obtenerUsuario,
  crearUsuario,
  editarUsuario,
  borrarUsuario,
} = require("../controllers/usuario.controllers");

const {
  existeCorreo,
  existeNombre,
  existeRol,
  existeUsuarioID,
} = require("../helpers/validacionesDB");

const {
  validarCampos,
  validarJWT,
  adminRole,
  tieneRole,
} = require("../middlewares");

router.get(
  "/:id",
  [
    validarJWT,
    tieneRole("admin_role", "collaboration_role", "user_role"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioID),
    validarCampos,
  ],
  obtenerUsuario
);

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
  crearUsuario
);

router.put(
  "/:id",
  [
    validarJWT,
    adminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioID),
    //check('nombre', 'El nombre de usuario no debe estar vacío').not().isEmpty(),
    //check('nombre', 'El nombre de usuario debe tener como minimo 8 caracteres').isLength({ min: 8 }),
    check("contrasenia", "La contraseña no debe estar vacía").not().isEmpty(),
    check(
      "contrasenia",
      "La contraseña debe tener como minimo 8 caracteres"
    ).isLength({ min: 8 }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(existeCorreo),
    check("rol").custom(existeRol),
    check("estado", "El estado no es válido").isBoolean(),
    validarCampos,
  ],
  editarUsuario
);

router.delete(
  "/:id",
  [
    validarJWT,
    adminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioID),
    validarCampos,
  ],
  borrarUsuario
);

module.exports = router;