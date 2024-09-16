const Basket = require('./../src/basket')

describe("Bob's Bagel's, ", () => {
  it('Adds an item to the basket', () => {
    // SETUP: Define the inputs that I want to test
    // Input is an object
    const bagel = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }

    // EXECUTE: Pass the inputs to the code I want to test,
    //    making it run to get some sort of result.

    const basket = new Basket()
    const result = basket.addToBasket(bagel)
    expect(result).toEqual(true)
  })

  it('Removes an item from basket', () => {
    // SETUP: Define the inputs that I want to test
    const basket = [
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'
      },
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain'
      }
    ]

    // EXECUTE: Pass the inputs to the code I want to test,
    //    making it run to get some sort of result.

    const basketInstance = new Basket(basket)
    const result = basketInstance.removeFromBasket('BGLP')
    expect(result).toEqual(true)
  })

  it('Capacity has been reached, item not added', () => {
    // SETUP: Define the inputs that I want to test
    const basket = [
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'
      },
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain'
      },
      {
        sku: 'BGLE',
        price: '0.49',
        name: 'Bagel',
        variant: 'Everything'
      }
    ]

    // EXECUTE
    const basketInstance = new Basket(basket, 3)
    const itemBeyondCapacity = {
      sku: 'BGLS',
      price: '0.49',
      name: 'Bagel',
      variant: 'Sesame'
    }
    const result = basketInstance.addToBasket(itemBeyondCapacity)
    expect(result).toEqual('full')
  })

  it('Increases capacity', () => {
    const basket = [
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'
      },
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain'
      },
      {
        sku: 'BGLE',
        price: '0.49',
        name: 'Bagel',
        variant: 'Everything'
      }
    ]

    const basketInstance = new Basket(basket, 3)
    const resultBeforeIncrease = basketInstance.addToBasket({
      sku: 'BGLS',
      price: '0.49',
      name: 'Bagel',
      variant: 'Sesame'
    })
    expect(resultBeforeIncrease).toEqual('full')
    const resultAfterIncrease = basketInstance.increaseCapacity(1)
    expect(resultAfterIncrease).toEqual(4)
  })

  it('Trying to remove an item that does not exist', () => {
    const basket = [
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'
      },
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain'
      },
      {
        sku: 'BGLE',
        price: '0.49',
        name: 'Bagel',
        variant: 'Everything'
      }
    ]

    const basketInstance = new Basket(basket)
    const result = basketInstance.removeFromBasket('BGLS')
    expect(result).toEqual(false)
  })
})
