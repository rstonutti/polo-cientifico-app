const router = require("express").Router();
const { check } = require("express-validator");

const {
  obtenerMateria,
  crearMateria,
  buscarNota,
} = require("../controllers/materia.controllers");

router.get("/buscar/:id", obtenerMateria).post("/", crearMateria);

router.get("/nota/:id/:idUsuario", buscarNota);

module.exports = router;
