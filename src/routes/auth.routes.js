const { Router } = require("express");
const { check } = require("express-validator");
const { existeRol, existeCorreo } = require("../helpers/validaciones-db");
const { login, register, renew } = require("../controllers/auth.controllers");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/registro",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),

    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(existeCorreo),
    check("rol").custom(existeRol),
    validarCampos,
  ],
  register
);

router.get("/", [validarJWT], renew);

module.exports = router;
