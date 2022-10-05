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
      required: [true, "El nombre es necesario"],
    },
    apellido: {
      type: String,
      required: [true, "El apellido es necesario"],
    },
/*     dni: {
      type: String,
      //unique: [true, "El DNI está en uso"],
      //required: [true, "El apellido es necesario"],
    }, */
    contrasenia: {
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
      enum: ["admin_role", "teacher_role", "student_role", "user_role"],
      default: "user_role",
      required: true,
    },
    carrera: {
      idCarrera: {
        type: Schema.Types.ObjectId,
        ref: "Carrera",
      },
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
