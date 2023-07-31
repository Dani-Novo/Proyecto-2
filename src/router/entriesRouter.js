const express = require("express");

const router = express.Router();

const userLogged = require("../middlewares/userLogged");
const recExists = require("../middlewares/recExists")


const { 
    postRecomendation,
    getRecomendationById,
    getRecomendationByPlace,
    getRecomendationByCategory,
    voteRec
 } = require("../controllers/entries");


router.post("/recomendaciones", userLogged, postRecomendation);
router.get("/recomendaciones/:idRec",recExists, getRecomendationById)
router.get("/recomendaciones/lugar/:place",getRecomendationByPlace)
router.get("/recomendaciones/categoria/:category",getRecomendationByCategory)
router.post("/recomendaciones/:idRec/votos",userLogged,recExists,voteRec)
module.exports = router;
