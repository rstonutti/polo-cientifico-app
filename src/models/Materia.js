const { model, Schema } = require("mongoose");

const MateriaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la materia es necesario"],
    },
    profesores: [
      {
        idUsuario: {
          type: Schema.Types.ObjectId,
          ref: "Usuario",
        },
        cargo: {
          type: String,
        },
        _id: false,
      },
    ],
    alumnos: [{
      idUsuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
      },
      calificacion: [
        {
          descripcion: { type: String },
          nota: { type: Number },
        },
      ],
      _id: false,
    }],
    carrera: {
      idCarrera: {
        type: Schema.Types.ObjectId,
        ref: "Carrera",
      },
    },
    inasistencia: [
      {
        dia: {
          type: Date,
        },
        idUsuario: [
          {
            type: Schema.Types.ObjectId,
            ref: "Usuario",
          },
        ],
      },
    ],
    estado: {
      type: Boolean,
      default: true,
    },

  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

MateriaSchema.methods.toJSON = function () {
  const { __v, _id, ...materia } = this.toObject();
  materia.uid = _id;
  return materia;
};

module.exports = model("Materia", MateriaSchema);
