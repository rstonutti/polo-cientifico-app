const router = require("express").Router();
const { check } = require("express-validator");

const { login, revalidarToken } = require("../controllers/auth.controllers");

const { validarJWT } = require("../middlewares");

router.post("/login", login);

router.get("/renew", [validarJWT], revalidarToken);

module.exports = router;
