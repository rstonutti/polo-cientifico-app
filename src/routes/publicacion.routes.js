const { Router } = require("express");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const {
  crearComentario,
  borrarComentario,
  obtenerPublicaciones,
  obtenerPublicacion,
  crearPublicacion,
  borrarPublicacion,
} = require("../controllers/publicacion.controllers");

const router = Router();

router.post("/commentario", [validarJWT], crearComentario);

router.delete("/comentario", [validarJWT], borrarComentario);

router.get("/", obtenerPublicaciones);

router.get("/:id", obtenerPublicacion);

router.post("/", [validarJWT], crearPublicacion);

router.delete("/", borrarPublicacion);

module.exports = router;
