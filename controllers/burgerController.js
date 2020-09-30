//Requiring my dependencies.
const express = require("express");
//creating and instance of express.
const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

//This is my home route where the user will land by default
router.get("/", function(req, res) {
  //Here we are using the ORM function of "all" to get all of the burgers from the database.
  burger.all(function(data) {
    const hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
//This is the route to create burgers and columns inside of the api
router.post("/api/burgers", function(req, res) {
  //Here we are using the ORM function of "create" to create a new column inside of our database which is equals to a new burger.
  burger.create([
    "name", "hungry"
  ], [
    req.body.name, req.body.hungry
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});
//This is the route that is hit whenever we want to update the name of the brguer
router.put("/api/update/burgers/:id", function(req, res) {
  //The condition is the id that is passed to the url
  const condition = "id = " + req.params.id;
  console.log("Id of burger that we just edited", condition);
  //Here we are using the ORM function of "update" to update the column inside of the database. Update the burger name.
  burger.update(
    {
      name: req.body.name,
    },
    condition,
    function (result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});
//This is the route that is hit whenever we want to update if we have eaten the burger or not
router.put("/api/burgers/:id", function (req, res) {
  const condition = "id = " + req.params.id;
  console.log("condition", condition);
   //Here we are using the ORM function of "update" to change if the burger has been eaten or not.
  burger.update(
    {
      hungry: req.body.hungry,
    },
    condition,
    function (result) {
      //Here we are checking if anything was actually updated inside of the database.
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});
//This is the route that is hit whenever we want to delete a burger from our list
router.delete("/api/burgers/:id", function(req, res) {
  const condition = "id = " + req.params.id;
    //Here we are using the ORM function of "delete" to delete the nurger from our database.
  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
//In case none of the routes hit fall back on this one.
router.get("*", function (req, res) {
  burger.all(function (data) {
    const hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
// Export routes for server.js to use.
module.exports = router;
