const { Basket } = require('../src/basket')
const { generateReceipt } = require('../src/extension2')

describe('Generate receipt', () => {
  it('should return receipt', () => {
    // Set up
    const basket = new Basket(50)
    const item = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const item2 = {
      sku: 'BGLP',
      price: '0.39',
      name: 'Bagel',
      variant: 'Plain'
    }

    const item3 = {
      sku: 'BGLE',
      price: '0.49',
      name: 'Bagel',
      variant: 'Everything'
    }

    const item4 = {
      sku: 'COF',
      price: '0.99',
      name: 'Coffee',
      variant: ''
    }
    basket.add(item, 2)
    basket.add(item2, 12)
    basket.add(item3, 6)
    basket.add(item4, 3)
    const result = generateReceipt(basket)
    console.log(result)
    const expectedResult = `
    ~~~ Bob's Bagels ~~~

    2023-07-20  16:28:40

----------------------------

Onion Bagel         2   £0.98
Plain Bagel         12  £4.68
Everything Bagel    6   £2.94
Coffee              3   £2.97


----------------------------
Total                   £10.43

        Thank you
      for your order!`
    // Test
    expect(result.trim).toEqual(expectedResult.trim)
  })
})
