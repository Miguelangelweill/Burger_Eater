// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");
//Here i am passing all of the values to the orm that need to be passed depending on the action that the user takes on our burger.
var burgerOrmObject = {
  //Here we state we want all of the burgers from the :"" table
  all: function (cb) {
    orm.all("BURGERS", function (res) {
      cb(res);
    });
  },
  // Here we state that we want to create a column inside of the "BURGERS" table
  create: function (cols, vals, cb) {
    orm.create("BURGERS", cols, vals, function (res) {
      cb(res);
    });
  },
    // Update a column inside of the BURGERS table. This one in specific will tell us if the burger hass been 'devoured' or not.
  update: function (objColVals, condition, cb) {
    orm.update("BURGERS", objColVals, condition, function (res) {
      cb(res);
    });
  },
  // Update a column inside of the "BURGERS" table. This one is to change the name of the burger that we have selected.
  updateBurger: function ( name,condition , cb) {
    orm.updateBurger("BURGERS",name , condition, function (res) {
      cb(res);
    });
  },
  //Here we are using the ORM function to delete the a column from the "BURGERS" table
  delete: function (condition, cb) {
    orm.delete("BURGERS", condition, function (res) {
      cb(res);
    });
  },
};

// Export the database functions for the controller (catsController.js).
module.exports = burgerOrmObject;
