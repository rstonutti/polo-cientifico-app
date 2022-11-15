const cors = require("cors");
const { default: helmet } = require("helmet");
const express = require("express");
const morgan = require("morgan");

const { port } = require("./src/config");

const {
  authRoutes,
  carreraRoutes,
  materiaRoutes,
  publicacionRoutes,
  usuarioRoutes,
} = require("./src/routes");

require("./src/database/connection.js");

const app = express();

//Directorio público
app.use(express.static("public"));

//Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//Settings
app.set("port", port || 3000);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/carrera", carreraRoutes);
app.use("/api/materia", materiaRoutes);

app.listen(app.get("port"), () =>
  console.log(`Servidor corriendo en el puerto ${app.get("port")}`)
);
