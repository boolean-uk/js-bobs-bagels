const { ShoppingBasket } = require('../../src/basket')

describe('ShoppingBasket', () => {
  let basket
  const items = [
    { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' },
    { sku: 'BGLP', price: '0.39', name: 'Bagel', variant: 'Plain' },
    { sku: 'BGLE', price: '0.49', name: 'Bagel', variant: 'Everything' },
    { sku: 'BGLS', price: '0.49', name: 'Bagel', variant: 'Sesame' },
    { sku: 'COF', price: '0.39', name: 'Coffee', variant: '' },
    {
      sku: 'BGSE',
      price: '2.99',
      name: 'Bagel Sandwich',
      variant: 'Everything'
    },
    { sku: 'BGSS', price: '4.99', name: 'Bagel', variant: 'Sesame' }
  ]
  beforeEach(() => {
    basket = new ShoppingBasket()
  })
  items.forEach((item, index) => {
    describe(`Item ${index + 1}`, () => {
      it('adds and removes an item from the basket', () => {
        basket.addItem(item)
        expect(basket.containsItem(item)).toBeTruthy()
        basket.removeItem(item)
        expect(basket.containsItem(item)).toBeFalsy()
      })
    })
  })
  it('should add items within capacity', () => {
    for (let i = 0; i < basket.capacity; i++) {
      basket.addItem(items[0])
    }
    expect(basket.getItemsCount()).toBe(basket.capacity)
  })
  it('should not add items beyond capacity', () => {
    for (let i = 0; i < basket.capacity + 1; i++) {
      basket.addItem(items[0])
    }
    expect(basket.getItemsCount()).toBeLessThanOrEqual(basket.capacity)
  })

  it("Should return a message if item doesn't exist in basket", () => {
    const result = basket.findItem('non-existent-sku')
    expect(result).toBe("Item doesn't exist in basket")
  })
  it('Basket capacity increased', () => {
    const largerBasket = new ShoppingBasket(10)
    expect(largerBasket.capacity).toBe(10)
  })
  it('should find an existing item by SKU', () => {
    basket.addItem(items[0])
    const result = basket.findItem(items[0].sku)
    expect(result).toEqual(items[0])
  })
  it('should not find an item with a non-existent SKU', () => {
    const result = basket.findItem('non-existent-sku')
    expect(result).toBe("Item doesn't exist in basket")
  })
  it('Show the price of each item before it goes in the basket', () => {
    const itemToShow = items[0]
    const price = basket.getItemPrice(itemToShow)
    expect(price.toFixed(2)).toBe(itemToShow.price)
  })
  it('Lets you add the same item again', () => {
    const itemToAdd = items[0]
    basket.addItem(itemToAdd)
    basket.addItem(itemToAdd)
    const countOfAddedItem = basket.getItemsCountByName(itemToAdd.name)
    expect(countOfAddedItem).toBe(2)
  })
  it('Adds the total price of each item', () => {
    basket.addItem(items[0])
    basket.addItem(items[1])
    const expectedTotal = items
      .slice(0, 2)
      .reduce((total, item) => total + Number(item.price), 0)
      .toFixed(2)
    expect(basket.getTotalPrice().toFixed(2)).toBe(expectedTotal)
  })
})
