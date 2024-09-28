const Basket = require("../src/basket.js");

describe("basket", () => {
  /* --- PART 1 - 1 --- */
  it('adds a bagel and returns the basket with that bagel', () => {
    // setup
    const basket = new Basket()

    const expected = 'Your Basket: poppy Continue to order; 4 bagels left'
    // execute
    const result = basket.add('poppy')
    // verify
    expect(result).toEqual(expected)
  })

  it('trys to add a bagel that is not in the list', () => {
    // setup
    const basket = new Basket()

    const expected = 'Please add bagels from the list'
    // execute
    const result = basket.add('chocolate chips')
    // verify
    expect(result).toEqual(expected)
  })

  it('adds another bagel and returns the basket with multiple bagels', () => {
    // setup
    const basket = new Basket()
    basket.add('poppy')

    const expected = 'Your Basket: poppy,sesame Continue to order; 3 bagels left'
    // execute
    const result = basket.add('sesame')
    // verify
    expect(result).toEqual(expected)
  })

  /* --- PART 1 - 2 --- */
  it('adds a bagel, then removes, and returns an empty basket', () => {
    // setup
    const basket = new Basket()
    basket.add('poppy')

    const expected = 'Your Basket:  Continue to order; 5 bagels left'
    // execute
    const result = basket.remove('poppy')
    // verify
    expect(result).toEqual(expected)
  })

  it('remove a specific bagel and returns the basket without that bagel', () => {
    // setup
    const basket = new Basket()
    basket.add('poppy')
    basket.add('sesame')
    basket.add('plain')
    basket.add('cheese')
    basket.add('plain')

    const expected = 'Your Basket: poppy,sesame,cheese,plain Continue to order; 1 bagels left'
    // execute
    const result = basket.remove('plain')
    // verify
    expect(result).toEqual(expected)
  })

  /* --- PART 2 - 1 --- */
  it('returns "Your basket is full"', () => {
    // setup
    const basket = new Basket()
    basket.add('poppy')
    basket.add('sesame')
    basket.add('plain')
    basket.add('cheese')
    basket.add('raisin')

    const expected = 'Your basket is full'
    // execute
    const result = basket.add('plain')
    // verify
    expect(result).toEqual(expected)
  })

  it('returns "Continue to order; 3 bagels left"', () => {
    // setup
    const basket = new Basket()
    basket.add('poppy')
    basket.add('sesame')

    const expected = 'Your Basket: poppy,sesame,cinnamon Continue to order; 2 bagels left'
    // execute
    const result = basket.add('cinnamon')
    // verify
    expect(result).toEqual(expected)
  })

  /* --- PART 2 - 2 --- */
  it('returns "Continue to order; 6 bagels left"', () => {
    // setup
    const basket = new Basket()
    basket.add('poppy')
    basket.add('sesame')
    basket.add('plain')
    basket.add('cheese')
    basket.add('raisin')
    basket.createBigBasket()

    const expected = 'Your Basket: poppy,sesame,plain,cheese,raisin,cinnamon Continue to order; 6 bagels left'
    // execute
    const result = basket.add('cinnamon')
    // verify
    expect(result).toEqual(expected)
  })

  /* --- PART 2 - 3 --- */
  it('trys to remove a non-existing bagel and returns "You have not order this bagel"', () => {
    // setup
    const basket = new Basket()
    basket.add('poppy')
    basket.remove('raisin')

    const expected = 'You have not order this bagel'
    // execute
    const result = basket.remove('raisin')
    // verify
    expect(result).toEqual(expected)
  })

  /* --- PART 3 - 2 --- */
  it("adds cheese with one method", () => {
    // setup
    const basket = new Basket()

    const expected = 'Your Basket: cheese,cheese,cheese Continue to order; 2 bagels left'
    // execute
    const result = basket.add('cheese', 3)
    // verify
    expect(result).toEqual(expected)
  })

  it('returns ["plain", "cheese", "cheese", "cheese"] to add multiple same bagels at the same time', () => {
    // setup
    const basket = new Basket()
    basket.add('plain')

    const expected = 'Your Basket: plain,cheese,cheese,cheese Continue to order; 1 bagels left'
    // execute
    const result = basket.add('cheese', 3)
    // verify
    expect(result).toEqual(expected)
  })

  /* --- PART 3 - 3 --- */
  it("returns total: $6", () => {
    // setup
    const basket = new Basket()
    basket.add('plain')
    basket.add('poppy')

    const expected = 'total: $6'
    // execute
    const result = basket.totalPrice()
    // verify
    expect(result).toEqual(expected)
  })

  it('returns total: $13', () => {
    // setup
    const basket = new Basket()
    basket.add('plain')
    basket.add('plain')
    basket.add('cheese')
    basket.add('cheese')
    basket.add('cinnamon')

    const expected = 'total: $13'
    // execute
    const result = basket.totalPrice()
    // verify
    expect(result).toEqual(expected)
  })
})
