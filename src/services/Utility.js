const getType = obj => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
const isObj = obj => getType(obj) == 'object'
const isArr = obj => getType(obj) == 'array'
const isNumOrStr = obj => ['string', 'number'].includes(getType(obj))

export {
  getType,
  isObj, 
  isArr, 
  isNumOrStr
}
