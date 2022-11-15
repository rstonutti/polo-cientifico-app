const { Schema, model } = require("mongoose");

const PuntoSchema = Schema(
  {
    alumno: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  { timestamps: true }
);

PuntoSchema.methods.toJSON = function () {
  const { __v, estado, _id, ...data } = this.toObject();
  data.uid = _id;
  return data;
};

module.exports = model("Punto", PuntoSchema);
