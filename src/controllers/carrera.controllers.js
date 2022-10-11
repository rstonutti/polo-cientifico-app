const { request, response } = require("express");
const { Carrera, Materia } = require("../models");

ctrlCarrera = {};

ctrlCarrera.obtenerTodos = async (req = request, res = response) => {
  const query = { estado: true };

  try {
    const [total, carreras] = await Promise.all([
      Carrera.countDocuments(query),
      Carrera.find(),
    ]);

    res.status(200).json({
      ok: true,
      total,
      carreras,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

ctrlCarrera.obtenerCarrera = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const carrera = await Carrera.findById(id);
    if (!carrera.estado) {
      return res.status(400).json({
        ok: false,
        msg: `La carrera ${carrera.nombre} no existe`,
      });
    }
    res.status(200).json({
      ok: true,
      carrera,
    });
  } catch (error) {
    console.log("Error al mostrar los datos de la carrera: ", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

ctrlCarrera.crearCarrera = async (req = request, res = response) => {
  const { materias, ...resto } = req.body;

  let materiaId = [];

  materias.map(async (materia) => {

    const nuevaMateria = new Materia(materia);
    const materiaGuardada = await nuevaMateria.save();

    materiaId = [materiaGuardada._id, ...materiaId]

    console.log(materiaId)

  })




  res.status(201).json({
    body
  });

  /* try {
   const nuevaCarrera = new Carrera(body);
   //nuevaCarrera.createdAt = Date.now();
   const carrera = await nuevaCarrera.save();

   res.status(201).json({
     ok: true,
     msg: "La carrera fue creada con éxito",
     carrera,
   });
 } catch (error) {
   console.log("Error al registrar la carrera", error);
   res.status(500).json({
     ok: false,
     msg: "Por favor hable con el administrador",
   });
 }  */
};

ctrlCarrera.borrarCarrera = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    //Verifico que la carrera esté activa
    const inactive = await Carrera.findById(id);
    if (!inactive.status) {
      return res.status(400).json({
        msg: `La carrera con ${id} no existe`,
      });
    }
    const carrera = await Carrera.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
      msg: "Carrera borrada de la base de datos exitosamente",
      carrera,
    });
  } catch (err) {
    console.log("Error al borrar los datos de la carrera: ", err);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

module.exports = ctrlCarrera;
