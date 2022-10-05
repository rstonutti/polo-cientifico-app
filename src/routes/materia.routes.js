const router = require("express").Router();
const { check } = require("express-validator");

const {
  obtenerMateria,
  crearMateria,
} = require("../controllers/materia.controllers");

router.get("/buscar/:id", obtenerMateria);

router.post("/", crearMateria);

module.exports = router;