const getDB = require("../database/db");
const jwt = require("jsonwebtoken");

const userLogged = async (req, res, next) => {
  try {
    const connect = await getDB();
    const authorization = req.headers["authorization"];

    if (!authorization)
      return res.status(401).send("Falta la cabecera autorización");

    let tokenInfo;
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET_TOKEN);
    } catch (error) {
      return res.status(401).send("Token no válido");
    }

    req.userInfo = tokenInfo;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = userLogged;
