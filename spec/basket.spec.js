const { Basket } = require('../src/basket')

describe('bobs bagels', () => {
  const testBasket = new Basket()

  beforeEach(() => {
    testBasket.basket = []
  })

  it('An instance of Basket class has a basketCapacity of 10 by default', () => {
    expect(testBasket.basketCapacity).toBe(10)
  })

  it('The manager can change the basket capacity', () => {
    const biggerBasket = new Basket(30)

    expect(biggerBasket.basketCapacity).toBe(30)
  })

  it('addBagel function returns an object with new quantity: 1 property/value', () => {
    const item = testBasket.addBagel('BGLO')

    expect(item).toEqual({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 1
    })
  })

  it('addBagel pushes items successfully into main basket', () => {
    testBasket.addBagel('BGLO')
    testBasket.addBagel('BGSE')

    expect(testBasket.basket).toEqual([
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion',
        quantity: 1
      },
      {
        sku: 'BGSE',
        price: '2.99',
        name: 'Bagel Sandwich',
        variant: 'Everything',
        fillings: ['Bacon', 'Egg', 'Cheese'],
        quantity: 1
      }
    ])
  })

  it('quantity should be increased if bagel already exists in basket', () => {
    testBasket.addBagel('BGLO')
    testBasket.addBagel('BGLO')
    testBasket.addBagel('BGLO')

    expect(testBasket.basket).toEqual([
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion',
        quantity: 3
      }
    ])
  })

  it('if basket is at capacity, addBagel should return false', () => {
    const tinyBasket = new Basket(2)
    tinyBasket.addBagel('BGLO')
    tinyBasket.addBagel('BGLP')
    const oneTooMany = tinyBasket.addBagel('BGLS')

    expect(oneTooMany).toBe(false)
  })

  it('removeBagel function should successfully remove a bagel from the basket', () => {
    testBasket.addBagel('BGLO')
    testBasket.removeBagel('BGLO')

    expect(testBasket.basket).toEqual([])
  })

  it('removeBagel should return the item that has been removed from the basket', () => {
    testBasket.addBagel('BGLO')
    const removed = testBasket.removeBagel('BGLO')

    expect(removed).toEqual({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 1
    })
  })

  it('if the bagel isnt in the basket, removeBagel should return false', () => {
    const fail = testBasket.removeBagel('Non-existent bagel')

    expect(fail).toBe(false)
  })

  it('displayPrices function should return a new array with only the sku, variant and price', () => {
    const priceList = testBasket.displayPrices()

    expect(priceList).toEqual([
      { sku: 'BGLO', price: '0.49', variant: 'Onion' },
      { sku: 'BGLP', price: '0.39', variant: 'Plain' },
      { sku: 'BGLE', price: '0.49', variant: 'Everything' },
      { sku: 'BGLS', price: '0.49', variant: 'Sesame' },
      { sku: 'COF', price: '0.99', variant: '' },
      { sku: 'BGSE', price: '2.99', variant: 'Everything' },
      { sku: 'BGSS', price: '4.99', variant: 'Sesame' }
    ])
  })

  it('displayTotal should calculate the basket total and return it as a string', () => {
    testBasket.addBagel('BGSS')
    testBasket.addBagel('COF')
    testBasket.addBagel('BGLS')
    const total = testBasket.displayTotal()

    expect(total).toEqual('6.47')
  })

  it('applyOffers returns an object with the total sum of all offers (if they exist) and an array with the leftovers items', () => {
    for (let i = 0; i <= 6; i++) {
      testBasket.addBagel('BGLO')
    }

    const data = testBasket.applyOffers()

    expect(data).toEqual({
      offersTotal: 2.49,
      remaining: [{ sku: 'BGLO', remainingAfterOffer: 1 }]
    })
  })

  it('total correctly calculated after offers are applied', () => {
    for (let i = 0; i <= 6; i++) {
      testBasket.addBagel('BGLO')
    }

    for (let i = 0; i <= 11; i++) {
      testBasket.addBagel('BGLP')
    }

    const total = testBasket.displayTotal()

    expect(total).toEqual('6.97')
  })

  it('printReceipt function returns a false if the basket is empty', () => {
    const receipt = testBasket.printReceipt()

    expect(receipt).toBe(false)
  })

  it('printReceipt function returns a truthy value if there are any items in the basket', () => {
    testBasket.addBagel('BGLP')
    const receipt = testBasket.printReceipt()

    expect(receipt).toBeTruthy()
  })
})
