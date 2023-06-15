const { Basket, BigBasket } = require('../src/basket')

describe('discounts', () => {
  let testBasketTwo
  beforeEach(() => {
    testBasketTwo = new BigBasket()
  })

  it('if there is a BGLO discount, apply it to the price', () => {
    testBasketTwo.addManyBagels('BGLO', 6)
    expect(testBasketTwo.getTotal()).toEqual('total: 2.49')
  })
  it('if there is a BGLP discount, apply it to the price', () => {
    testBasketTwo.addManyBagels('BGLP', 12)
    expect(testBasketTwo.getTotal()).toEqual('total: 3.99')
  })
  it('if there is a BGLE discount, apply it to the price', () => {
    testBasketTwo.addManyBagels('BGLE', 6)
    expect(testBasketTwo.getTotal()).toEqual('total: 2.49')
  })
  it('if there is a COF discount, apply it to the price', () => {
    testBasketTwo.addManyBagels('BGLP', 1)
    testBasketTwo.addManyBagels('COF', 1)
    expect(testBasketTwo.getTotal()).toEqual('total: 1.25')
  })
})

describe('get receipt', () => {
  let testBasketTwo
  beforeEach(() => {
    testBasketTwo = new BigBasket()
  })
  it('there are items in the cart with no discount', () => {
    testBasketTwo.addBagel('BGLP')
    testBasketTwo.addBagel('BGLP')
    testBasketTwo.addBagel('BGLO')
    expect(testBasketTwo.getReceipt()).toEqual(`
    ~~~ Bob's Bagels ~~~

----------------------------

Plain Bagel        2  £0.78
Onion Bagel        1  £0.49

----------------------------
Total                 £1.27

        Thank you
      for your order!
`)
  })
})