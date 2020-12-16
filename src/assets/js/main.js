export const func = () => {
  const obj = { a: 1, b: 2 }
  const spreadObj = { ...obj, c: 3}

  console.log(spreadObj)
}
