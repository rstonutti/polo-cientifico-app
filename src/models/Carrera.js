const { model, Schema } = require("mongoose");

const CarreraSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la carrera es necesario"],
    },
    administracion: [
      {
        _id: false,
        idUsuario: {
          type: Schema.Types.ObjectId,
          ref: "Usuario",
        },
        nombre: {
          type: String,
        },
        cargo: {
          type: String,
        },
      },
    ],
    materias: [
      {
        idMateria: {
          type: Schema.Types.ObjectId,
          ref: "Materia",
        },
        nombre: {
          type: String,
        },
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

CarreraSchema.methods.toJSON = function () {
  const { __v, _id, ...carrera } = this.toObject();
  carrera.uid = _id;
  return carrera;
};

module.exports = model("Carrera", CarreraSchema);
