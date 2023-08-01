const express = require("express");

const router = express.Router();

const userLogged = require("../middlewares/userLogged");
const recExists = require("../middlewares/recExists");

const {
  postRecomendation,
  getRecomendationById,
  getRecomendationByPlace,
  getRecomendationByCategory,
  voteRec,
  getRecByVote,
  postComment,
} = require("../controllers/entries");

router.post("/recomendaciones", userLogged, postRecomendation);
router.post("/recomendaciones/:idRec/votos", userLogged, recExists, voteRec);
router.post(
  "/recomendaciones/:idRec/comentarios",
  userLogged,
  recExists,
  postComment
);
router.get("/recomendaciones/:idRec", recExists, getRecomendationById);
router.get("/recomendaciones/lugar/:place", getRecomendationByPlace);
router.get("/votos", getRecByVote);
router.get("/recomendaciones/categoria/:category", getRecomendationByCategory);
module.exports = router;
