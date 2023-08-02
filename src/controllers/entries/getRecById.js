const getDB = require("../../database/db");

const getRecomendationById = async (req, res) => {
  try {
    const { idRec } = req.params;

    const connect = await getDB();

    const [result] = await connect.query(
      `
            SELECT r.titulo, r.categoria, r.lugar, r.entradilla,r.texto,r.foto
            FROM recomendaciones r
            WHERE r.id=?`,
      [idRec]
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

module.exports = getRecomendationById;
