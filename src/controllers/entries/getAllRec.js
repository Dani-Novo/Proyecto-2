const getDB = require("../../database/db");

const getAllRec = async (req, res) => {
  try {
    const connect = await getDB();

    const [result] = await connect.query(
      `
                SELECT r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto, r.fecha_creacion
                FROM recomendaciones r
                
            `
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllRec;
