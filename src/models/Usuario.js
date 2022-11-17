const { model, Schema } = require("mongoose");

const UsuarioSchema = new Schema(
  {
    alias: {
      type: String,
      unique: [true, "El alias está en uso"],
      required: [true, "El alias es necesario"],
    },
    nombre: {
      type: String,
    },
    apellido: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "La contraseña es necesaria"],
    },
    correo: {
      type: String,
      //unique: [true, "El correo está en uso"],
      //required: [true, "El correo es necesario"],
    },
    avatar: {
      type: String,
    },
    rol: {
      type: String,
      enum: ["admin", "teacher", "student", "user"],
      default: "user",
      required: true,
    },
    carrera: {
      idCarrera: {
        type: Schema.Types.ObjectId,
        ref: "Carrera",
      },
    },
    inasistencias: {
      type: Date,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

UsuarioSchema.methods.toJSON = function () {
  const { __v, _id, contrasenia, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
