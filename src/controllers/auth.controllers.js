const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const { generarJWT } = require("../helpers/generarJWT");
const { Usuario } = require("../models");

const ctrlAuth = {};

ctrlAuth.registrar = async (req = request, res = response) => {
  const { contrasenia, ...resto } = req.body;
  try {
    const usuario = new Usuario(resto);
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.contrasenia = bcryptjs.hashSync(contrasenia, salt);
    //Guardar usuario en db
    const usuarioCreado = await usuario.save();

    const token = await generarJWT(usuarioCreado.id);

    res.status(201).json({
      ok: true,
      msg: "Usuario agregado exitosamente",
      token,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

//Controlador para logearse
ctrlAuth.login = async (req = request, res = response) => {
  const { alias, contrasenia } = req.body;

  try {
    const usuario = await Usuario.findOne({ alias });

    //Existe el usuario
    if (!usuario) {
      return res.status(400).json({
        msg: "El usuario o contraseña inválido - Usuario no existe",
      });
    }

    //El usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "El usuario o contraseña inválido - Usuario inactivo",
      });
    }

    //Verificar contraseña
    const contraseñaValida = bcryptjs.compareSync(
      contrasenia,
      usuario.contrasenia
    );
    if (!contraseñaValida) {
      return res.status(400).json({
        msg: "El usuario o contraseña inválido - Contraseña inválida",
      });
    }

    //Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      msg: "Inicio de sesión exitoso",
      usuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al iniciar sesión",
    });
  }
};

ctrlAuth.revalidarToken = async (req = request, res = response) => {
  const { _id } = req.usuario;

  const usuario = await Usuario.findById(_id);

  const token = await generarJWT(_id);

  res.json({
    ok: true,
    msg: "Token revalidado",
    usuario,
    token,
  });
};

module.exports = ctrlAuth;
