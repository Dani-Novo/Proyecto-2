const getDB = require("../../database/db");

const postRecomendation = async (req, res) => {
  try {
    const connect = await getDB();

    const { title, category, place, intro, text, photo } = req.body;
    const { id } = req.userInfo;

    if (!title || !category || !place || !intro || !text || !photo)
      return res.status(400).send("Todos los campos son obligatorios");

    const [result] = await connect.query(
      `
            INSERT INTO recomendaciones (titulo, categoria, lugar, entradilla, texto, foto, user_id)
            VALUES (?,?,?,?,?,?,?)
        `,
      [title, category, place, intro, text, photo, id]
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Recomendación creada correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = postRecomendation;
