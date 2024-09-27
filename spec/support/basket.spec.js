const {BagelStore} = require('../../src/basket.js')


describe("Bob's bagels:", () => {
  let store

  beforeEach(() => {
    store = new BagelStore()
    store.loadFiles()
  })

  it('Add valid item to default basket', () => {
    store.addItemToBasket('bglo')

    const result = store.baskets.defaultBasket.items

    expect(result).toEqual([
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion',
        quantity: 1
      }
    ])
  })

  it('Add invalid item to default basket', () => {
    const result = store.addItemToBasket('troll')

    expect(result).toEqual('ERROR: Please input a valid bagel sku :).')
  })

  it('Remove valid item from default basket', () => {
    store.addItemToBasket('bGlO')
    store.addItemToBasket('bgls')
    store.removeItemFromBasket('bglo')

    const result = store.baskets.defaultBasket.items

    expect(result).toEqual([
      {
        sku: 'BGLS',
        price: '0.49',
        name: 'Bagel',
        variant: 'Sesame',
        quantity: 1
      }
    ])
  })

  it('Remove invalid item from default basket', () => {
    store.addItemToBasket('BGLO')
    store.addItemToBasket('BGSS')

    const result = store.removeItemFromBasket('bgl')

    expect(result).toEqual('ERROR: Please input a valid bagel sku.')
  })

  it('Create new basket with given capacity', () => {
    store.createBasket('new', 5)

    const result = store.baskets.new

    expect(result).toEqual({
      items: [],
      capacity: 5
    })
  })

  it('Create new basket with incorrect parameters', () => {
    const result = store.createBasket('new', [])

    expect(result).toEqual(
      "Error: Please input a valid name & capacity e.g. ('John's', 5)."
    )
  })

  
  it('Hits limit of default basket capacity', () => {
    store.addItemToBasket('bglo')
    store.addItemToBasket('BGLE')
    store.addItemToBasket('BGLS')
    store.addItemToBasket('BGLP')
    store.addItemToBasket('BGSS')
    store.addItemToBasket('bglo')
    store.addItemToBasket('BGLE')
    store.addItemToBasket('BGLS')
    store.addItemToBasket('BGLP')
    store.addItemToBasket('BGSS')

    const result = store.addItemToBasket('BGSE')

    expect(result).toEqual('ERROR: "defaultBasket" has reached max capacity.')
  })

  it('Ability to view quantity of items when adding to basket', () => {
    store.addItemToBasket('bglo')
    store.addItemToBasket('bglo')

    const result = store.baskets.defaultBasket.items

    expect(result).toEqual([
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion',
        quantity: 2
      }
    ])
  })

  it('View total price of items in cart', () => {
    store.addItemToBasket('bglo')
    store.addItemToBasket('bglo')
    store.addItemToBasket('bglo')
    store.addItemToBasket('bglo')

    const result = store.totalPrice()

    expect(result).toEqual('Total: $1.96')
  })

})