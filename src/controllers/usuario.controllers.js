const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const { Usuario } = require("../models");

const ctrlUsuario = {};

ctrlUsuario.obtenerTodos = async (req = request, res = response) => {
  const { desde = 0, hasta = 5 } = req.query;
  const query = { estado: true };

  try {
    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find().skip(Number(desde)).limit(Number(hasta)),
    ]);

    res.status(200).json({
      ok: true,
      total,
      usuarios,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

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

ctrlUsuario.editarUsuario = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, contrasenia, correo, ...resto } = req.body;
  try {
    //Validar contra db
    if (contrasenia) {
      const salt = bcryptjs.genSaltSync();
      resto.contrasenia = bcryptjs.hashSync(contrasenia, salt);
    }
    const usuario = await Usuario.findOneAndUpdate(id, resto, { new: true });
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
