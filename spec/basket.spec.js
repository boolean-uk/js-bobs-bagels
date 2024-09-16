const inventory = require('../inventory.json')
const { Basket, Item } = require('../src/basket.js')
describe('Basket', () => {
  it('can have an item added to it and returns true', () => {
    const basket = new Basket()
    const itemObject = inventory.inventory[0]
    const item = new Item(itemObject)
    const result = basket.additemtoBasket(item)
    expect(result).toBeTrue()
  })
  it('returns false if item added is invalid', () => {
    // GIVEN
    const basket = new Basket()
    const item = { name: 'sandwich' }
    // WHEN
    const result = basket.additemtoBasket(item)
    // THEN
    expect(result).toBeFalse()
  })
})

describe('RemoveItem', () => {
  it('can remove a valid item and returns true', () => {
    const basket = new Basket()
    const itemObject = inventory.inventory[0]
    const item = new Item(itemObject)
    basket.additemtoBasket(item)
    const result = basket.removeitemfromBasket(item)
    expect(result).toBeTrue()
  })
  it('cannot remove an invalid item and returns false ', () => {
    const basket = new Basket()
    const item = { name: 'Burger' }
    // WHEN
    const result = basket.removeitemfromBasket(item)
    // THEN
    expect(result).toBeFalse()
  })
})
describe('notOverfillBasket', () => {
  it('cannot overfill basket and returns expected', () => {
    const basket = new Basket()
    const itemObject = inventory.inventory[0]
    const item = new Item(itemObject)
    basket.additemtoBasket(item)
    const result = basket.notOverfillBasket(item)
    expect(result).toBeTrue()
  })
  it('can overfill basket and returns false', () => {
    const basket = new Basket()

    for (let i = 0; i < 6; i++) {
      const itemObject = inventory.inventory[i]
      const item = new Item(itemObject)
      basket.additemtoBasket(item)
    }

    // Attempt to add one more item (overfill)
    const result = basket.notOverfillBasket()

    expect(result).toBeFalse()
  })
})
describe('basketwithlargercapacity', () => {
  it('can increase items in the basket and returns true', () => {
    const basket = new Basket()
    const itemObject = inventory.inventory[0]
    const item = new Item(itemObject)
    basket.additemtoBasket(item)
    for (let i = 1; i < 7; i++) {
      const additionalItemObject = inventory.inventory[i]
      const additionalItem = new Item(additionalItemObject)
      basket.additemtoBasket(additionalItem)
    }
    const result = basket.basketwithlargercapacity(item)
    expect(result).toBeTrue()
  })
  it('cannot increase items in the basket and returns false', () => {
    const basket = new Basket()
    const item = { name: 'Burger' }
    const result = basket.basketwithlargercapacity(item)
    expect(result).toBeFalse()
  })
})
describe('itemnotexisting', () => {
  it('returns true when removing an item that doesnt exist', () => {
    const basket = new Basket()
    const itemObject = inventory.inventory[0]
    const item = new Item(itemObject)
    basket.additemtoBasket(item)
    const result = basket.itemnotExisting(item)
    expect(result).toEqual(true)
  })
  it('returns false when removing a valid item from the basket', () => {
    const basket = new Basket()
    const item = { name: 'Bagel Sandwich' }
    const result = basket.itemnotExisting(item)
    expect(result).toEqual(false)
  })
})
