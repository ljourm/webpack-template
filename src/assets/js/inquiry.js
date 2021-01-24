import $ from "jquery"
import "babel-polyfill"

const modeInput = "input"
const modeConfirm = "confirm"
const modeCompleted = "completed"

const fadeSpeed = 300

const inputNames = ["name", "subject", "body"]
let inputMessages = {}

const changeVisible = (jqueryObj, visible) => {
  if(visible) {
    jqueryObj.fadeIn(fadeSpeed)
  } else {
    jqueryObj.hide()
  }
}

const changeMode = (mode) => {
  changeVisible(
    $(".inquiry-form"),
    (mode === modeInput),
  )
  changeVisible(
    $(".inquiry-form-confirm"),
    (mode === modeConfirm || mode === modeCompleted),
  )
  changeVisible(
    $(".inquiry-confirm-buttons"),
    (mode === modeConfirm),
  )
  changeVisible(
    $(".inquiry-completed-buttons"),
    (mode === modeCompleted),
  )
  changeVisible(
    $(".inquiry-message > .completed"),
    (mode === modeCompleted),
  )

  $(".inquiry-message > .error").hide()
}

const submitClicked = () => {
  for (const name of inputNames) {
    inputMessages[name] = $(".inquiry-form [name=\"" + name + "\"]").val()
    $(".inquiry-form-confirm p." + name).text(inputMessages[name])
  }

  changeMode(modeConfirm)

  return false
}

const sendInquiry = async () => {
  // TODO
  await new Promise(resolve => setTimeout(resolve, 1000))

  return true
}

const sendClicked = async ()=> {
  const sendButton = $(".inquiry-confirm-buttons button.next")
  const backButton = $(".inquiry-confirm-buttons button.prev")

  sendButton.prop("disabled", true).addClass("is-loading")
  backButton.prop("disabled", true)

  const result = await sendInquiry()

  sendButton.prop("disabled", false).removeClass("is-loading")
  backButton.prop("disabled", false)

  if(result) {
    changeMode(modeCompleted)
  } else {
    $(".inquiry-message > .error").fadeIn(fadeSpeed)
  }
}

const clearFormClicked = () => {
  for (const name of inputNames) {
    $(".inquiry-form [name=\"" + name + "\"]").val("")
  }

  changeMode(modeInput)
}

$(window).on("load", () => {
  $("form.inquiry").on("submit", () => {
    return submitClicked()
  })

  $(".inquiry-confirm-buttons button.prev").on("click", () => {
    changeMode(modeInput)
  })

  $(".inquiry-confirm-buttons button.next").on("click", () => {
    sendClicked()
  })

  $(".inquiry-completed-buttons button.next").on("click", () => {
    clearFormClicked()
  })
})
