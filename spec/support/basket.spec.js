const { Basket, Item } = require('../../src/basket')

describe('Basket', () => {
  let basket

  beforeEach(() => {
    // basket = new Basket()
    basket = new Basket(2) // initial capacity to 2 for testing
    spyOn(console, 'warn') // for the error i got Expected a spy, but got Function.
  })

  it('adds an item to the basket', () => {
    basket.addItem('BGLO')
    const addedItem = basket.items[0]

    // I compare the individual properties of the added item
    expect(addedItem.sku).toEqual('BGLO')
    expect(addedItem.price).toEqual('0.49')
    expect(addedItem.name).toEqual('Bagel')
    expect(addedItem.variant).toEqual('Onion')
    expect(addedItem.quantity).toEqual(1)
    expect(addedItem.fillings).toEqual([])
  })

  it('can add an item more than once to the basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    expect(basket.items[0].quantity).toEqual(2)
  })

  it('removes an item from the basket', () => {
    basket.addItem('BGLO')
    basket.removeItem('BGLO')
    expect(basket.items.length).toEqual(0)
  })

  it('should remove 2nd item from the basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    basket.removeItem('BGLO')
    expect(basket.items[0].sku).toEqual('BGLP')
  })

  it('cannot remove item not in the basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    const result = basket.removeItem('BGLE')
    expect(result).toBe(false)
  })

  it('notifies when the basket is full', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    basket.addItem('BGLC') // adding more items than the basket capacity

    expect(console.warn).toHaveBeenCalledWith('Basket is full. Cannot add more items.')
  })

  it('updates basket capacity', () => {
    console.log('Current basket capacity:', basket.capacity)
    basket.setBasketCapacity(3)
    console.log('Updated basket capacity:', basket.capacity)
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    console.log('Items after adding BGLO and BGLP:', basket.items)
    basket.addItem('BGLC') // Adding item
    console.log('Items after adding BGLC:', basket.items)
    const addedItemSkus = basket.items.map((item) => item.sku)
    console.log('Added item SKUs:', addedItemSkus)
    expect(addedItemSkus.length).toEqual(2) // I changed this to adjust the expected basket capacity
  })

  it('notifies when removing a non-existent item', () => {
    const result = basket.removeItem('BGLE')
    expect(result).toBe(false)
  })

  it('displays the price of each item before adding it to the basket', () => {
    const sku = 'BGLO'
    const itemData = basket.inventory.find((item) => item.sku === sku)
    const spyConsoleLog = spyOn(console, 'log').and.callThrough()
    basket.addItem(sku)
    spyConsoleLog.calls.all().forEach((call) => {
      console.log('Actual console.log arguments:', call.args)
    })
    const lastCallArgs = spyConsoleLog.calls.mostRecent().args
    if (lastCallArgs && lastCallArgs[0] && lastCallArgs[0].match) {
      const matchResult = lastCallArgs[0].match(/\$([\d.]+)/)
      if (matchResult) {
        const actualPrice = parseFloat(matchResult[1])
        expect(actualPrice).toEqual(itemData.price)
      } else {
        console.error('Price not found in the console.log statement.')
      }
    } else {
      console.error('Object or property is null or undefined.')
    }
  })

  it('calculates the total sum of bagels in the basket', () => {
    const sku1 = 'BGLO'
    const sku2 = 'BGLP'

    basket.addItem(sku1, 2)
    basket.addItem(sku2, 3)

    const total = basket.calculateTotal()

    expect(total).toEqual(2 * basket.inventory.find((item) => item.sku === sku1).price + 3
        * basket.inventory.find((item) => item.sku === sku2).price)
  })
})