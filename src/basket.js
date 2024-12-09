class Bagel {
  constructor(id, name, quantity) {
    this.id = id
    this.name = name
    this.quantity = quantity
  }
}

class Menu {
  fullMenu() {
    return [
      { bagel: 'plain', price: 3.99 },
      { bagel: 'poppyseed', price: 5.99 },
      { bagel: 'salmon', price: 6.99 }
    ]
  }
}

class BobsBagels {
  constructor() {
    this.basket = []
    this.id = 1
    this.quantity = 1
  }

  addToBasket(name) {
    const basket = this.basket
    const bagel = new Bagel(this.id, name, this.quantity)
    this.id++
    this.quantity++

    basket.push(bagel)

    if (basket.length > 6) {
      throw 'basket is at full capacity'
    }
    return basket
  }

  remove(order) {
    const removed = this.basket.find((bagel) => bagel.name === order)

    if(!removed) {
      throw "this item doesn't exist"
    }
    this.basket = this.basket.filter((bagel) => bagel.name !== order)

    return removed
  }

  createManagerXlBasket(bagel) {
    this.xlBasket = []
    this.xlBasket.push(bagel)

    return this.xlBasket
  }

  checkPrice(order) {
    const menu = new Menu()
    const fullMenu = menu.fullMenu()

    const item = fullMenu.find((i) => {
      if (i.bagel === order) return i
    })
    return item
  }

  // multiBuys(order) {
  //       const found = this.basket.find(i => i.name === order.name)

  //       found.quantity++
  //   return found
  // }

  basketTotal() {
    const menu = new Menu()
    const fullMenu = menu.fullMenu()
    let total = 0

    for(let i = 0; i < this.basket.length; i++) {
      for(let j = 0; j < fullMenu.length; j++) {
        if(this.basket[i].name === fullMenu[j].bagel) {
          return total += fullMenu[j].price * this.basket.quantity
        }
      }
    }
    return `£${total}`
  }
}

const order = new BobsBagels()
order.addToBasket('poppyseed')

const order1 = new BobsBagels()
order1.addToBasket('plain')



export { Bagel }

export default BobsBagels
