const getDB = require("../../database/db");

const getRecomendationByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const connect = await getDB();

    const [result] = await connect.query(
      `
            SELECT r.titulo, r.categoria, r.lugar, r.entradilla,r.texto,r.foto
            FROM recomendaciones r
            WHERE r.categoria=?`,
      [category]
    );

    if (result.length === 0)
      return res
        .status(404)
        .send("No existe ninguna recomendación para esa categoría");
    connect.release();
    res.status(200).send({
      status: "OK",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getRecomendationByCategory;
