const Basket = require('../src/basket.js')

describe('Testing Basket constructor', () => {
  it('New basket is an empty array', () => {
    // Setup
    const basket = new Basket()
    // Execution
    const expectedResult = []
    // Check
    expect(basket.basket).toEqual(expectedResult)
  })
})

describe('Testing addItem', () => {
  it('Item added to an empty basket', () => {
    // Setup
    const basket = new Basket()
    const testItem = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 1
    }
    // Execution
    const expectedResult = new Basket()
    expectedResult.basket.push(testItem)
    basket.addItem('BGLO')
    // Check
    expect(basket).toEqual(expectedResult)
  })

  it('Item already exists in basket', () => {
    // Setup
    const basket = new Basket()
    const testItem = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 2
    }
    // Execution
    const expectedResult = new Basket()
    expectedResult.basket.push(testItem)
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    // Check
    expect(basket).toEqual(expectedResult)
  })

  it('Entered SKU not found', () => {
    // Setup
    const basket = new Basket()
    // Execution
    const result = basket.addItem('WRONG')
    // Check
    expect(result).toBe('Chosen item not found')
  })

  it('No SKU Entered', () => {
    // Setup
    const basket = new Basket()
    // Execution
    const result = basket.addItem()
    // Check
    expect(result).toBe('No SKU Entered')
  })

  it('Basket is full', () => {
    // Setup
    const basket = new Basket(1)
    basket.addItem('BGLO')
    // Execution
    const result = basket.addItem('BGLP')
    // Check
    expect(result).toBe('Basket is full. Item was not added.')
  })
})

describe('Creating baskets with custom size', () => {
  it('Creating a basket with a custom size', () => {
    // Setup
    const basket = new Basket(15)
    // Execution
    const result = basket.size
    // Check
    expect(result).toBe(15)
  })

  it('Gives an error if size is < 0, non-integer or NaN. Creates basket with default size.', () => {
    // Setup
    const basketNonInteger = new Basket(8.5)
    const basketNegative = new Basket(-1)
    const basketNonNumber = new Basket('string')
    // Execution
    const responseNonInteger = basketNonInteger.size
    const responseNegative = basketNegative.size
    const responseNonNumber = basketNonNumber.size
    // Check
    expect(responseNonInteger).toBe(10)
    expect(responseNegative).toBe(10)
    expect(responseNonNumber).toBe(10)
  })
})

describe('Testing removeItem', () => {
  it('Reduces item quantity by 1', () => {
    // Setup
    const basket = new Basket()
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    // Execution
    basket.removeItem('BGLO')
    const result = basket.basket[0].quantity
    // Check
    expect(result).toBe(2)
  })

  it('Removes item from basket if quantity is zero', () => {
    // Setup
    const basket = new Basket()
    basket.addItem('BGLO')
    // Execution
    const expectedResult = new Basket()
    basket.removeItem('BGLO')
    // Check
    expect(basket).toEqual(expectedResult)
  })

  it('Entered SKU not found', () => {
    // Setup
    const basket = new Basket()
    basket.addItem('BGLO')
    // Execution
    const result = basket.removeItem('WRONG')
    // Check
    expect(result).toBe('Chosen item not found')
  })

  it('No SKU entered', () => {
    // Setup
    const basket = new Basket()
    // Execution
    const result = basket.removeItem()
    // Check
    expect(result).toBe('No SKU entered')
  })
})

describe('Testing checkPrice', () => {
  it('SKU matches an inventory item', () => {
    // Setup
    const basket = new Basket()
    // Execution
    const expectedResult = '0.99'
    const result = basket.checkPrice('COF')
    // Check
    expect(result).toBe(expectedResult)
  })

  it('SKU is not correct or no SKU is given', () => {
    // Setup
    const basket = new Basket()
    // Execution
    const result = basket.checkPrice()
    // Check
    expect(result).toBe('Incorrect SKU. Item not found')
  })
})

describe('Testing addMultipleItems', () => {
  it('Item not already in basket', () => {
    // Setup
    const basket = new Basket()
    const testItem = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 3
    }
    // Execution
    const expectedResult = new Basket()
    expectedResult.basket.push(testItem)
    const result = basket.addMultipleItems('BGLO', 3)
    // Check
    expect(result).toEqual(expectedResult.basket)
  })

  it('Item already in basket', () => {
    // Setup
    const basket = new Basket()
    basket.addItem('BGLO')
    const testItem = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 4
    }
    // Execution
    const expectedResult = new Basket()
    expectedResult.basket.push(testItem)
    const result = basket.addMultipleItems('BGLO', 3)
    // Check
    expect(result).toEqual(expectedResult.basket)
  })

  it('SKU is not correct or no SKU is given or quantity not given', () => {
    // Setup
    const basket = new Basket()
    // Execution
    const result = basket.addMultipleItems()
    // Check
    expect(result).toBe('Item not found or quantity not specified.')
  })

  it('If item will take basket above size, tell user what max they can add is', () => {
    // Setup
    const basketTwo = new Basket(2)
    const basketThree = new Basket(3)
    // Execution
    const responseTwo = basketTwo.addMultipleItems('BGLO', 5)
    const responseThree = basketThree.addMultipleItems('BGLO', 5)
    // Check
    expect(responseThree).toEqual('Basket size exceeded. Maximum of 3 allowed')
    expect(responseTwo).toEqual('Basket size exceeded. Maximum of 2 allowed')
  })
})

describe('Testing totalItems', () => {
  it('Checking count of items is correct', () => {
    // Setup
    const basket = new Basket()
    const testItem1 = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 4
    }
    const testItem2 = {
      sku: 'BGLP',
      price: '0.39',
      name: 'Bagel',
      variant: 'Plain',
      quantity: 3
    }
    // Execution
    basket.basket.push(testItem1)
    basket.basket.push(testItem2)
    const result = basket.totalItems()
    // Check
    expect(result).toBe(7)
  })
})

describe('Testing showTotal()', () => {
  it('Shows total price of items in basket', () => {
    // Setup
    const basket = new Basket()
    basket.addItem('BGLO')
    basket.addMultipleItems('COF', 3)
    // Execution
    const result = basket.showTotal()
    // Check
    expect(result).toBe('3.46')
  })

  it('Returns an error if basket is empty', () => {
    // Setup
    const basket = new Basket()
    // Execution
    const result = basket.showTotal()
    // Check
    expect(result).toBe('Basket is currently empty')
  })

  it('Testing offers are correctly calculated', () => {
    // Setup
    const basket1 = new Basket(23)
    const basket2 = new Basket(16)
    const basket3 = new Basket()
    basket1.addMultipleItems('BGLO', 2)
    basket1.addMultipleItems('BGLP', 12)
    basket1.addMultipleItems('BGLE', 6)
    basket1.addMultipleItems('COF', 3)
    basket2.addMultipleItems('BGLP', 16)
    basket3.addItem('COF')
    basket3.addItem('BGLP')
    // Execution
    const result1 = basket1.showTotal()
    const result2 = basket2.showTotal()
    const result3 = basket3.showTotal()
    // Check
    expect(result1).toBe('10.43')
    expect(result2).toBe('5.55')
    expect(result3).toBe('1.25')
  })

  it('The combination of offers that provides the biggest discount should be returned', () => {
    // Setup
    const basket = new Basket(23)
    basket.addMultipleItems('BGLO', 2)
    basket.addMultipleItems('COF', 3)
    basket.addMultipleItems('BGLP', 12)
    basket.addMultipleItems('BGLE', 6)
    // Execution
    const result = basket.showTotal()
    // Check
    expect(result).toBe('10.43')
  })

  describe('Testing printReceipt', () => {
    it('prints receipt if basket is not empty - 1 item', () => {
      // Setup
      const basket = new Basket()
      basket.addItem('BGLO')
      // Execution
      const result = basket.printReceipt()
      // Check
      expect(result).toBe(true)
    })

    it('prints receipt if basket is not empty - multiple items', () => {
      // Setup
      const basket = new Basket()
      basket.addItem('BGLO')
      basket.addMultipleItems('BGLP', 4)
      // Execution
      const result = basket.printReceipt()
      // Check
      expect(result).toBe(true)
    })

    it('gives an error if basket is empty', () => {
      // Setup
      const basket = new Basket()
      // Execution
      const result = basket.printReceipt()
      // Check
      expect(result).toBe('Basket is empty, no receipt printed')
    })
  })
})

// eslint-disable-next-line prettier/prettier
/*
describe('', () => {
  it('', () => {
    // Setup
    // Execution
    // Check
  })
})
*/

