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
      fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
      active BOOLEAN DEFAULT FALSE
    );
    `);

    await connection.query(`
    CREATE TABLE IF NOT EXISTS recomendaciones(
        id INT PRIMARY KEY AUTO_INCREMENT,
        titulo VARCHAR(255) NOT NULL,
        categoria VARCHAR (100) NOT NULL,
        lugar VARCHAR(100) NOT NULL,
        entradilla VARCHAR(255) NOT NULL,
        texto VARCHAR(500) NOT NULL,
        foto TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE CASCADE
    )
    `);

    await connection.query(`
    CREATE TABLE IF NOT EXISTS votos(
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        recomendacion_id INT NOT NULL,
        voto INT NOT NULL,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE CASCADE,
        FOREIGN KEY (recomendacion_id) REFERENCES recomendaciones (id) ON DELETE CASCADE
    );
    `);
    await connection.query(`
    CREATE TABLE IF NOT EXISTS comentarios (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        recomendacion_id INT NOT NULL,
        comentario VARCHAR(500) NOT NULL,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE CASCADE,
        FOREIGN KEY (recomendacion_id) REFERENCES recomendaciones (id) ON DELETE CASCADE
    )
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
