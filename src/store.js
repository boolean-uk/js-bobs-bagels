import { inventory } from "./inventory.js"
import { basketTypesDefault } from "./baskettypes.js"
import defaultSpecials from "./defaultSpecials.js"
import Employee from "./employee.js"
import Basket from "./basket.js"

class Store {
  constructor (name) {
    this.name = name
    this.isOpen = false
    this.specials = [...defaultSpecials]
    this.employees = []
    this.availableBasketTypes = [...basketTypesDefault]
    this.availableProducts = [...inventory]
  }

  open () {
    if (this.isOpen) return "We're already open!"
    this.isOpen = true
    return "Store is now open!"
  }

  close () {
    if (!this.isOpen) return "We're already closed!"
    this.isOpen = false
    return "Store is now closed!"
  }

  addEmployee (name, role) {
    const employee = new Employee(name, role)
    this.employees.push(employee)
  }

  addBasketType (basketObj) {
    this.availableBasketTypes.push(basketObj)
  }

  getProductBySKU (sku) {
    const foundProduct = this.availableProducts.find(product => product.sku === sku)
    if (!!foundProduct) {
      console.log(foundProduct)
      return foundProduct
    } else {
      console.log("unknown SKU", sku)
      return false
    }
  }

  getProductByDescription (name, variant) {
    const foundProduct = this.availableProducts.find(product => {
      return product.name.toLowerCase() === name.toLowerCase() &&
      product.variant.toLowerCase() === (variant || "").toLowerCase()
      })
    if (!!foundProduct) {
      console.log(`Here is a ${name} of variant ${variant}:`)
      console.log(foundProduct)
      return foundProduct
    } else {
      console.log(`We don't have a ${name} of variant ${variant}.`)
      return false
    }
  }

  handoutBasket (name) {
    if (this.availableBasketTypes.length === 0) return "no basket types"
    const foundBasketType = this.availableBasketTypes.find(basket => basket.name === name)
    if (!foundBasketType) return "type not found"
    const actualBasket = new Basket(foundBasketType.capacity)
    return actualBasket
  }
}

export default Store