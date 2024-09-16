const { Basket } = require('../src/basket')

describe('Add an item to the basket', () => {
  it('should add one item, if item does not exist in the basket, ', () => {
    // Set up
    const basket = new Basket()
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const result = basket.add(item)
    const productsQuantity = basket.productsQuantity
    const addedItem = basket.items[0].item

    // Test
    expect(result).toEqual(true)
    expect(productsQuantity).toEqual(1)
    expect(addedItem.sku).toEqual(item.sku)
    expect(addedItem.price).toEqual(item.price)
    expect(addedItem.name).toEqual(item.name)
    expect(addedItem.variant).toEqual(item.variant)
  })
  it('should increase quantity of item in the basket, if item exists in the basket', () => {
    // Set up
    const basket = new Basket()
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    basket.add(item)
    const result = basket.add(item, 3)
    const productsQuantity = basket.productsQuantity
    const addedItem = basket.items[0].item

    // Test
    expect(result).toEqual(true)
    expect(productsQuantity).toEqual(4)
    expect(addedItem.sku).toEqual(item.sku)
    expect(addedItem.price).toEqual(item.price)
    expect(addedItem.name).toEqual(item.name)
    expect(addedItem.variant).toEqual(item.variant)
  })
  it('should add two different products to the basket', () => {
    // Set up
    const basket = new Basket()
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const item2 = {
      sku: 'BGLP',
      price: '0.39',
      name: 'Bagel',
      variant: 'Plain'
    }
    const result1 = basket.add(item)
    const result2 = basket.add(item2)
    const productsQuantity = basket.productsQuantity
    const addedItem = basket.items[0].item
    const addedItem2 = basket.items[1].item

    // Test
    expect(result1).toEqual(true)
    expect(result2).toEqual(true)
    expect(productsQuantity).toEqual(2)
    expect(addedItem.sku).toEqual(item.sku)
    expect(addedItem.price).toEqual(item.price)
    expect(addedItem.name).toEqual(item.name)
    expect(addedItem.variant).toEqual(item.variant)
    expect(productsQuantity).toEqual(2)
    expect(addedItem2.sku).toEqual(item2.sku)
    expect(addedItem2.price).toEqual(item2.price)
    expect(addedItem2.name).toEqual(item2.name)
    expect(addedItem2.variant).toEqual(item2.variant)
  })
  it('should add one item, if basket has capacity ', () => {
    // Set up
    const basket = new Basket()
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const result = basket.add(item)
    const productsQuantity = basket.productsQuantity
    const addedItem = basket.items[0].item

    // Test
    expect(result).toEqual(true)
    expect(productsQuantity).toEqual(1)
    expect(addedItem.sku).toEqual(item.sku)
    expect(addedItem.price).toEqual(item.price)
    expect(addedItem.name).toEqual(item.name)
    expect(addedItem.variant).toEqual(item.variant)
  })
  it('should add more item, if basket has capacity ', () => {
    // Set up
    const basket = new Basket()
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const result = basket.add(item, 4)
    const productsQuantity = basket.productsQuantity
    const addedItem = basket.items[0].item

    // Test
    expect(result).toEqual(true)
    expect(productsQuantity).toEqual(4)
    expect(addedItem.sku).toEqual(item.sku)
    expect(addedItem.price).toEqual(item.price)
    expect(addedItem.name).toEqual(item.name)
    expect(addedItem.variant).toEqual(item.variant)
  })
  it('should not add items, if basket is full ', () => {
    // Set up
    const basket = new Basket(1)
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const result = basket.add(item, 2)
    const productsQuantity = basket.productsQuantity

    // Test
    expect(result).toEqual(false)
    expect(productsQuantity).toEqual(0)
  })
  it('should add items, if quantity of items is equal to capacity of basket', () => {
    // Set up
    const basket = new Basket(2)
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const result = basket.add(item, 2)
    const productsQuantity = basket.productsQuantity

    // Test
    expect(result).toEqual(true)
    expect(productsQuantity).toEqual(2)
  })

  it('should not add item, if item does not exist in the inventory', () => {
    // Set up
    const basket = new Basket(2)
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: ''
    }
    const result = basket.add(item, 2)
    const productsQuantity = basket.productsQuantity

    // Test
    expect(result).toEqual(false)
    expect(productsQuantity).toEqual(0)
  })
})

describe('Remove an item from the basket', () => {
  it('should remove item, if item exists in the basket', () => {
    // Set up
    const basket = new Basket()
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    basket.add(item)
    const result = basket.remove(item)
    const productsQuantity = basket.productsQuantity

    // Test
    expect(result).toEqual(true)
    expect(productsQuantity).toEqual(0)
  })
  it('should not remove item, if item does not exist in the basket', () => {
    // Set up
    const basket = new Basket()
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const item2 = {
      sku: 'BGLP',
      price: '0.39',
      name: 'Bagel',
      variant: 'Plain'
    }
    basket.add(item)
    const result = basket.remove(item2)
    const productsQuantity = basket.productsQuantity

    // Test
    expect(result).toEqual(false)
    expect(productsQuantity).toEqual(1)
  })
})

describe('Count total cost of the basket', () => {
  it('should return total cost of the basket', () => {
    // Set up
    const basket = new Basket()
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const item2 = {
      sku: 'BGLP',
      price: '0.39',
      name: 'Bagel',
      variant: 'Plain'
    }
    basket.add(item, 2)
    basket.add(item2, 3)
    const result = basket.totalCost(item)
    const productsQuantity = basket.productsQuantity

    // Test
    expect(Number(result)).toEqual(2.15)
    expect(productsQuantity).toEqual(5)
  })
})

describe('Change capacity of the basket', () => {
  it('should change capacity of the basket, if new capacity is bigger than previous one', () => {
    // Set up
    const basket = new Basket(2)
    basket.changeCapacity(8)

    // Test
    expect(basket.capacity).toEqual(8)
  })
  it('should not change capacity of the basket, if new capacity is smaller than previous one', () => {
    // Set up
    const basket = new Basket(8)
    basket.changeCapacity(2)

    // Test
    expect(basket.capacity).toEqual(8)
  })
})

describe('Check price of item ', () => {
  it('should return price, if item exists in the basket', () => {
    // Set up
    const basket = new Basket()
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    basket.add(item, 2)
    const result = basket.checkPrice(item)
    const productsQuantity = basket.productsQuantity

    // Test
    expect(Number(result)).toEqual(0.49)
    expect(productsQuantity).toEqual(2)
  })
  it('should not return price, if item does not exist in the basket', () => {
    // Set up
    const basket = new Basket()
    const item = {
      sku: 'BGL',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const result = basket.checkPrice(item)

    // Test
    expect(result).toEqual(0)
  })
})

describe('Count total cost of the basket with special offers', () => {
  it('should return total cost of the basket with offer for Bagel Onion', () => {
    // Set up
    const basket = new Basket(10)
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    basket.add(item, 6)
    const result = basket.totalCost(item)

    // Test
    expect(Number(result)).toEqual(2.49)
  })
  it('should return total cost of the basket  with offer for Bagel Everything', () => {
    // Set up
    const basket = new Basket(10)
    const item = {
      sku: 'BGLE',
      price: '0.49',
      name: 'Bagel',
      variant: 'Everything'
    }
    basket.add(item, 6)
    const result = basket.totalCost(item)

    // Test
    expect(Number(result)).toEqual(2.49)
  })

  it('should return total cost of the basket  with offer for Bagel Plain', () => {
    // Set up
    const basket = new Basket(20)
    const item = {
      sku: 'BGLP',
      price: '0.39',
      name: 'Bagel',
      variant: 'Plain'
    }
    basket.add(item, 12)
    const result = basket.totalCost(item)

    // Test
    expect(Number(result)).toEqual(3.99)
  })
})
