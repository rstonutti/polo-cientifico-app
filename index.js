const cors = require("cors");
const { default: helmet } = require("helmet");
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

const { port } = require("./src/config");

require("./src/database/connection.js");

const app = express();

const paths = {
  auth: "/api/v1/auth",
  publicaciones: "/api/v1/publicaciones",
  usuarios: "/api/v1/usuarios",
};

//Directorio público
app.use(express.static("public"));

//Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

//Settings
app.set("port", port || 3000);

//Routes
app.use(paths.auth, require("./src/routes/auth.routes"));
app.use(paths.publicaciones, require("./src/routes/publicacion.routes"));
app.use(paths.usuarios, require("./src/routes/usuario.routes"));

app.listen(app.get("port"), () =>
  console.log(`Servidor corriendo en el puerto ${app.get("port")}`)
);
