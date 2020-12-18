import "./assets/js/index"
import "./assets/scss/style.scss"

const aa = {
  a: 1,
  b: 2,
}
const cc = {
  ...aa, c: 1,
}

console.log(cc)
