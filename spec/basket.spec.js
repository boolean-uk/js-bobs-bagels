//import the js sheet
const Basket = require("../src/basket")
const Item = require("../src/item")

describe("basket", () => {
  it("adds a bagel to a basket", () => {
    // set up
    const basket = new Basket ()
    const itemOne = new Item(1, "bagel")
    const itemTwo = new Item(2, "bagel")
    const expected = [itemOne, itemTwo]

    // execute
    basket.addItemToBasket(itemOne)
    const result = basket.addItemToBasket(itemTwo)

    // verify
    expect(result).toEqual(expected)
  })
})

describe("basket", () => {
  it("removes a bagel to a basket", () => {
    // set up
    const basket = new Basket ()
    const itemOne = new Item(1, "bagel")
    const itemTwo = new Item(2, "bagel")
    const expected = [itemOne]

    // execute
    basket.addItemToBasket(itemOne)
    basket.addItemToBasket(itemTwo)
    const result = basket.removeItemFromBasket (2)

    // verify
    expect(result).toEqual(expected)
  })
})

describe("basket", () => {
  it("at max capacity?", () => {
    // set up
    const basket = new Basket ()
    const itemOne = new Item(1, "bagel")
    const itemTwo = new Item(2, "bagel")
    
    const expected = true

    // execute
    basket.addItemToBasket(itemOne)
    basket.addItemToBasket(itemTwo)
    const result = basket.isFull()

    // verify
    expect(result).toEqual(expected)
  })
})

describe("basket", () => {
  it("at max capacity?", () => {
    // set up
    const basket = new Basket ()
    const itemOne = new Item(1, "bagel")
    const itemTwo = new Item(2, "bagel")
    const itemThree = new Item(3, "bagel")
    
    const expected = true

    // execute
    basket.addItemToBasket(itemOne)
    basket.addItemToBasket(itemTwo)
    basket.addItemToBasket(itemThree)
    const result = basket.isFull()

    // verify
    expect(result).toEqual(expected)
  })
})

describe("basket", () => {
  it("at max capacity?", () => {
    // set up
    const basket = new Basket (4)
    const itemOne = new Item(1, "bagel")
    const itemTwo = new Item(2, "bagel")
    const itemThree = new Item(3, "bagel")
    
    const expected = false

    // execute
    basket.addItemToBasket(itemOne)
    basket.addItemToBasket(itemTwo)
    basket.addItemToBasket(itemThree)
    const result = basket.isFull()

    // verify
    expect(result).toEqual(expected)
  })
})

describe("basket", () => {
  it("at max capacity?", () => {
    // set up
    const basket = new Basket (4)
    const itemOne = new Item(1, "bagel")
    const itemTwo = new Item(2, "bagel")
    const itemThree = new Item(3, "bagel")
    const itemFour= new Item(4, "bagel")
    const itemFive = new Item(5, "bagel")
    
    const expected = true

    // execute
    basket.addItemToBasket(itemOne)
    basket.addItemToBasket(itemTwo)
    basket.addItemToBasket(itemThree)
    basket.addItemToBasket(itemFour)
    basket.addItemToBasket(itemFive)
    const result = basket.isFull()

    // verify
    expect(result).toEqual(expected)
  })
})

describe("basket", () => {
  it("removing an non-existing item", () => {
    // set up
    const basket = new Basket ()
    const itemOne = new Item(1, "bagel")
    const itemTwo = new Item(2, "bagel")
    const expected = false

    // execute
    basket.addItemToBasket(itemOne)
    basket.addItemToBasket(itemTwo)
    const result = basket.removeItemFromBasket (3)

    // verify
    expect(result).toEqual(expected)
  })
})

describe("basket", () => {
  it("retrieving price of valid item before buying", () => {
    // set up
    const basket = new Basket ()
    const expected = 2.99

    // execute
    const result = basket.fetchPriceOfItem("chocolate_bagel")

    // verify
    expect(result).toEqual(expected)
  })

  it("retrieving price of invalid item before buying", () => {
    // set up
    const basket = new Basket ()
    const expected = false
    
    // execute
    const result = basket.fetchPriceOfItem("fried chicken bagel")
  
    // verify
    expect(result).toEqual(expected)
  })
})

describe("basket", () => {
  it("buying more than one of a type bagel", () => {
    // set up
    const basket = new Basket ()
    const itemOne = new Item(1, "chocolate_bagel")
    const expected = [itemOne, itemOne]

    // execute
    basket.addItemToBasket(itemOne)
    const result = basket.addItemToBasket(itemOne)

    // verify
    expect(result).toEqual(expected)
  })

  it("buying more than one of a type bagel", () => {
    // set up
    const basket = new Basket (4)
    const itemOne = new Item(1, "chocolate_bagel")
    const itemTwo = new Item(2, "philidelphia_bagel")
    const expected = [itemOne, itemOne, itemTwo]

    // execute
    basket.addItemToBasket(itemOne)
    basket.addItemToBasket(itemOne)
    const result = basket.addItemToBasket(itemTwo)

    // verify
    expect(result).toEqual(expected)
  })
})

describe("basket", () => {
  it("sum of basket", () => {
    // set up
    const basket = new Basket ()
    const itemOne = new Item(1, "chocolate_bagel")
    const itemTwo = new Item(2, "pizza_bagel")
    const expected = 6.98

    // execute
    basket.addItemToBasket(itemOne)
    basket.addItemToBasket(itemTwo)
    const result = basket.sumOfBasket ()

    // verify
    expect(result).toEqual(expected)
  })
})
