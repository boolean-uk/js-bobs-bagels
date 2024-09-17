const { Basket } = require('../src/basket.js')

describe('Basket', () => {
  let b

  beforeEach(() => {
    b = new Basket()
  })

  //   PART 1
  describe('Add Bagel To Basket', () => {
    it('added bagel must be returned as an object', () => {
      const exampleBagel = {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion',
        quantity: 1
      }
      const result = b.addBagel('BGLO')
      expect(result).toEqual(exampleBagel)
    })

    it('bagel being added does not exist in bagel inventory, check bagel sku', () => {
      const result = b.addBagel()
      expect(result).toEqual('bagel does not exist in our bakery')
    })

    it('adds selected bagel to user basket', () => {
      const exampleBasket = [
        {
          sku: 'BGLO',
          price: '0.49',
          name: 'Bagel',
          variant: 'Onion',
          quantity: 1
        }
      ]
      b.addBagel('BGLO')
      const result = b.getBasket()
      expect(result).toEqual(exampleBasket)
    })
  })

  describe('Remove Bagel From Basket', () => {
    it('removes selected bagel from basket', () => {
      const exampleBasket = [
        {
          sku: 'BGLP',
          price: '0.39',
          name: 'Bagel',
          variant: 'Plain',
          quantity: 1
        },
        {
          sku: 'BGLE',
          price: '0.49',
          name: 'Bagel',
          variant: 'Everything',
          quantity: 1
        }
      ]
      b.addBagel('BGLO')
      b.addBagel('BGLP')
      b.addBagel('BGLE')
      b.removeBagel('BGLO')
      const result = b.getBasket()
      expect(result).toEqual(exampleBasket)
    })

    it('bagel being removed does not exist, check bagel sku', () => {
      const result = b.removeBagel()
      expect(result).toEqual('bagel does not exist in basket')
    })
  })

  //   PART 2
  describe('Check When Basket Is Full', () => {
    it('when adding a bagel, user should be notified if basket is full', () => {
      b.addBagel('BGLO')
      b.addBagel('BGLP')
      b.addBagel('BGLP')
      b.addBagel('BGLP')
      b.addBagel('BGLP')
      b.addBagel('BGLE')
      const result = b.addBagel('BGLS')
      expect(result).toEqual('basket is full of bagels!')
    })
  })

  describe('Increase Basket Capacity', () => {
    it('bagel basket capacity can be increased as required', () => {
      b.largerBasket(10)
      const newMaxCapacity = 10
      const result = b.maxCapacity
      expect(result).toEqual(newMaxCapacity)
    })

    it('should return message to confirm the basket capacity increased', () => {
      const confirmationMessage = 'basket capacity is now 10'
      const result = b.largerBasket(10)
      expect(result).toEqual(confirmationMessage)
    })

    it('should return error message if a valid number is not entered', () => {
      const errorMessage = 'enter a valid number to increase basket capacity'
      const result = b.largerBasket()
      expect(result).toEqual(errorMessage)
    })
  })

  //   PART 3
  describe('Check Bagel Price', () => {
    it('should return price of selected bagel', () => {
      const confirmationMessage = 'the price of the Onion Bagel is £0.49'
      const result = b.checkPrice('BGLO')
      expect(result).toEqual(confirmationMessage)
    })

    it('should return error message if bagel cannot be found', () => {
      const errorMessage = 'bagel does not exist'
      const result = b.checkPrice()
      expect(result).toEqual(errorMessage)
    })
  })

  describe('Increase Bagel Quantity', () => {
    it('adding multiple of the same bagel increases the quantity', () => {
      const exampleBasket = [
        {
          sku: 'BGLO',
          price: '0.49',
          name: 'Bagel',
          variant: 'Onion',
          quantity: 3
        },
        {
          sku: 'BGLP',
          price: '0.39',
          name: 'Bagel',
          variant: 'Plain',
          quantity: 1
        }
      ]
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLP')
      const result = b.getBasket()
      expect(result).toEqual(exampleBasket)
    })
  })

  describe('Calc Basket Total', () => {
    it('should return total of all bagels in basket', () => {
      const basketTotal = 'the price of your basket is £1.86'
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLP')
      b.basketHasSpecialOffers()
      const result = b.calcBasketVal()
      expect(result).toEqual(basketTotal)
    })

    it('return message if there are no bagels in basket', () => {
      const message = 'there are no bagels in your basket'
      b.basketHasSpecialOffers()
      const result = b.calcBasketVal()
      expect(result).toEqual(message)
    })
  })

  // EXTENSION 1
  describe('Onion Bagel Special Offer', () => {
    it('6 Onion Bagels should cost £2.49', () => {
      const BGLOx6Price = 'the price of your basket is £2.49' // DISCOUNT ON 6X BGLO
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.basketHasSpecialOffers()
      const result = b.calcBasketVal()
      expect(result).toEqual(BGLOx6Price)
    })

    it('10 Onion Bagel should cost £4.45', () => {
      const BGLOx10Price = 'the price of your basket is £4.45' // DISCOUNT ON 6X BGLO AND 4X BGLO @ 0.49 EACH
      b.largerBasket(10)
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.basketHasSpecialOffers()
      const result = b.calcBasketVal()
      expect(result).toEqual(BGLOx10Price)
    })

    it('12 Onion Bagel should cost £4.45', () => {
      const BGLOx12Price = 'the price of your basket is £4.98' // DISCOUNT ON 2 LOTS OF 6X BGLO
      b.largerBasket(12)
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.addBagel('BGLO')
      b.basketHasSpecialOffers()
      const result = b.calcBasketVal()
      expect(result).toEqual(BGLOx12Price)
    })
  })
})
