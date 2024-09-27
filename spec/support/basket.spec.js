const { Basket } = require('../../src/basket.js')

describe('class basket', () => {
  it('add a bagel to the basket', () => {
    const basket = new Basket()

    const expected = [
      { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' }
    ]
    const result = basket.addBagel('BGLO')

    expect(expected).toEqual(result)
    console.log(basket.addBagel, result)
  })

  it('add same type of bagel to the basket', () => {
    const basket = new Basket()

    const expected = [
      { sku: 'BGLS', price: '0.49', name: 'Bagel', variant: 'Sesame' },
      { sku: 'BGLS', price: '0.49', name: 'Bagel', variant: 'Sesame' }
    ]
    const result = basket.addBagel('BGLS')

    expect(expected.length).toEqual(2)
    console.log(basket.addBagel, result)
  })

  it('remove a bagel from the basket', () => {
    const basket = new Basket()

    const expected = [
      {
        sku: 'BGSE',
        price: '2.99',
        name: 'Bagel Sandwich',
        variant: 'Everything',
        fillings: ['Bacon', 'Egg', 'Cheese']
      }
    ]
    basket.addBagel('BGLO')
    basket.addBagel('BGSE')
    const result = basket.removeBagel('BGLO')
    console.log(basket.removeBagel, result)
    expect(result).toEqual(expected)
  })

  it('3. reach to max capasity', () => {
    const basket = new Basket()
    const expected = [
      { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' },
      { sku: 'BGLS', price: '0.49', name: 'Bagel', variant: 'Sesame' },
      { sku: 'BGLS', price: '0.49', name: 'Bagel', variant: 'Sesame' },
      { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' },
      { sku: 'BGLS', price: '0.49', name: 'Bagel', variant: 'Sesame' }
    ]
    basket.addBagel('BGLO')
    basket.addBagel('BGLS')
    basket.addBagel('BGLS')
    basket.addBagel('BGLO')
    basket.addBagel('BGLS')
    expect(basket.addBagel('COF')).toEqual('basket capacity is full')
    console.log('Reach to max capasity', basket.addBagel('COF'))
  })

  it('change the capasity of basket', () => {
    const basket = new Basket()
    const result = basket.newBasketCapacity(5)
    expect(basket.capacity).toEqual(10)
    console.log('new capasity is:', result)
  })
  it('bagel is not in the basket', () => {
    const basket = new Basket()
    basket.addBagel('BGLO')
    basket.removeBagel('BGLP')
    const result = basket.removeBagel('BGLP')
    const expected = 'this bagel does not exist'
    expect(result).toEqual(expected)
    console.log('not exist', result)
  })
  it('bagel price', () => {
    const basket = new Basket()
    basket.addBagel('BGLO')
    const result = basket.bagelPrice('BGLO')
    const expected = '0.49'
    expect(result).toEqual(expected)
    console.log('bagel price is:', result)
  })

  it('total price', () => {
    const basket = new Basket()
    basket.addBagel('BGLO')
    basket.addBagel('BGLO')
    basket.addBagel('BGLE')
    const result = basket.totalBasket()
    const expected = '1.47'
    expect(result).toEqual(expected)
    console.log('totalBasket is:', result)
  })
})
