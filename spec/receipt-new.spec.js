const Receipt2 = require("../src/receipt-new.js")

const exampleBasket = [
      { sku: 'BGLE', price: '0.49', name: 'Bagel', variant: 'Everything', quantity: 5 },
      { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion', quantity: 6 },
      { sku: 'BGLP', price: '0.39', name: 'Bagel', variant: 'Plain', quantity: 1 },
      { sku: 'COF', price: '0.99', name: '', variant: 'Coffee', quantity: 1 }
    ]

const RANDOM_SAVINGS = 1.14

describe("Receipt2", () => {
  let receipt

  beforeEach(() => {
    receipt = new Receipt2(exampleBasket, RANDOM_SAVINGS)
  })

  
  it("new basket is empty array", () => {

    expect(receipt.items).toEqual(exampleBasket)
  })

  it("zero savings message", () => {
    receipt.totalSavings = 0
    expect(receipt.savingsMessage()).toEqual(" ")
  })

  it("zero savings message", () => {
    expect(receipt.savingsMessage()).toEqual(`\n    You saved a total of £1.14
    \t on this shop\n`)
  })

  it("total each item, no deal applied 5 everything bagels", () => {
    expect(receipt.totalEachItem(receipt.items[0], 6, 2.49)).toEqual(2.45)
  })

  it("total each item, deal applied 6 onion bagels", () => {
    expect(receipt.totalEachItem(receipt.items[1], 6, 2.49)).toEqual(2.49)
  })


})