import $ from "jquery"

$(window).on("load", function() {
  $("#loader").fadeOut(300, function() {
    $("#main").fadeIn(500, function() {
    })
  })
})
