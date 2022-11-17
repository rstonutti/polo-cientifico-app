const { Router } = require("express");

const {
  obtenerPublicaciones,
  obtenerPublicacion,
  crearPublicacion,
  borrarPublicacion,
} = require("../controllers/publicacion.controllers");

const router = Router();

router.get("/", obtenerPublicaciones);

router.get("/:id", obtenerPublicacion);

router.post("/", crearPublicacion);

router.put("/:id", borrarPublicacion);

module.exports = router;
