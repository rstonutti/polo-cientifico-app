const jwt = require("jsonwebtoken");

const { secret_key } = require("../config");

const generarJWT = (uid = "") => {
  //Si utiliza el new Promise para que trabaje en base a promesas
  return new Promise((resolve, reject) => {
    const payload = { uid };

    //Generamos el JWT
    jwt.sign(
      payload,
      secret_key,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se puedo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
