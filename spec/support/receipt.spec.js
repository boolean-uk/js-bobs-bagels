const { printReceipt } = require('../../src/receipt.js')
const { Basket } = require('../../src/basket.js')

describe('empty receipt test', () => {
  const basket = new Basket(10)
  it('receipt not printed', () => {
    expect(printReceipt(basket)).toEqual("There's nothing in your Basket!")
  })
})
describe(' not empty receipt test', () => {
  const basket = new Basket(10)
  basket.add('BGLP')
  it('receipt printed, no error message', () => {
    expect(printReceipt(basket)).toContain("Bob's Bagels")
    expect(printReceipt(basket)).toContain('0.39')
    expect(printReceipt(basket)).toContain('Total')
  })
})
