// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-hungry").on("click", function(event) {
    try{
          var id = $(this).data("id");
    var newBurger = $(this).data("newhungry");

    var newBurgerToDevoure = {
      hungry: newBurger
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newBurgerToDevoure
    }).then(
      function() {
        console.log("changed devoured to", newBurger);
        // Reload the page to get the updated list
        location.reload();
      }
    );
    }catch(err){
      console.log("There has been an error dovouring the burger: ",err)
    }

  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    try{

    var newBurger = {
      name: $("#ca").val().trim(),
      hungry: $("[name=hungry]:checked").val().trim()
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
    }catch(err){
         console.log("There has been an error creating the burger: ", err);
    }

  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#updateBurger").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // Get the ID by finding an element with a "name" attribute equal to the string "id"
    var id = $("[name=id]").val().trim();

    var updatedBurger = {
      name: $("#updateBurger [name=id]").val().trim()
    };

    // Send the PUT request.
    $.ajax("/api/update/burgers/" + id, {
      type: "PUT",
      data: updatedBurger
    }).then(
      function () {
        console.log("updated id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

});

