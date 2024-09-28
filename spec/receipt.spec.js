const Receipt = require('../src/receipt.js')

describe ('Receipt class', () => {
  it ('returns the receipt details', () => {
  // setup
    const receipt = new Receipt()
    const skuQuantityObj = { BGLO: 1, BGLE: 2, BGLP: 1 }
    const subPrice = { BGLO: 0.49, BGLE: 0.98, BGLP: 0.39 }

    const expected = '1x BGLO = 0.49\n2x BGLE = 0.98\n1x BGLP = 0.39\n'
    // execute
    const result = receipt.receiptLine(skuQuantityObj, subPrice)
    // verify
    expect(result).toEqual(expected)
})

  it ('prints out the SKU receipt', () => {
  // setup
    const receipt = new Receipt()
    const skuQuantityObj = { BGLO: 1, BGLE: 2, BGLP: 1 }
    const subPrice = { BGLO: 0.49, BGLE: 0.98, BGLP: 0.39 }
    const totalPrice = 1.86
    const receiptLine = receipt.receiptLine(skuQuantityObj, subPrice)

    const expected = '1x BGLO = 0.49\n2x BGLE = 0.98\n1x BGLP = 0.39\n          ----\n          1.86'
    // execute
    const result = receipt.printSKUReceipt(receiptLine, totalPrice)
    // verify
    expect(result).toEqual(expected)
  })
})