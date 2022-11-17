const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComentarioSchema = new Schema(
  {
    autor: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    descripcion: {
      type: String,
      required: true,
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

const PublicacioneSchema = new Schema(
  {
    autor: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    descripcion: {
      type: String,
      required: true,
    },
    comentario: [ComentarioSchema],
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

PublicacioneSchema.methods.toJSON = function () {
  const { __v, _id, ...publicacion } = this.toObject();
  publicacion.uid = _id;
  return publicacion;
};

module.exports = Post = mongoose.model("Publicacione", PublicacioneSchema);
