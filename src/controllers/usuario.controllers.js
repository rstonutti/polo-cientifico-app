const bcryptjs = require("bcryptjs");
const { request, response } = require("express");

const { generarJWT } = require("../helpers/generarJWT");

const { Usuario } = require("../models");

const ctrlUsuario = {};

ctrlUsuario.obtenerUsuario = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    //Busco el usuario con dicho ID.
    const usuario = await Usuario.findById(id);
    //Verifico que el usuario este activo.
    if (!usuario.estado) {
      return res.status(400).json({
        ok: false,
        msg: `El usuario ${usuario.nombre} no existe`,
      });
    }
    res.status(200).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log("Error al mostrar los datos del usuario: ", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

ctrlUsuario.crearUsuario = async (req = request, res = response) => {
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

ctrlUsuario.editarUsuario = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, contrasenia, nombre, ...resto } = req.body;
  try {
    //Validar contra db
    if (contrasenia) {
      const salt = bcryptjs.genSaltSync();
      resto.contrasenia = bcryptjs.hashSync(contrasenia, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
    res.status(200).json({
      msg: "Datos del usuario actualizados exitosamente",
      usuario,
    });
  } catch (error) {
    console.log("Error al actualizar los datos del usuario: ", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

ctrlUsuario.borrarUsuario = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    //Verifico que el usuario este activo
    const inactivo = await Usuario.findById(id);
    if (!inactivo.estado) {
      return res.status(400).json({
        msg: `El usuario ${id} no existe`,
      });
    }
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
      msg: "Usuario borrado de la base de datos exitosamente",
      usuario,
    });
  } catch (error) {
    console.log("Error al borrar los datos del usuario: ", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

module.exports = ctrlUsuario;
