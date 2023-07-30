"use strict";

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const createDB = require("./database/index");

const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
