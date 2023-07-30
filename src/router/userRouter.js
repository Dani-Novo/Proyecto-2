// "use strict";

const express = require("express");

const router = express.Router();

const { createUser } = require("../controllers/users");

router.post("/usuarios", createUser);

module.exports = router;
