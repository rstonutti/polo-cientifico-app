const { request, response } = require("express");
const { default: mongoose } = require("mongoose");
const { Publicacion } = require("../models");

ctrlPublicaciones = {};

ctrlPublicaciones.crearComentario = async (req, res = response) => {
  const { _id } = req.usuario;
  const { uid, descripcion } = req.body;
  try {
    const publicacion = await Publicacion.findById(uid);

    const data = {
      autor: new mongoose.Types.ObjectId(_id),
      descripcion,
    };

    publicacion.comentario.push(data);

    await publicacion.save();

    const newComment = await Publicacion.findById(publicacion._id)
      .populate("autor")
      .populate("comentario.autor", "nombre");

    res.status(201).json({
      ok: true,
      msg: "La publicacion fue creada con éxito",
      newComment,
    });
  } catch (error) {
    console.log("Error al registrar la publicacion", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

ctrlPublicaciones.borrarComentario = async (req = request, res = response) => {
  const { _id } = req.body;

  try {
    //Verifico que la carrera esté activa
    const comentario = await Publicacion.updateOne(
      {
        "comentario._id": _id,
      },
      {
        $pull: { comentario: { _id } },
      }
    );

    /*  if (!inactive.estado) {
      return res.status(400).json({
        msg: `La publicacion con ${_id} no existe`,
      });
    }
    const publicacion = await Publicacion.findByIdAndDelete(_id); */
    res.status(200).json({
      msg: "Comentario borrado de la base de datos exitosamente",
      comentario,
    });
  } catch (err) {
    console.log("Error al borrar los datos del comentario: ", err);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

ctrlPublicaciones.obtenerPublicaciones = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  let query = {
    estado: true,
  };

  try {
    const [total, publicaciones] = await Promise.all([
      Publicacion.countDocuments(query),
      Publicacion.find(query)
        .populate("autor")
        .populate("comentario.autor", "nombre"),
      //.skip(Number(desde))
      //.limit(Number(limite)),
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
  const { _id } = req.usuario;
  const { descripcion } = req.body;

  const data = {
    autor: new mongoose.Types.ObjectId(_id),
    descripcion,
  };

  try {
    const nuevaPublicacion = new Publicacion(data);

    let publicacion = await nuevaPublicacion.save();

    publicacion = await publicacion.populate("autor");

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
  const { uid } = req.body;

  try {
    //Verifico que la carrera esté activa
    const inactive = await Publicacion.findById(uid);
    if (!inactive.estado) {
      return res.status(400).json({
        msg: `La publicacion con ${uid} no existe`,
      });
    }
    const publicacion = await Publicacion.findByIdAndDelete(uid);
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
