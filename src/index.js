import "./assets/js/main"
import "./assets/scss/style.scss"

const aa = {
  a: 1,
  b: 2,
}
const cc = {
  ...aa, c: 1,
}

console.log(cc)
