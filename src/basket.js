class Basket {
  constructor(capcity) {
    this.products = [
      {
        itemName: 'Plain Bagel',
        unitPrice: 5
      },
      {
        itemName: 'Everything Bagel',
        unitPrice: 10
      },
      {
        itemName: 'Sesame Bagel',
        unitPrice: 15
      }
    ]
    this.basketVolume = [3]
    this.basketContent = []
    this.itemQty = 1
    this.totalPrice = 0
  }

  getAllProductsInBasket() {
    return this.basketContent
  }

  checkItemExistInBasket(itemName) {
    const index = this.basketContent.findIndex(
      (item) => item.itemName === itemName
    )
    if (index !== -1) {
      return true
    } else {
      return false
    }
  }

  updateProduct(itemName, itemQty) {
    let product = this.basketContent.find((item) => {
      return item.itemName === itemName
    })

    product.itemQty = product.itemQty + itemQty

    return product
  }

  totalUnitsOfItemsInBasket() {
    let totalItemInBasket = 0
    for (let i = 0; i < this.basketContent.length; i++) {
      totalItemInBasket += this.basketContent[i].itemQty
    }
    return totalItemInBasket
  }

  addItemToBasket(itemName, itemQty = 1) {
    const itemExist = this.checkItemExistInBasket(itemName)

    if (itemExist) {
      return this.updateProduct(itemName, itemQty)
    }

    if (this.basketContent.length >= this.basketVolume[0]) {
      return 'Basket full. Get a bigger basket'
    } else {
      const product = { itemName, itemQty }
      this.basketContent.push(product)
      return this.basketContent
    }
  }

  removeItemFromBasket(itemName) {
    const index = this.basketContent.findIndex(
      (item) => item.itemName === itemName
    )
    if (index !== -1) {
      this.basketContent.splice(index, 1)
      return true
    } else {
      return 'You have not added this item'
    }
  }

  createNewBasket(newSize) {
    return this.basketVolume.push(newSize)
  }

  productList() {
    return this.products
  }

  // totalAmount() {
  //   this.basketContent.forEach((item) => {
  //     const product = this.products.find((p) => p.itemName === item.itemName)
  //     if (product) {
  //       this.totalPrice += product.unitPrice * item.itemQty
  //     }
  //   })
  //   return this.totalPrice
  // }

  totalAmount() {
    this.totalPrice = this.basketContent.reduce((total, item) => {
      const product = this.products.find((p) => p.itemName === item.itemName)
      if (product) {
        total += product.unitPrice * item.itemQty
      }
      return total
    }, 0)
    return this.totalPrice
  }
}

const newCustomer = new Basket(3)
newCustomer.addItemToBasket('Plain Bagel', 1)
newCustomer.addItemToBasket('Sesame Bagel', 2)
newCustomer.addItemToBasket('Everything Bagel', 1)

export default Basket
