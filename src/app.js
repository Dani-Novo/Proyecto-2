// "use strict";
const express = require("express");
const morgan = require("morgan");
const createDB = require("./database/index");

const userRouter = require("../src/router/userRouter");
const entriesRouter = require("../src/router/entriesRouter");

const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send("<h3>Estoy aquí</h3>");
});

server.use(userRouter);
server.use(entriesRouter);

server.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
module.exports = server;
