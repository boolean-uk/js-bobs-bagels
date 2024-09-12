const Basket = require("../src/basket.js")
const Item = require("../src/item.js")


describe("Basket", () => {
  it("adds an item to Basket", () => {
    // set up
    const basket = new Basket() // Creating basket which calls the constructor
    console.log("empty basket created", basket.items) // should print out empty array which is inside constructor
    const item = {
      name: "chocolateBagel",
      price: 3,

      name2: "jamBagel",
      price2: 2,

    }
    const expected = [{
      name: "chocolateBagel",
      price: 3,

      name2: "jamBagel",
      price2: 2,
    }]
    // execute
    const result = basket.add(item)
    // verify
    expect(result).toEqual(expected)
  })

  it("removes an item from Basket", () => {
    // set up
    const basket = new Basket() // Creating basket which calls the constructor
    console.log("Items inside Basket", basket.items) // should print out empty array which is inside constructor
    const item = {
      name: "chocolateBagel",
      price: 3,

      name2: "jamBagel",
      price2: 2,

    }
    const expected = [{
      name: "chocolateBagel",
      price: 3,

      name2: "jamBagel",
      price2: 2,
    }]
    // execute
    const result = basket.add(item)
    // verify
    expect(result).toEqual(expected)
  })

  it("Cannot remove non existant item from Basket", () => {
    // set up
    const basket = new Basket() // Creating basket which calls the constructor
    const item = new Item("chocolateBagel")
    const item2 = new Item("jamBagel")

    basket.add(item)
    basket.add(item2)
    const result = basket.remove("icedBagel")
    // verify
    expect(result).toEqual("cannot remove from Basket")

  })

  it("Check if Basket is full", () => {
    // set up
    const basket = new Basket() // Creating basket which calls the constructor
    console.log("Items inside Basket", basket.items) // should print out empty array which is inside constructor
    const item = new Item("chocolateBagel")
    const item2 = new Item("jamBagel")

    basket.add(item)
    basket.add(item2)
    const result = basket.isFull()
    // verify
    expect(result).toEqual(true)
  })

  it("Create increased Basket capacity", () => {
    // set up
    const basket = new Basket() // Creating basket which calls the constructor
    console.log("Items inside Basket", basket.items) // should print out empty array which is inside constructor
    const item = new Item("chocolateBagel")
    const item2 = new Item("jamBagel")

    basket.add(item)
    basket.add(item2)
    const result = basket.isFull()
    // verify
    expect(result).toEqual(true)

    const newMaxCapacity = basket.setMaxCapacity(5)
    expect(newMaxCapacity).toEqual(5)
  })

  it("Check price of known item", () => {
    // set up
    const basket = new Basket()
    const itemName = 'chocolateBagel'
    const expectedPrice = 3

    // execute
    const itemPrice = basket.checkPrice(itemName)

    // verify
    expect(itemPrice).toEqual(expectedPrice)
  })

  it("quantity of items wanted when adding to Basket", () => {
    // set up
    const basket = new Basket()
    const itemName = 'chocolateBagel'
    const quantity = 3

    // execute
    const amountOfItem = basket.amountOfItem(itemName)

    // verify
    expect(amountOfItem).toEqual(quantity)
  })
})


  // xit("Cannot set capacity of Basket to zero")
  // xit("Cannot set capacity of Basket to < No of current items")



