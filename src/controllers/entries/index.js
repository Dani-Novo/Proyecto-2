const postRecomendation = require("./postRec");
const getRecomendationById = require("./getRecById")
const getRecomendationByPlace=require("./getRecByPlace")
const getRecomendationByCategory=require("./getRecByCategory")
const voteRec = require("./voteRec")

module.exports = {
  postRecomendation,
  getRecomendationById,
  getRecomendationByPlace,
  getRecomendationByCategory,
  voteRec
};
