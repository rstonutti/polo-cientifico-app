# Modelado de datos

## Carreras
```js
CarreraSchema = {
  nombre: {
    type: String,
    required: [true, "El nombre de la carrera es necesario"],
  },
  materias: [
    {
      idMateria: {
        type: Schema.Types.ObjectId,
        ref: "Materia",
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
```
## Materias
```js
MateriaSchema = {
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
        required: [true, "El cargo del profesor es necesario"],
      },
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
```
## Usuarios
```js
UsuarioSchema = {
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
  dni: {
    type: String,
    unique: [true, "El DNI está en uso"],
    required: [true, "El apellido es necesario"],
  },
  contrasenia: {
    type: String,
    required: [true, "La contraseña es necesaria"],
  },
  correo: {
    type: String,
    unique: [true, "El correo está en uso"],
    required: [true, "El correo es necesario"],
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
```
## Publicaciones
```js
PublicacioneSchema = {
  autor: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  lugar: {
    type: String,
  },
  tipo: {
    type: String,
  },
  descripcion: {
    type: String,
    required: true,
  },
  likes: [
    {
      idUsuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
      },
    },
  ],
  comentario: [ComentarioSchema],
  date: {
    type: Date,
    default: Date.now(),
  },
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
}
```
## Comentarios
```js
ComentarioSchema = {
  autor: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  descripcion: {
    type: String,
    required: true,
  },
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
}
```