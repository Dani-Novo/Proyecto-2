const express = require("express");

const router = express.Router();

const { createUser, loginUser } = require("../controllers/users");

router.post("/usuarios", createUser);
router.post("/usuarios/login", loginUser);

module.exports = router;
