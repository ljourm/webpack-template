import $ from "jquery"

const navHeight = 74
const classActive = "is-active"
const classFixed = "is-fixed"

$(window).on("scroll", () => {
  if($("body").hasClass(classFixed)) {
    return
  }

  const scrollTop = $(window).scrollTop()
  const fixedNavbar = $(".navbar.is-fixed-top")

  if (scrollTop > navHeight) {
    fixedNavbar.addClass(classActive)
  } else {
    fixedNavbar.removeClass(classActive)
  }
})

$(".navbar-burger").on("click", function() {
  const navButton = $(this)
  navButton.toggleClass(classActive)

  const navMenu = $(this).closest("nav").find(".navbar-menu")
  navMenu.toggleClass(classActive)

  if (navMenu.hasClass(classActive)) {
    const scrollTop = $(window).scrollTop()
    $("body").addClass(classFixed).css({"top": -scrollTop})
  } else {
    const positionTopWithPx = $("body").css("top")
    const scrollTop = positionTopWithPx.match(/\d+/)[0]
    $("body").removeClass(classFixed)
    $(window).scrollTop(scrollTop)
  }
})
