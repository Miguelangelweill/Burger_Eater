//These are the on click event and the the routes that are hit when the button is clicked
$(function () {
  //This will change the devour state to true or false
  $(".change-hungry").on("click", function (event) {
    try {
      const id = $(this).data("id");
      const newBurger = $(this).data("newhungry");

      const newBurgerToDevoure = {
        hungry: newBurger,
      };

      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newBurgerToDevoure,
      }).then(function () {
        console.log("changed devoured to", newBurger);
        // Reload the page to get the updated list
        location.reload();
      });
    } catch (err) {
      console.log("There has been an error dovouring the burger: ", err);
    }
  });
  //This takes care of creating a new burger inside of the database 
  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    try {
      const newBurger = {
        name: $("#ca").val().trim(),
        hungry: $("[name=hungry]:checked").val().trim(),
      };

      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger,
      }).then(function () {
        console.log("created new Burger");
        // Reload the page to get the updated list
        location.reload();
      });
    } catch (err) {
      console.log("There has been an error creating the burger: ", err);
    }
  });
  //Here we delete the burger that was clicked on to be deleted from the database
  $(".delete-burger").on("click", function (event) {
    const id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(function () {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
  //Here we handle the update and the item that it will update
  $("#updateBurger").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // Get the ID by finding an element with a "name" attribute equal to the string "id"
    const id = $("[name=id]").val().trim();

    const updatedBurger = {
      name: $("#updateBurger [name=updateBurger]").val().trim(),
    };

    // Send the PUT request.
    $.ajax("/api/update/burgers/" + id, {
      type: "PUT",
      data: updatedBurger,
    }).then(function () {
      console.log("updated id ", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
