const getDB = require("../../database/db");

const getRecByVote = async (req, res) => {
  try {
    const connect = await getDB();

    const [result] = await connect.query(
      `
                SELECT r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto , IFNULL(AVG (v.voto),0) AS votos
                FROM recomendaciones r
                LEFT JOIN votos v ON r.id = v.recomendacion_id
                GROUP BY r.id
                ORDER BY votos DESC
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

module.exports = getRecByVote;
