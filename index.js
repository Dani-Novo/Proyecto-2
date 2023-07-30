"use strict";

const server = require("./src/app");
const createDB = require("./src/database/index");
const PORT = process.env.PORT || 3001;

createDB;

server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
