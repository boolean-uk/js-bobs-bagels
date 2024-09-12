describe('Basket functionality', () => {
  const Basket = require('../src/basket.js')
  const Bagel = require('../src/bagel.js')
  const Coffee = require('../src/coffee.js')

  let basket
  let bagel
  let bagel2
  let bagel3
  let coffee
  beforeEach(() => {
    basket = new Basket(2)
    bagel = new Bagel('BGLO','bagel', 12)
    bagel2 = new Bagel('BGLE', 'bagel2', 10)
    bagel3 = new Bagel('BGLP', 'bagel3', 11)
    coffee = new Coffee('COFB', 'coffee', 0.99)
  })

  it('check if the basket is full', () => {
    basket.add(bagel)
    expect(basket.isFull()).toBe(false)
    basket.add(bagel)
    expect(basket.isFull()).toBe(true)
  })

  it('should add products to the basket', () => {
    basket.add(bagel)
    basket.add(bagel)
    expect(basket.products.length).toBe(2)
    basket.add(bagel)
    expect(basket.products.length).toBe(2)
    basket.capacity=50
    basket.add(coffee)
    expect(basket.products.length).toBe(3)
  })

  it('should check if the bagel in the basket', () => {
    basket.add(bagel)
    expect(basket.doesBagelExist(bagel2)).toBe(false)
    basket.add(bagel2)
    expect(basket.doesBagelExist(bagel2)).toBe(true)
    basket.add(coffee)
    expect(basket.doesBagelExist(coffee)).toBe(false)
  })

  it('should remove a bagel from the basket', () => {
    basket.add(bagel)
    expect(basket.products.includes(bagel)).toBe(true)
    basket.remove(bagel)
    expect(basket.products.includes(bagel)).toBe(false)
  })

  it('should return total cost of products in the basket', () => {
    basket.add(bagel)
    basket.add(bagel2)
    expect(basket.totalCost()).toBe(22)
    basket.remove(bagel)
    expect(basket.totalCost()).toBe(10)
  })

  it("returns a map with quantities of each product", function() {
    basket.capacity = 5
    basket.add(bagel)
    basket.add(bagel2)
    basket.add(bagel2)

    const quantities = basket.getProductQuantities();

    expect(quantities).toEqual(new Map([
      [bagel, 1],
      [bagel2, 2]
    ]))

    basket.add(coffee)

    const quantities2 = basket.getProductQuantities();

    expect(quantities2).toEqual(new Map([
      [bagel, 1],
      [bagel2, 2],
      [coffee, 1]
    ]))
  });

  it("returns an empty map if there are no products", function() {
    const quantities = basket.getProductQuantities();

    expect(quantities).toEqual(new Map());
  });

  it("calculates discounts correctly", function() {
    basket.capacity=100
    let discounts

    for (let i = 0; i < 5; i++) {
      basket.add(bagel)
    }
    discounts = basket.calculateDiscounts();
    expect(discounts).toEqual(new Map([
      [bagel, 0]
    ]))

    basket.add(bagel)
    discounts = basket.calculateDiscounts();
    expect(discounts).toEqual(new Map([
      [bagel, 0.45]
    ]))

    for (let i = 0; i < 6; i++) {
      basket.add(bagel)
    }
    discounts = basket.calculateDiscounts();
    expect(discounts).toEqual(new Map([
      [bagel, 0.9]
    ]))

    basket.add(bagel2)
    discounts = basket.calculateDiscounts();
    expect(discounts).toEqual(new Map([
      [bagel, 0.9],
      [bagel2, 0]
    ]))

    for (let i = 0; i < 5; i++) {
      basket.add(bagel2)
    }
    discounts = basket.calculateDiscounts();
    expect(discounts).toEqual(new Map([
      [bagel, 0.9],
      [bagel2, 0.45]
    ]))

    for (let i = 0; i < 11; i++) {
      basket.add(bagel3)
    }
    discounts = basket.calculateDiscounts();
    expect(discounts).toEqual(new Map([
      [bagel, 0.9],
      [bagel2, 0.45],
      [bagel3, 0]
    ]))

    basket.add(bagel3)
    discounts = basket.calculateDiscounts();
    expect(discounts).toEqual(new Map([
      [bagel, 0.9],
      [bagel2, 0.45],
      [bagel3, 0.69]
    ]))

    basket.add(coffee)
    discounts = basket.calculateDiscounts();
    expect(discounts).toEqual(new Map([
      [bagel, 0.9],
      [bagel2, 0.45],
      [bagel3, 0.69],
      [coffee, 0]
    ]))
  });
})