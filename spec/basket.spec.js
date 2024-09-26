const { Basket }= require('../src/basket.js')
const placeOrder = require('../src/order.js')

describe("Basket tests", () => {
  let basket;

  beforeEach(() => {
    basket = new Basket(2)
  })

  it('should create a Basket class object', () => {
    expect(basket).toBeDefined
  })

  it('shoud add item to basket', () => {
    // Setup
    basket.addItem("BGLP")

    // Test
    expect(basket.items.size).toEqual(1)
  })

  it('should remove item from basket', () => {
    // Setup
    basket.addItem("BGLP")
    basket.removeItem("BGLP")

    // Test
    expect(basket.items.size).toEqual(0)
  })

  it('should throw exception while trying to remove non-existent item from basket', () => {
    expect(() => basket.removeItem("BGLP")).toThrow()
  })

  it('should throw exception when trying to add item over basket capacity', () => {
    // Setup
    basket.addItem("BGLP")
    basket.addItem("BGLP")

    // Test
    expect(() => basket.addItem("BGLP")).toThrow()
  })

  it('should return it price', () => {
    // Test
    expect(basket.checkPrice("BGLS")).toEqual(0.49)
  })

  it('should be able to add the same item to basket more than once', () => {
    // Setup
    const item = basket.getItemBySku("BGLP");

    basket.addItem("BGLP")
    basket.addItem("BGLP")

    // Test
    expect(basket.items.get(item)).toEqual(2)
  })

  it('should calculate total price of items in basket', () => {
    // Setup
    basket.addItem("BGLP")
    basket.addItem("BGLP")

    //Test
    expect(basket.getTotalPrice()).toEqual(0.78)
  })

  it('should calculate total price of items in basket combo of 6 same bagels', () => {
    // Setup
    basket = new Basket(20)
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")

    //Test
    expect(basket.getTotalPrice()).toEqual(2.49)
  })

  it('should calculate total price of items in basket combo of 12 same bagels', () => {
    // Setup
    basket = new Basket(20)
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")

    //Test
    expect(basket.getTotalPrice()).toEqual(3.99)
  })

  it('should calculate total price of items in basket combo of 6 same bagels and one coffee', () => {
    // Setup
    basket = new Basket(20)
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("COF")

    //Test
    expect(basket.getTotalPrice()).toEqual(3.48)
  })

  it('should calculate total price of items in basket combo of 6 same bagels and one bagel sandwich', () => {
    // Setup
    basket = new Basket(20)
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGLP")
    basket.addItem("BGSS")

    //Test
    expect(basket.getTotalPrice()).toEqual(7.48)
  })

  it('should print receipt', () => {
    //Setup
    basket = new Basket(30)
    Array(2).fill().forEach(() => basket.addItem("BGLO"))
    Array(12).fill().forEach(() => basket.addItem("BGLP"))
    Array(3).fill().forEach(() => basket.addItem("BGLE"))
    Array(3).fill().forEach(() => basket.addItem("COF"))
    const [receipt, orderJson] = placeOrder(basket.items)
    const dateOfOrder = JSON.parse(orderJson)['Date of order']

    //Test
    expect(receipt).toContain("~~~ Bob's Bagels ~~~")
    expect(receipt).toContain(dateOfOrder)
    expect(receipt).toContain("------------------")
    expect(receipt).toMatch("Bagel.*Onion.*2.*£0.98")
    expect(receipt).toMatch("Bagel.*Plain.*12.*£4.68")
    expect(receipt).toMatch("Bagel.*Everything.*3.*£1.47")
    expect(receipt).toMatch("Coffee.*3.*£2.97")
    expect(receipt).toMatch("Total.*10.10")
  })

  it('should print savings', () => {
    //Setup
    basket = new Basket(30)
    Array(2).fill().forEach(() => basket.addItem("BGLO"))
    Array(12).fill().forEach(() => basket.addItem("BGLP"))
    Array(6).fill().forEach(() => basket.addItem("BGLE"))
    Array(3).fill().forEach(() => basket.addItem("COF"))
    const [receipt, orderJson] = placeOrder(basket.items)
    const dateOfOrder = JSON.parse(orderJson)['Date of order']

    //Test
    expect(receipt).toContain("~~~ Bob's Bagels ~~~")
    expect(receipt).toContain(dateOfOrder)
    expect(receipt).toContain("------------------")
    expect(receipt).toMatch("Bagel.*Onion.*2.*£0.98")
    expect(receipt).toContain("(-£0.49)")
    expect(receipt).toMatch("Bagel.*Plain.*12.*£4.68")
    expect(receipt).toContain("(-£0.69)")
    expect(receipt).toMatch("Bagel.*Everything.*6.*£2.94")
    expect(receipt).toContain("(-£0.49)")
    expect(receipt).toMatch("Coffee.*3.*£2.97")
    expect(receipt).toMatch("Total.*11.57")
    expect(receipt).toContain("You saved a total of £1.14")
    expect(receipt).toContain("on this shop")
    expect(receipt).toContain("Thank you")
    expect(receipt).toContain("for your order!")
  })
})