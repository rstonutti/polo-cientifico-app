const { request, response } = require("express");
const { Publicacion } = require("../models");

ctrlPublicaciones = {};

ctrlPublicaciones.obtenerPublicaciones = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  let query = {
    estado: true,
  };

  try {
    const [total, publicaciones] = await Promise.all([
      Publicacion.countDocuments(query),
      Publicacion.find(query)
        .populate("autor", "nombre")
        .populate("comentario.autor", "nombre")
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    res.json({
      total,
      publicaciones,
    });
  } catch (err) {
    console.log("Error al mostrar las publicaciones: ", err);
    res.status(500).json({
      msg: "Por favor, hable con el administrador",
    });
  }
};

ctrlPublicaciones.obtenerPublicacion = async (
  req = request,
  res = response
) => {
  const { id } = req.params;
  try {
    const publicacion = await Publicacion.findById(id);
    if (!publicacion.estado) {
      return res.status(400).json({
        ok: false,
        msg: `La publicacion ${publicacion.nombre} no existe`,
      });
    }
    res.status(200).json({
      ok: true,
      publicacion,
    });
  } catch (error) {
    console.log("Error al mostrar los datos de la publicacion: ", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

ctrlPublicaciones.crearPublicacion = async (req = request, res = response) => {
  const body = req.body;
  try {
    const nuevaPublicacion = new Publicacion(body);
    const publicacion = await nuevaPublicacion.save();

    res.status(201).json({
      ok: true,
      msg: "La publicacion fue creada con éxito",
      publicacion,
    });
  } catch (error) {
    console.log("Error al registrar la publicacion", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

ctrlPublicaciones.borrarPublicacion = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    //Verifico que la carrera esté activa
    const inactive = await Publicacion.findById(id);
    if (!inactive.status) {
      return res.status(400).json({
        msg: `La publicacion con ${id} no existe`,
      });
    }
    const publicacion = await Publicacion.findByIdAndUpdate(id, {
      estado: false,
    });
    res.status(200).json({
      msg: "Publicacion borrada de la base de datos exitosamente",
      publicacion,
    });
  } catch (err) {
    console.log("Error al borrar los datos de la publicacion: ", err);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

module.exports = ctrlPublicaciones;
