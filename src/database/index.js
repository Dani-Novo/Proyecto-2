"use strict";

const getDB = require("./db");

async function createDB() {
  let connection;
  try {
    connection = await getDB();

    await connection.query("CREATE DATABASE IF NOT EXISTS ViajesRecomendados");

    await connection.query("USE ViajesRecomendados");

    console.log("Base de datos creada");

    //await connection.query(
    //"DROP TABLE IF EXISTS  votos, recomendaciones, usuarios"
    //);

    await connection.query(`
    CREATE TABLE IF NOT EXISTS usuarios(
      id INT PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(100) NOT NULL UNIQUE,
      nombre VARCHAR(255),
      registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      active BOOLEAN DEFAULT FALSE
    );
    `);

    await connection.query(`
    CREATE TABLE IF NOT EXISTS recomendaciones(
        id INT PRIMARY KEY AUTO_INCREMENT,
        titulo TEXT NOT NULL,
        categoria TEXT NOT NULL,
        lugar TEXT NOT NULL,
        entradilla TEXT NOT NULL,
        texto TEXT NOT NULL,
        foto TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE CASCADE)
    `);

    await connection.query(`
    CREATE TABLE IF NOT EXISTS votos(
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        recomendacion_id INT NOT NULL,
        voto INT NOT NULL,
        creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE CASCADE,
        FOREIGN KEY (recomendacion_id) REFERENCES recomendaciones (id) ON DELETE CASCADE
    );
    `);
  } catch (e) {
    console.log("Hubo un error:", e.message);
  } finally {
    if (connection) {
      connection.release();

      process.exit();
    }
  }
}

module.exports = createDB();
