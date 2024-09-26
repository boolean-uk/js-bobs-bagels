const Basket = require('../src/basket.js')

describe('basket', () => {
  describe('createBagel', () => {
    // Happy Path
    it('A bagel that is ordered', () => {
      // Given
      const bagel = 'Everything Bagel'

      // When
      const newBasket = new Basket()

      // Then
      expect(newBasket.createBagel(bagel)).toEqual({
        id: 1,
        price: 4.99,
        name: bagel
      })
    })

    // First Unhappy Path
    it('You have reached your Limit', () => {
      const newBasket = new Basket()
      newBasket.createBagel('Everything Bagel')
      newBasket.createBagel('Plain Bagel')
      newBasket.createBagel('Bagel Sandwich')
      newBasket.createBagel('Bagel Bagel')
      newBasket.createBagel('Sesame Bagel')
      newBasket.createBagel('Poppy Bagel')
      expect(newBasket.createBagel('Garlic Bagel')).toEqual(
        'You have reached your limit'
      )
    })

    // Second Unhappy Path
    it('The bagel does not exist on the menu', () => {
      // Given
      const bagel = 'Fake Bagel'

      // When
      const newBasket = new Basket()

      // Then
      expect(newBasket.createBagel(bagel)).toEqual(
        'The bagel does not exist on the menu'
      )
    })
  })
  describe('basketSize', () => {
    it('Manager can define basketSize to be 10', () => {
      const newBasket = new Basket(10)
      expect(newBasket.basketSize).toEqual(10)
    })
    it('BasketSize default is 6', () => {
      const newBasket = new Basket()
      expect(newBasket.basketSize).toEqual(6)
    })
  })
  describe('getBasket', () => {
    it('Get the basket (array) with items (objects)', () => {
      // When
      const newBasket = new Basket()
      newBasket.createBagel('Everything Bagel')
      newBasket.createBagel('Plain Bagel')

      // Then
      expect(newBasket.getBasket()).toEqual([
        {
          id: 1,
          price: 4.99,
          name: 'Everything Bagel'
        },
        {
          id: 2,
          price: 0.49,
          name: 'Plain Bagel'
        }
      ])
    })
  })
  describe('deleteBagel', () => {
    // Happy Path
    it('A bagel that is deleted', () => {
      // Given
      const bagel = 'Bagel Bagel'

      // When
      const newBasket = new Basket()
      newBasket.createBagel('Everything Bagel')
      newBasket.createBagel('Bagel Bagel')
      newBasket.createBagel('Bagel Bagel')
      newBasket.createBagel('Bagel Bagel')
      newBasket.createBagel('Plain Bagel')

      // Then
      expect(newBasket.deleteBagel(bagel)).toEqual('Bagel deleted')
    })

    // Unhappy Path
    it('If an item does not exist return error', () => {
      // Given
      const bagel = 'Fake Bagel'

      // When
      const newBasket = new Basket()
      newBasket.createBagel('Everything Bagel')
      newBasket.createBagel('Bagel Bagel')
      newBasket.createBagel('Bagel Bagel')
      newBasket.createBagel('Bagel Bagel')
      newBasket.createBagel('Plain Bagel')

      // Then
      expect(newBasket.deleteBagel(bagel)).toEqual(
        'Item doesn`t exist in the basket'
      )
    })
  })
  describe('bagelPrice', () => {
    // Happy path
    it('Loop through the menu and return the price of a searched bagel', () => {
      // Given
      const bagelName = 'Bagel Bagel'

      // When
      const newBasket = new Basket()

      // Then
      expect(newBasket.bagelPrice(bagelName)).toEqual(20.99)
    })

    // Unhappy path
    it('Will return an error message if the bagel is not included on the menu', () => {
      // Given
      const bagelName = 'Fake bagel'
      // When
      const newBasket = new Basket()

      // Then
      expect(newBasket.bagelPrice(bagelName)).toEqual(
        'The bagel does not exist on the menu.'
      )
    })
  })

  describe('totalPrice', () => {
    it('Iterate through the basket of bagels and return the total price', () => {
      // When
      const newBasket = new Basket()
      newBasket.createBagel('Everything Bagel')
      newBasket.createBagel('Bagel Bagel')
      newBasket.createBagel('Garlic Bagel')

      // Then
      expect(newBasket.totalPrice()).toEqual(28.97)
    })
  })
})
