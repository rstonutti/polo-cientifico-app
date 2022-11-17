const { request, response } = require("express");
const { Materia } = require("../models");

ctrlMateria = {};

ctrlMateria.obtenerMateria = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const materia = await Materia.findById(id);
    if (!materia.estado) {
      return res.status(400).json({
        ok: false,
        msg: `La materia ${materia.nombre} no existe`,
      });
    }
    res.status(200).json({
      ok: true,
      materia,
    });
  } catch (error) {
    console.log("Error al mostrar los datos de la materia: ", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

ctrlMateria.crearMateria = async (req = request, res = response) => {
  const body = req.body;
  try {
    const nuevaMateria = new Materia(body);
    const materia = await nuevaMateria.save();

    res.status(201).json({
      ok: true,
      msg: "La materia fue creada con éxito",
      materia,
    });
  } catch (error) {
    console.log("Error al registrar la materia", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

ctrlMateria.borrarMateria = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    //Verifico que la carrera esté activa
    const inactive = await Materia.findById(id);
    if (!inactive.status) {
      return res.status(400).json({
        msg: `La materia con ${id} no existe`,
      });
    }
    const materia = await Materia.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
      msg: "Materia borrada de la base de datos exitosamente",
      materia,
    });
  } catch (err) {
    console.log("Error al borrar los datos de la materia: ", err);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

ctrlMateria.buscarNota = async (req = request, res = response) => {
  const { id, idUsuario } = req.params;

  console.log(id, idUsuario);

  try {
    const nota = await Materia.find(
      {
        "_id": id,
        "alumnos.idUsuario": idUsuario
      },
      {
        _id: false,
        "alumnos.$": true /* {
          $elemMatch: {
            idUsuario: idUsuario,
          }
        } */
      },
    );

    /* const nota = await Materia.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $unwind: "$alumnos",
      },
      {
        $project: {
          _id: 0,
          "alumnos.idUsuario": 1,
          "alumnos.calificacion": 1,
        },
      },
      {
        $match: {
          "alumnos.idUsuario": {
            $eq: new mongoose.Types.ObjectId(idUsuario),
          },
        },
      },
    ]); */

    res.status(200).json({
      nota,
    });
  } catch (err) {
    console.log("Error al obtener los datos de la materia: ", err);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

module.exports = ctrlMateria;
