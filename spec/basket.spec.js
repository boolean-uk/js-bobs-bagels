const { Basket } = require('../src/basket.js')

describe('The basket class', () => {
  it('have a basket property that starts as a empty array', () => {
    //SETUP
    const basket = new Basket()
    const expectedRes = []
    //VERIFY
    expect(basket.basket).toEqual(expectedRes)
  })

  it('should be able to add a item to this.basket', () => {
    //SETUP
    const basket = new Basket()

    const expectedRes = new Basket()
    expectedRes.basket.push({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 1
    })

    //EXECUTE
    basket.addItem('BGLO')

    //VERIFY
    expect(basket).toEqual(expectedRes)
  })

  it('should be able to remove an item from this.basket', () => {
    //SETUP
    const basket = new Basket()
    basket.basket.push({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 1
    })

    //EXECUTE
    const expectedRes = new Basket()
    basket.removeItem('BGLO')

    //VERIFY
    expect(basket).toEqual(expectedRes)
  })

  it('should be able to remove an item from this.basket', () => {
    //SETUP
    const basket = new Basket()
    basket.basket.push({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 3
    })

    //EXECUTE
    const expectedRes = new Basket()
    expectedRes.basket.push({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 2
    })
    basket.removeItem('BGLO')

    //VERIFY
    expect(basket).toEqual(expectedRes)
  })

  it('should have a default size of 12', () => {
    //SETUP
    const basket = new Basket()

    //VERIFY
    expect(basket.size).toEqual(12)
  })

  it('should be able to set a specific size', () => {
    //SETUP
    const basket = new Basket(5)

    //VERIFY
    expect(basket.size).toEqual(5)
  })

  it('should return a message when the basket is full when trying to add an item', () => {
    //SETUP
    const basket = new Basket(5)

    //EXECUTE
    const expectedRes = 'Basket is full'
    let res = null
    for (let i = 0; i < 6; i++) {
      res = basket.addItem('BGLO')
    }

    //VERIFY
    expect(res).toEqual(expectedRes)
  })

  it('should return a message when trying to remove item thats not in basket', () => {
    //SETUP
    const basket = new Basket()

    //EXECUTE
    const res = basket.removeItem('BGLO')
    const expectedRes = 'Not in Basket'

    //VERIFY
    expect(res).toEqual(expectedRes)
  })

  it('should be able to display the price of a specific item', () => {
    //SETUP
    const basket = new Basket()

    //EXECUTE
    const res = basket.displayPrice('BGLO')
    const expectedRes = '0.49'

    //VERIFY
    expect(res).toEqual(expectedRes)
  })

  it('should be able to add multiple of the same items', () => {
    //SETUP
    const basket = new Basket()

    const expectedRes = new Basket()
    expectedRes.basket.push({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 3
    })

    //EXECUTE
    basket.addMultipleItems('BGLO', 3)

    //VERIFY
    expect(basket).toEqual(expectedRes)
  })

  it('adding multiple items should still respect size', () => {
    //SETUP
    const basket = new Basket(2)

    //EXECTUE
    const expectedRes = 'Not enough space in Basket'
    const res = basket.addMultipleItems('BGLO', 3)

    //VERIFY
    expect(res).toEqual(expectedRes)
  })

  it('should be able to display the total value of the basket', () => {
    //SETUP
    const basket = new Basket()
    basket.addMultipleItems('BGLO', 5)

    //EXECUTE
    const expectedRes = (0.49 * 5).toFixed(2).toString()
    const res = basket.getTotal()

    //VERIFY
    expect(res).toEqual(expectedRes)
  })
})

describe('Extension 1: The total should', () => {
  it('be reduced due to the special offer', () => {
    //SETUP
    const basket = new Basket()
    basket.addMultipleItems('BGLO', 6)

    //EXECUTE
    const expectedRes = '2.49' // offer is 6 onions for 2.49
    const res = basket.getTotal()

    //VERIFY
    expect(res).toEqual(expectedRes)
  })

  it('be reduced due to the special offer', () => {
    //SETUP
    const basket = new Basket(30)
    basket.addMultipleItems('BGLO', 2)
    basket.addMultipleItems('BGLP', 12) // 12 for 3.99
    basket.addMultipleItems('BGLE', 6) // 6 for 2.49
    basket.addMultipleItems('COF', 3)

    //EXECUTE
    //const expectedRes = '10.43'
    const expectedRes = 0.49 * 2 + 3.99 + 2.49 + 0.99 * 3
    const res = basket.getTotal()

    //VERIFY
    expect(res).toEqual(expectedRes.toFixed(2).toString())
  })
})
