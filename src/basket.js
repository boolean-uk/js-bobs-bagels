import allBagels from '../inventory.json' assert { type: 'json' }

class Bagel {
  constructor(sku, qty = 1) {
    this.sku = sku
    this.qty = qty
    this.loadBagels()
  }

  loadBagels() {
    const bagelData = allBagels.inventory.find(
      (bagel) => bagel.sku === this.sku
    )
    if (bagelData) {
      this.price = parseFloat(bagelData.price)
      this.name = bagelData.name
      this.variant = bagelData.variant
    } else {
      console.log(`Bagel with SKU ${this.sku} not found.`)
      throw new Error(`Bagel with SKU ${this.sku} not found.`)
    }
  }

  showPrice(sku) {
    const bagelToCheck = allBagels.inventory.find((bgl) => bgl.sku === this.sku)
    if (bagelToCheck) {
      console.log(this.price)
      return this.price
    } else {
      const errorMessage = `Bagel with SKU ${sku} not found.`
      console.log(errorMessage)
      throw new Error(errorMessage)
    }
  }
}

class Basket {
  constructor(basketSize = 5) {
    this.basketSize = basketSize
    this.bagelsIn = 0
    this.basket = []
  }

  addBagels(sku, qty) {
    for (let i = 0; i < qty; i++) {
      const bagel = new Bagel(sku, 1)
      this.bagelsIn += 1
      if (this.bagelsIn > this.basketSize) {
        const errorMessage = `Basket is full`
        console.log(errorMessage)
        throw new Error(errorMessage)
      }
      if (bagel) {
        this.basket.push(bagel)
      } else {
        const errorMessage = `There is no bagel with sku ${sku} `
        console.log(errorMessage)
        throw new Error(errorMessage)
      }
    }
    return this.basket
  }

  removeBagels(sku) {
    const bagelToRemove = this.basket.findIndex((bg) => bg.sku === sku)
    if (bagelToRemove !== -1) {
      this.basket.splice(bagelToRemove, 1)
      return this.basket
    } else {
      const errorMessage = `There is no bagel of this type in the basket`
      console.log(errorMessage)
      throw new Error(errorMessage)
    }
  }

  showCost() {
    let total = 0
    for (let i = 0; i < this.basket.length; i++) {
      total += this.basket[i].price
    }
    console.log(Number(total.toFixed(2)))
    return Number(total.toFixed(2))
  }
  
  printReceipt() {
    const formattedDate = new Date()
      .toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      .replace(/\//g, '-')
    process.stdout.write(`\n~~~ Bob's Bagels ~~~\n\n`)
    process.stdout.write(`${formattedDate}\n`)
    process.stdout.write(`-------------------------------------- \n\n`)

    let receipt = {}

    for (let i = 0; i < this.basket.length; i++) {
      let bgl = this.basket[i]
      if (!receipt[bgl.sku]) {
        receipt[bgl.sku] = {
          sku: bgl.sku,
          name: bgl.name,
          variant: bgl.variant,
          qty: 0,
          price: bgl.price
        }
      }
      receipt[bgl.sku].qty += bgl.qty
    }
    for (let sku in receipt) {
      let bgl = receipt[sku]
      process.stdout.write(
        `${bgl.variant} ${bgl.name} qty: ${bgl.qty} x ${bgl.price} \n\n`
      )
    }
    process.stdout.write(`-------------------------------------- \n`)
    process.stdout.write(`Total: ${this.showCost()}` + '\n')
    process.stdout.write('Thank you for your order! \n\n')
  }
}


export { Bagel }
export default Basket

const nb = new Basket(10)
nb.addBagels('BGLO',3)
nb.addBagels('BGLP',2)
nb.addBagels('BGLS', 4)
nb.addBagels('BGLO',1)
nb.printReceipt()
