import Basket from '../src/basket.js'

describe('addToBasket', () => {
  let basket
  beforeEach(() => {
    basket = new Basket()
  })

  it('adds the given item to the basket', () => {
    //GIVEN
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 1
    }
    //WHEN
    const res = basket.addToBasket('BGLO')
    //THEN
    expect(res).toEqual(item)
    expect(basket.items.length).toEqual(1)
  })

  it('adds a different given item to the basket', () => {
    const item = {
      sku: 'BGLP',
      price: '0.39',
      name: 'Bagel',
      variant: 'Plain',
      quantity: 1
    }
    const res = basket.addToBasket('BGLP')
    expect(res).toEqual(item)
    expect(basket.items.length).toEqual(1)
  })

  it('does not add to basket if the given sku does not match an inventory item', () => {
    const res = basket.addToBasket('XXXX')
    expect(res).toEqual(undefined)
    expect(basket.items.length).toEqual(0)
  })

  it('if already in basket, increase quantity by 1', () => {
    const item = {
      sku: 'BGLP',
      price: '0.39',
      name: 'Bagel',
      variant: 'Plain',
      quantity: 2
    }
    basket.addToBasket('BGLP')
    const res = basket.addToBasket('BGLP')
    expect(res).toEqual(item)
    expect(basket.items.length).toEqual(1)
  })
})

describe('remove from basket', () => {
  let basket
  beforeEach(() => {
    basket = new Basket()
  })

  it('should check that item exists in basket', () => {
    const res = basket.removeFromBasket('XXXX')
    expect(res).toEqual('item does not exist in basket')
  })

  it('should be able to remove item from basket', () => {
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 0
    }
    basket.addToBasket('BGLO')
    const res = basket.removeFromBasket('BGLO')
    expect(res).toEqual(item)
    expect(basket.items.length).toEqual(1)
  })

  it('should be able to decrease quantity in basket', () => {
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 1
    }
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLO')
    const newRes = basket.removeFromBasket('BGLO')
    expect(newRes).toEqual(item)
    expect(basket.items.length).toEqual(1)
  })
})

describe('basket is full', () => {
  let basket
  beforeEach(() => {
    basket = new Basket()
  })

  it('basket is full, cannot add bagel types beyound basket size', () => {
    basket.addToBasket('BGLP')
    basket.addToBasket('BGLE')
    const res = basket.addToBasket('BGLO')
    const expectRes = 'basket is full'
    expect(res).toEqual(expectRes)
  })
})

describe('changeBasketCapacity', () => {
  let basket
  beforeEach(() => {
    basket = new Basket()
  })

  it('should incease the basket capacity ', () => {
    const res = basket.changeBasketCapacity(3)
    expect(res).toEqual(3)
  })
})

describe('price of items', () => {
  let basket
  beforeEach(() => {
    basket = new Basket()
  })

  it('should return price of each item before adding to basket', () => {
    const res = basket.checkPrice('BGLO')
    expect(res).toEqual('0.49')
  })

  it('if not in inventory return not available', () => {
    const res = basket.checkPrice('XXXX')
    expect(res).toEqual('not available')
  })
})

describe('basketTotal', () => {
  let basket
  beforeEach(() => {
    basket = new Basket()
  })

  it('should return the total price of all items in the basket', () => {
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLP')
    const res = basket.basketTotal()
    expect(res).toEqual(0.88)
  })

  it('should return total price of basket for multiples of same item', () => {
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLO')
    const res = basket.basketTotal()
    expect(res).toEqual(0.98)
  })

  it('returns 0 if basket is empty', () => {
    const res = basket.basketTotal()
    expect(res).toEqual(0)
  })
})
