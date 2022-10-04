const router = require("express").Router();
const { check } = require("express-validator");

const {
  obtenerTodos,
  obtenerCarrera,
  crearCarrera,
} = require("../controllers/carrera.controllers");

router.get("/", obtenerTodos);

router.get("/buscar/:id", obtenerCarrera);

router.post("/", crearCarrera);

module.exports = router;
