const express = require("express");

const router = express.Router();

const userLogged = require("../middlewares/userLogged");

const { postRecomendation } = require("../controllers/entries");

router.post("/recomendaciones", userLogged, postRecomendation);

module.exports = router;
