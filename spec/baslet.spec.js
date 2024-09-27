const Basket = require('../src/basket')

describe('Basket', () => {
  describe('addItem', () => {
    let basket
    beforeEach(() => {
      basket = new Basket(5)
    })

    it('should update the quantity and price if item already in the basket', () => {
      let result = basket.addItem('BGLP', 1)
      result = basket.addItem('BGLP', 1)
      expect(basket).toBeInstanceOf(Basket)
      expect(result).toEqual([
        {
          sku: 'BGLP',
          price: '0.78',
          name: 'Bagel',
          variant: 'Plain',
          quantity: 2
        }
      ])
    })

    it('should return the selected item if in the inventory', () => {
      const result = basket.addItem('BGLP', 1)

      expect(basket).toBeInstanceOf(Basket)
      expect(basket.items.length).toEqual(1)
      expect(result).toEqual([
        {
          sku: 'BGLP',
          price: '0.39',
          name: 'Bagel',
          variant: 'Plain',
          quantity: 1
        }
      ])
    })

    it("should return 'not in stock' if the item is not in the inventory", () => {
      const result = basket.addItem('B', 1)
      expect(basket).toBeInstanceOf(Basket)
      expect(result).toEqual('not in stock')
    })
  })

  describe('isFull', () => {
    let basket
    beforeEach(() => {
      basket = new Basket(5)
    })
    it('should return true if the basket is full', () => {
      basket.capacity = 1
      basket.items = [
        {
          sku: 'BGLP',
          price: '0.39',
          name: 'Bagel',
          variant: 'Plain',
          quantity: 1
        }
      ]
      expect(basket.isFull(1)).toBe(true)
    })
  })

  describe('searchItem', () => {
    let basket
    beforeEach(() => {
      basket = new Basket(5)
    })
    it('should return the selected item', () => {
      let result = basket.addItem('BGLP', 1)
      result = basket.searchItem('BGLP')
      expect(basket).toBeInstanceOf(Basket)
      expect(result).toEqual({
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain',
        quantity: 1
      })
    })
    it("should return 'item not found' if not in the basket", () => {
      const result = basket.searchItem('BGLP')
      expect(basket).toBeInstanceOf(Basket)
      expect(result).toEqual('item not found')
    })
  })

  describe('calculateTotalPrice', () => {
    let basket
    beforeEach(() => {
      basket = new Basket(5)
    })
    it('should return the correct ammount as a string', () => {
      basket.addItem('BGLP', 1)
      basket.addItem('BGLP', 1)
      const result = basket.calculateTotalPrice()

      expect(basket).toBeInstanceOf(Basket)
      expect(result).toBe('0.78')
    })

    it('should not return the ammount as a number', () => {
      basket.addItem('BGLP', 1)
      basket.addItem('BGLP', 1)
      const result = basket.calculateTotalPrice()

      expect(basket).toBeInstanceOf(Basket)
      expect(result).not.toBe(0.78)
    })

    it('should return the ammount with only 2 decimals', () => {
      basket.addItem('BGLP', 1)
      basket.addItem('BGLP', 1)
      const result = basket.calculateTotalPrice()

      expect(basket).toBeInstanceOf(Basket)
      expect(result).not.toBe('0.780')
    })
  })

  describe('removeItem', () => {
    let basket
    beforeEach(() => {
      basket = new Basket(5)
    })

    it('should remove only the selected item quantity', () => {
      basket.addItem('BGLP', 2)
      const result = basket.removeItem('BGLP', 1)
      expect(basket).toBeInstanceOf(Basket)
      expect(result).toEqual([
        {
          sku: 'BGLP',
          price: '0.39',
          name: 'Bagel',
          variant: 'Plain',
          quantity: 1
        }
      ])
    })

    it('should remove the item if the quantity will be 0', () => {
      basket.addItem('BGLP', 2)
      const result = basket.removeItem('BGLP', 2)
      expect(basket).toBeInstanceOf(Basket)
      expect(result).toEqual([])
    })
  })

  describe('calculateDiscount', () => {
    let basket
    beforeEach(() => {
      basket = new Basket(15)
    })
    it('sould return 2.49 if there are 6 BGLO', () => {
      basket.addItem('BGLO', 14)
      const result = basket.calculateDiscount()
      expect(basket).toBeInstanceOf(Basket)
      expect(result).toEqual([
        {
          sku: 'BGLO',
          price: '5.96',
          name: 'Bagel',
          variant: 'Onion',
          quantity: 14
        }
      ])
    })
    it('sould return 2.49 if there are 6 BGLP', () => {
      basket.addItem('BGLP', 14)
      const result = basket.calculateDiscount()
      expect(basket).toBeInstanceOf(Basket)
      expect(result).toEqual([
        {
          sku: 'BGLP',
          price: '4.77',
          name: 'Bagel',
          variant: 'Plain',
          quantity: 14
        }
      ])
    })
    it('sould return 1.98 if there are two COF', () => {
      basket.addItem('COF', 2)
      const result = basket.calculateDiscount()
      expect(basket).toBeInstanceOf(Basket)
      expect(result).toEqual([
        {
          sku: 'COF',
          price: '1.98',
          name: 'Bagel',
          variant: '',
          quantity: 2
        }
      ])
    })
    it('should apply the discount for two COF and one BGLP', () => {
      basket.addItem('COF', 2)
      basket.addItem('BGLP', 13)
      const result = basket.calculateDiscount()
      expect(basket).toBeInstanceOf(Basket)
      expect(result).toEqual([
        {
          sku: 'COF',
          price: '2.24',
          name: 'Bagel',
          variant: '',
          quantity: 2
        },
        {
          sku: 'BGLP',
          price: '4.38',
          name: 'Bagel',
          variant: 'Plain',
          quantity: 13
        }
      ])
    })

    it('should apply the discount for one COF and one BGLP', () => {
      basket.addItem('COF', 1)
      basket.addItem('BGLP', 1)
      const result = basket.calculateDiscount()
      expect(basket).toBeInstanceOf(Basket)
      expect(result).toEqual([
        {
          sku: 'COF',
          price: '1.25',
          name: 'Bagel',
          variant: '',
          quantity: 1
        },
        {
          sku: 'BGLP',
          price: '0.00',
          name: 'Bagel',
          variant: 'Plain',
          quantity: 1
        }
      ])
    })
  })
})
