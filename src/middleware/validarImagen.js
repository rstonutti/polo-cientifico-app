const { request, response } = require("express")

const validarImagen = (req = request, res = response, next) => {

    console.log(req.body)
    console.log(req.files)

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
        return res.status(400).json({
            msg: 'No hay imagenes que subir - validarImagen'
        });
    };

    next();

};

module.exports = {
    validarImagen
};