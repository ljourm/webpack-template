import $ from "jquery"

$(window).on("scroll", () => {
  const scrollTop = $(window).scrollTop()
  const fixedNavbar = $(".navbar.is-fixed-top")

  if (scrollTop > 74) {
    fixedNavbar.addClass("is-active")
  } else {
    fixedNavbar.removeClass("is-active")
  }
})

$(".navbar-burger").on("click", () => {
  $(".navbar-menu").toggleClass("is-active")
})
