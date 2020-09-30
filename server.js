const express = require("express");

const PORT = process.env.PORT || 8081;

const server = express();

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const exphbs = require("express-handlebars");

server.engine("handlebars", exphbs({ defaultLayout: "main" }));
server.set("view engine", "handlebars");

const routes = require("./controllers/burgerController.js");

server.use(routes);

server.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
