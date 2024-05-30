const {
  BasketItem,
  Basket,
  Inventory,
  InventoryItem,
  SpecialOffer
} = require('../src/basket.js')
const inventory = require('../inventory.json')

describe('add to basket', () => {
  it('the item, which was not already in the basket, is added', () => {
    const basketItem1 = new BasketItem(inventory.inventory[0])
    const basketItem2 = new BasketItem(inventory.inventory[1])
    const basket1 = new Basket([basketItem1, basketItem2])

    const basketItemToAdd = new BasketItem(inventory.inventory[2])

    const result = basket1.addToBasket(basketItemToAdd)

    expect(result.length).toEqual(3)
    expect(result[2].sku).toEqual('BGLE')
  })

  it('the item is already in the basket', () => {
    const basketItem1 = new BasketItem(inventory.inventory[0])
    const basketItem2 = new BasketItem(inventory.inventory[1])
    const basket1 = new Basket([basketItem1, basketItem2])

    const result = basket1.addToBasket(basketItem1)
    const expected = 'this item is already in your basket!'

    expect(result).toEqual(expected)
  })
})

describe('remove from basket', () => {
  it('item succesfully removed', () => {
    const basketItem1 = new BasketItem(inventory.inventory[0])
    const basketItem2 = new BasketItem(inventory.inventory[1])
    const basket1 = new Basket([basketItem1, basketItem2])

    const result = basket1.removeItem(basketItem1)

    expect(result.length).toEqual(1)
    expect(result[0].sku).toEqual('BGLP')
  })

  it('basket is empty', () => {
    const basketItem1 = new BasketItem(inventory.inventory[0])
    const basket1 = new Basket([])
    const result = basket1.removeItem(basketItem1)

    expect(result).toEqual('nothing to remove, your basket is empty')
  })

  describe('check whether the basket is full', () => {
    it('the basket is full', () => {
      const basketItem1 = new BasketItem(inventory.inventory[0])
      const basketItem2 = new BasketItem(inventory.inventory[1])
      const basket1 = new Basket([basketItem1, basketItem2], 2)

      const result = basket1.isBasketFull()
      expect(result).toEqual('the basket is full! (2/2)')
    })
  })

  it('the basket is not full', () => {
    const basketItem1 = new BasketItem(inventory.inventory[0])

    const basket1 = new Basket([basketItem1], 2)

    const result = basket1.isBasketFull()
    expect(result).toEqual('the basket is not full yet (1/2)')
  })
})

describe('set the capacity of the basket', () => {
  it('the capacity was set successfully', () => {
    const basket1 = new Basket([], 2)
    const result = basket1.setCapacity(5)
    expect(result).toEqual({ list: [], capacity: 5 })
  })
  it('invalid number - the capacity is unchanged', () => {
    const basket1 = new Basket([], 2)
    const result = basket1.setCapacity(-3)
    expect(result).toEqual('invalid number - capacity remains 2')
  })
})

describe('check that the item to be removed is in the basket', () => {
  it('item found', () => {
    const basketItem1 = new BasketItem(inventory.inventory[0])
    const basketItem2 = new BasketItem(inventory.inventory[1])
    const basket1 = new Basket([basketItem1, basketItem2])

    const result = basket1.checkForItemToRemove(basketItem2)

    expect({
      sku: result.sku,
      price: result.price,
      name: result.name,
      variant: result.variant
    }).toEqual({
      sku: 'BGLP',
      price: '0.39',
      name: 'Bagel',
      variant: 'Plain'
    })
  })

  it('no such item found', () => {
    const basketItem1 = new BasketItem(inventory.inventory[0])
    const basketItem2 = new BasketItem(inventory.inventory[1])
    const basketItem3 = new BasketItem(inventory.inventory[2])
    const basket1 = new Basket([basketItem1, basketItem2])

    const result = basket1.checkForItemToRemove(basketItem3)

    expect(result).toEqual('no such item in the basket!')
  })
})

describe('display item price property', () => {
  it('exists', () => {
    const basketItem1 = new BasketItem(inventory.inventory[4])
    const result = basketItem1.displayItemPrice()
    expect(result).toBe('0.99')
  })
  it('does not exist', () => {
    const basketItem2 = new BasketItem({
      sku: 'BGLO',
      price: undefined,
      name: 'Bagel',
      variant: 'Onion'
    })
    const result = basketItem2.displayItemPrice()
    expect(result).toEqual('price unknown - please message the seller')
  })
})

describe('increase the quantity of an item', () => {
  it('is already in the basket', () => {
    const basketItem1 = new BasketItem(inventory.inventory[2])
    const basketItem2 = new BasketItem(inventory.inventory[3])
    const basketItem3 = new BasketItem(inventory.inventory[4])
    const basket1 = new Basket([basketItem1, basketItem2, basketItem3], 4)

    const result = basket1.increaseQuantity(basketItem2)
    expect(result.quantity).toBe(2)
    expect(result.sku).toBe('BGLS')
  })
  it('which is not in the basket', () => {
    const basketItem1 = new BasketItem(inventory.inventory[2])
    const basketItem2 = new BasketItem(inventory.inventory[3])
    const basketItem3 = new BasketItem(inventory.inventory[4])
    const basket1 = new Basket([basketItem1, basketItem2], 4)

    const result = basket1.increaseQuantity(basketItem3)
    expect(result).toBe('this item is not in you basket yet - add it?')
  })
})

describe('total cost', () => {
  it('shows the sum of the prices of the items multiplied by their quantities', () => {
    const basketItem1 = new BasketItem(inventory.inventory[2])
    const basketItem2 = new BasketItem(inventory.inventory[3])
    const basketItem3 = new BasketItem(inventory.inventory[4])
    const basket1 = new Basket([basketItem1, basketItem2, basketItem3], 4)

    const result = basket1.total()
    expect(result).toBe('1.97')
  })

  it('cannot show the sum, the basket is empty', () => {
    const basket1 = new Basket([], 4)
    const result = basket1.total()
    expect(result).toBe('the basket is empty - add some bagels?')
  })
})

describe('special offers', () => {
  it('found successfully', () => {
    const specialOffer1 = new SpecialOffer(true, 6, '2.49', 'BGLO')
    const specialOffer2 = new SpecialOffer(true, 12, '3.99', 'BGLP')
    const specialOffer3 = new SpecialOffer(true, 6, '2.49', 'BGLE')
    const specialOffer4 = new SpecialOffer(
      true,
      1,
      '1.25',
      'COF',
      'Coffee & Plain Bagel'
    )

    const inventoryItem1 = new InventoryItem(
      inventory.inventory[0],
      specialOffer1
    )
    const inventoryItem2 = new InventoryItem(
      inventory.inventory[1],
      specialOffer2
    )
    const inventoryItem3 = new InventoryItem(
      inventory.inventory[2],
      specialOffer3
    )
    const inventoryItem4 = new InventoryItem(inventory.inventory[3])
    const inventoryItem5 = new InventoryItem(
      inventory.inventory[4],
      specialOffer4
    )
    const inventoryItem6 = new InventoryItem(inventory.inventory[5])

    const inventory1 = new Inventory([
      inventoryItem1,
      inventoryItem2,
      inventoryItem3,
      inventoryItem4,
      inventoryItem5,
      inventoryItem6
    ])

    const result = inventory1.getSpecialOffers()

    expect(result[0].active).toEqual(true)
    expect(result[0].itemSku).toEqual('BGLO')
    expect(result[0].requiredQuantity).toEqual(6)
    expect(result[0].discountedPrice).toEqual('2.49')

    expect(result[1].active).toEqual(true)
    expect(result[1].itemSku).toEqual('BGLP')
    expect(result[1].requiredQuantity).toEqual(12)
    expect(result[1].discountedPrice).toEqual('3.99')

    expect(result[2].active).toEqual(true)
    expect(result[2].itemSku).toEqual('BGLE')
    expect(result[2].requiredQuantity).toEqual(6)
    expect(result[2].discountedPrice).toEqual('2.49')

    expect(result[3].active).toEqual(true)
    expect(result[3].itemSku).toEqual('COF')
    expect(result[3].requiredQuantity).toEqual(1)
    expect(result[3].discountedPrice).toEqual('1.25')
    expect(result[3].combo).toEqual('Coffee & Plain Bagel')
  })

  it('were not found', () => {
    const inventory1 = new Inventory(inventory.inventory)
    const result = inventory1.getSpecialOffers()
    expect(result).toEqual('no offers found')
  })
})
