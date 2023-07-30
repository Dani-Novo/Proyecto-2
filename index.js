"use strict";

const server = require("./src/app");

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
