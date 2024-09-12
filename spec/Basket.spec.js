const { BagelBasket } = require('../src/basket.js')

describe('BagelBasket', () => {
  let basket
  const bagels = [
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
    basket = new BagelBasket()
  })

  // Bagels being added to basket and removed from basket
  bagels.forEach((bagel, index) => {
    describe(`Bagel ${index + 1}`, () => {
      it('adds and removes an item from the basket', () => {
        basket.addItem(bagel)
        expect(basket.items).toContain(bagel)
        basket.removeItem(bagel)
        expect(basket.items).not.toContain(bagel)
      })
    })
  })

  // Basket too full section
  it('should add items within capacity', () => {
    for (let i = 0; i < basket.capacity; i++) {
      basket.addItem(bagels[0])
    }
    expect(basket.items.length).toBe(basket.capacity)
  })

  it('should not add items beyond capacity', () => {
    for (let i = 0; i < basket.capacity + 1; i++) {
      basket.addItem(bagels[0])
    }
    expect(basket.items.length).toBeLessThanOrEqual(basket.capacity)
  })

  // if item doesn't exist
  it("Should return a message if item doesn't exist in basket", () => {
    const result = basket.findBagel('non-existent-sku')
    expect(result).toBe("Item doesn't exist in basket")
  })

  // increase capacity
  it('Basket capacity increased', () => {
    const largerBasket = new BagelBasket(10)
    expect(largerBasket.capacity).toBe(10)
  })

  // finding existing items
  it('should find an existing item by SKU', () => {
    basket.addItem(bagels[0])
    const result = basket.findBagel(bagels[0].sku)
    expect(result).toEqual(bagels[0])
  })

  it('should not find an item with a non-existent SKU', () => {
    const result = basket.findBagel('non-existent-sku')
    expect(result).toBe("Item doesn't exist in basket")
  })

  // showing the price of each item
  it('Show the price of each item before it goes in the basket', () => {
    const bagelToShow = bagels[0] // Choose a specific bagel to show the price
    const price = basket.getItemPrice(bagelToShow)
    expect(price.toFixed(2)).toBe(bagelToShow.price)
  })

  // Adding the same item
  it('Lets you add the same item again', () => {
    const bagelToAdd = bagels[0]
    basket.addItem(bagelToAdd)
    basket.addItem(bagelToAdd)

    // Check if the specific bagel was added twice
    const countOfAddedBagel = basket.items.filter(
      (item) => item.name === bagelToAdd.name
    ).length
    expect(countOfAddedBagel).toBe(2)
  })

  // Total price added together
  it('Adds the total price of each item', () => {
    basket.addItem(bagels[0])
    basket.addItem(bagels[1])

    const expectedTotal = bagels
      .slice(0, 2)
      .reduce((total, bagel) => {
        return total + Number(bagel.price)
      }, 0)
      .toFixed(2)

    expect(basket.getTotalPrice().toFixed(2)).toBe(expectedTotal)
  })
})

module.exports = BagelBasket
