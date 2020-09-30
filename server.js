//Getting our dependencies
const express = require("express");
//The port that will be used if there is not one already in the enviorment
const PORT = process.env.PORT || 8081;
//Creating an instance of express
const server = express();
//this is used to serve my static files.
server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
// Here we are getting the dependecies for handlebars
const exphbs = require("express-handlebars");

server.engine("handlebars", exphbs({ defaultLayout: "main" }));
server.set("view engine", "handlebars");

const routes = require("./controllers/burgerController.js");

server.use(routes);

server.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
