const { Basket } = require('../../src/basket')

describe('addItem', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  it('should add a new item to the basket', () => {
    const itemSku = 'BGLO'
    const expectedResult = true

    const result = basket.addItem(itemSku)

    expect(result).toBe(expectedResult)
    expect(basket.items.length).toBe(1)
    expect(basket.items[0].sku).toBe(itemSku)
    expect(basket.items[0].quantity).toBe(1)
  })

  it('should increment quantity for an existing item in the basket', () => {
    const itemSku = 'BGLO'
    basket.items.push({ sku: itemSku, quantity: 2 })

    const expectedResult = true

    const result = basket.addItem(itemSku)

    expect(result).toBe(expectedResult)
    expect(basket.items.length).toBe(1)
    expect(basket.items[0].sku).toBe(itemSku)
    expect(basket.items[0].quantity).toBe(3)
  })

  it('should not add an item when the basket is full', () => {
    basket.capacity = 2
    basket.items.push({ sku: 'BGLO', quantity: 1 })
    basket.items.push({ sku: 'BGLP', quantity: 1 })

    const itemSku = 'BGLE'
    const expectedResult = false

    const result = basket.addItem(itemSku)

    expect(result).toBe(expectedResult)
    expect(basket.items.length).toBe(2)
  })

  it('should handle item not found', () => {
    const itemSku = 'NONEXISTING'
    const expectedResult = false

    const result = basket.addItem(itemSku)

    expect(result).toBe(expectedResult)
    expect(basket.items.length).toBe(0)
  })
})
describe('removeItem', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  it('should remove an existing item from the basket', () => {
    basket.addItem('BGLO')
    const itemSku = 'BGLO'
    const result = basket.removeItem(itemSku)

    expect(result).toBe(true)
    expect(basket.items.length).toBe(0)
  })

  it('should return false and keep the basket unchanged when trying to remove a non-existing item', () => {
    basket.addItem('BGLO')

    const itemSku = 'BGLP'
    const result = basket.removeItem(itemSku)
    expect(result).toBe(false)
    expect(basket.items.length).toBe(1)
  })
})
describe('findItemBySku', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  it('should return the item when it exists in the inventory', () => {
    const itemSku = 'BGLO'
    const expectedResult = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }

    const result = basket.findItemBySku(itemSku)

    expect(result).toEqual(expectedResult)
  })

  it('should return undefined when the item does not exist in the inventory', () => {
    const itemSku = 'NONEXISTING'

    const result = basket.findItemBySku(itemSku)

    expect(result).toBeUndefined()
  })
})
describe('updateCapacity', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  it('should update the capacity when newCapacity is greater than or equal to the number of items in the basket', () => {
    const currentCapacity = basket.capacity
    const newCapacity = currentCapacity + 5

    const result = basket.updateCapacity(newCapacity)

    expect(result).toBe(true)
    expect(basket.capacity).toBe(newCapacity)
  })
  describe('Basket calculateTotalPrice', () => {
    let basket

    beforeEach(() => {
      basket = new Basket()
    })

    it('should calculate the total price correctly for regular-priced items', () => {
      basket.addItem('BGLO')
      basket.addItem('BGLP')
      basket.addItem('BGLE')

      const totalPrice = basket.calculateTotalPrice()
      expect(totalPrice).toBeCloseTo(1.37, 2)
    })

    it('should calculate the total price correctly without special offers', () => {
      basket.addItem('BGLO')
      basket.addItem('BGLO')
      basket.addItem('BGLO')
      basket.addItem('BGLP')
      basket.addItem('BGLP')
      basket.addItem('BGLE')
      basket.addItem('BGLE')

      const totalPrice = basket.calculateTotalPrice()
      expect(totalPrice).toBeCloseTo(3.23, 2)
    })

    it('should calculate the total price correctly when no items are added', () => {
      const totalPrice = basket.calculateTotalPrice()
      expect(totalPrice).toBe(0)
    })
    it('should calculate the total price with special offers', () => {
      basket.addItem('BGLO')
      basket.addItem('BGLO')
      const numberOfItemsToAdd = 12
      const itemSku = 'BGLP'

      for (let i = 0; i < numberOfItemsToAdd; i++) {
        basket.addItem(itemSku)
      }
      const numberOfItemsToAddBGLE = 6
      const itemSkuBGLE = 'BGLE'

      for (let i = 0; i < numberOfItemsToAddBGLE; i++) {
        basket.addItem(itemSkuBGLE)
      }
      basket.addItem('COFB')
      basket.addItem('COFB')
      basket.addItem('COFB')

      const totalPrice = basket.calculateTotalPrice()
      expect(totalPrice).toBeCloseTo(10.43, 2)
    })
  })
})
