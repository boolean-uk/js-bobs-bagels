const { v4 } = require('uuid')
const UUIDv4 = v4

class Bagel {
  constructor(name, price) {
    this.uuid = UUIDv4()
    this.name = name
    this.price = price
  }
}

const validateBagel = (b) => {
  if (!(b instanceof Bagel)) {
    throw new Error(`${b} is not a bagel`)
  }
}

module.exports = { Bagel, validateBagel }
