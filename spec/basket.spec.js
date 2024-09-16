const { Basket } = require('./../src/basket')

describe('Basket contents:', () => {
  it('(1) should add a bagel to the basket', () => {
    //setup

    const sku = 'BGSE'
    const quantity = 1
    const newBasket = new Basket()

    //execute
    const expectedResult = 1
    newBasket.addToBasket(sku, quantity)
    const result = newBasket.basket.length

    //verify
    expect(result).toEqual(expectedResult)
  })

  it('(2) should remove a bagel from the basket', () => {
    //setup
    const sku = 'BGLO'
    const newBasket = new Basket()

    newBasket.basket.push(
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'
      },
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain'
      }
    )

    //execute:
    const expectedBasket = new Basket()
    expectedBasket.basket.push({
      sku: 'BGLP',
      price: '0.39',
      name: 'Bagel',
      variant: 'Plain'
    })
    const expectedResult = expectedBasket

    newBasket.removeFromBasket(sku)

    const result = newBasket
    //verify
    // eslint-disable-next-line no-undef
    expect(result).toEqual(expectedResult)
  })

  it('(3) should inform user that item is not in basket', () => {
    //setup
    const sku = 'BGLO'
    const newBasket = new Basket()

    //execute
    const expectedResult = 'this bagel is not in your basket'

    //verify
    const result = newBasket.removeFromBasket(sku)

    expect(result).toEqual(expectedResult)
  })

  it('(4) should have default capacity 10', () => {
    const newBasket = new Basket()

    const expectedResult = 10
    const result = newBasket.capacity
    //verify
    // eslint-disable-next-line no-undef
    expect(result).toEqual(expectedResult)
  })

  it('(5) should have an increased basket size  > 10', () => {
    const newBasket = new Basket(15)

    //execute
    const expectedResult = 15
    newBasket.checkBasketCapacity()
    const result = newBasket.capacity
    //verify
    // eslint-disable-next-line no-undef
    expect(result).toEqual(expectedResult)
  })

  it('(6) should allow user to add multiple of same item to basket', () => {
    //setup
    const newBasket = new Basket()
    const sku = 'BGLO'
    const quantity = 2

    //execute
    const expectedResult = 2
    newBasket.addToBasket(sku, quantity)
    const result = newBasket.basket.length

    //verify
    expect(result).toEqual(expectedResult)
  })

  it('(7) should display the item price', () => {
    //setup
    const newBasket = new Basket()
    const sku = 'BGLO'

    //execute
    const expectedResult = '0.49'

    const result = newBasket.displayPrice(sku)
    //verify
    expect(result).toEqual(expectedResult)
  })

  it('(8) should calculate the total basket cost', () => {
    //setup
    const newBasket = new Basket()
    const skuOne = 'BGLO'
    const skuTwo = 'BGLP'
    
    //execute
    newBasket.addToBasket(skuOne, 1)
    newBasket.addToBasket(skuTwo, 2)

    const expectedResult = '1.27'

    const result = newBasket.calculateTotal()
    //verify
    expect(result).toEqual(expectedResult)
  })

  it('(9) should calculate the total basket cost with multiple discounts applied', () => {
    //setup
    const newBasket = new Basket()
    const skuOne = 'BGLO'
    const skuTwo = 'BGLP'
    const skuThr = 'BGLE'
    const cof = 'COF'

    //execute
    //from example order 1 in extension1.md
    newBasket.addToBasket(skuOne, 2)
    newBasket.addToBasket(skuTwo, 12)
    newBasket.addToBasket(skuThr, 6)
    newBasket.addToBasket(cof, 3)

    const expectedResult = '10.43'

    const result = newBasket.calculateTotal()

    //verify
    expect(result).toEqual(expectedResult)
  })

  it('(10) should calculate the total basket cost with multiple discounts applied', () => {
    //setup
    const newBasket = new Basket()
    const sku = 'BGLP'

    //execute
    //from example order 2 in extension1.md
    newBasket.addToBasket(sku, 16)

    const expectedResult = '5.55'

    const result = newBasket.calculateTotal()

    //verify
    expect(result).toEqual(expectedResult)
  })

//TODO: implement code for this
  it('(11) should calculate the total when both the plain bagel and coffee special is applied + one extra coffee', () => {
    //setup
    const newBasket = new Basket()
    const skuOne = 'BGLP'
    const skuTwo= 'COF'

    //execute
    //from example order 2 in extension1.md
    newBasket.addToBasket(skuOne, 13)
    newBasket.addToBasket(skuTwo, 2)

    const expectedResultNum = 3.99 + 1 + 0.99
    const expectedResult = expectedResultNum.toString()

    const result = newBasket.calculateTotal()

    //verify
    expect(result).toEqual(expectedResult)
  })

})
