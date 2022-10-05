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
        //nuevaMateria.createdAt = Date.now();
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
            carrera,
        });
    } catch (err) {
        console.log("Error al borrar los datos de la materia: ", err);
        res.status(500).json({
            ok: false,
            msg: "Por favor, hable con el administrador",
        });
    }
};

module.exports = ctrlMateria;