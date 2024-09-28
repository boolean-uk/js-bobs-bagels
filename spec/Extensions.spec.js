const Bagel = require('../src/Bagel-extensions.js')

describe ('Bobs Bagel extensions', () => {
  /* --- EXTENSION PART 1 --- */
  it('adds an item into the basket', () => {
    // setup
    const bagel = new Bagel()

    const expected = ['BGLO']
    // verify
    const result = bagel.addToBasket('BGLO')
    // execute
    expect(result).toEqual(expected)
  })

  it('tries to an item into the basket that is not in the item list', () => {
    // setup
    const bagel = new Bagel()

    const expected = 'Please add items from the list'
    // verify
    const result = bagel.addToBasket('BGLX')
    // execute
    expect(result).toEqual(expected)
  })
})