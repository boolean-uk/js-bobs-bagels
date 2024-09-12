const Receipt = require("../src/receipt.js")

const exampleBasket = [
    { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' },
    { sku: 'BGLS', price: '0.49', name: 'Bagel', variant: 'Sesame' },
    { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' },
    { sku: 'BGLS', price: '0.49', name: 'Bagel', variant: 'Sesame' },
    { sku: 'BGLE', price: '0.49', name: 'Bagel', variant: 'Everything' },
    { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' }
  ]

describe("Receipt", () => {
  let receipt

  beforeEach(() => {
    receipt = new Receipt(exampleBasket)
  })

  
  it("new basket is empty array", () => {
    // const expected = ["bagel 1", "bagel 2"]
    expect(receipt.items).toEqual(exampleBasket)
  })

//   it("new basket is empty array", () => {
//     // const expected = ["bagel 1", "bagel 2"]
//     expect(receipt.print(10)).toEqual(`
//     ~~~ Bob's Bagels ~~~

//    ${Date().substring(3,24)}

// ----------------------------

// Onion Bagel         3       £1.47
// Everything Bagel    1       £0.49
// Sesame Bagel        2       £0.98

// ----------------------------


//        Thank you
//      for your order!

// `)
//   })

})