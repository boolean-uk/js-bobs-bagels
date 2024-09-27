import { inventory } from '../inventory.js'
import Basket from '../src/basket.js'

describe('Bobs bagels basket', () => {
  describe('/ adding basket items', () => {
    const basket = new Basket()
    beforeEach(() => {
      basket.basketList = []
      basket.inventory = [
        {
          sku: 'a1a1',
          price: '1.25',
          name: 'Item1',
          variant: 'None',
          quantity: 1
        },
        {
          sku: 'b2b2',
          price: '6.55',
          name: 'Item2',
          variant: 'None',
          quantity: 1
        },
        {
          sku: 'c3c3',
          price: '8.50',
          name: 'Item3',
          variant: 'None',
          quantity: 1
        }
      ]
    })
    it(' / adding a valid sku', () => {
      const result =
        {
          sku: 'a1a1',
          price: '1.25',
          name: 'Item1',
          variant: 'None',
          quantity: 1
        }
      basket.addItem('a1a1')
      expect(basket.basketList[0]).toEqual(result)
    })
    it('/ if sku is invalid', () => {
      const newItem = basket.addItem('XXXX')
      expect(newItem).toEqual('item not found')
    })
    it('/ no sku added', () => {
      const newItem = basket.addItem('')
      expect(newItem).toEqual('sku required!')
    })
    it('/ if sku is not a string', () => {
      const notASku = basket.addItem(1234)
      expect(notASku).toEqual('sku required!')
    })
    it('/ adding item of same sku returns quantity + 1', () => {
      basket.basketList = [
        {
          sku: 'a1a1',
          price: '1.25',
          name: 'Item1',
          variant: 'None',
          quantity: 1
        }
      ]
      basket.addItem('a1a1')
      const result = basket.basketList[0].quantity
      expect(result).toEqual(2)
    })
  })
  describe('/ remove items from basket', () => {
    const basket = new Basket()
    beforeEach(() => {
      basket.basketList = [
        {
          sku: '1111',
          price: '0.55',
          name: 'Fork',
          variant: 'Silverware',
          quantity: 1
        },
        {
          sku: '2222',
          price: '0.89',
          name: 'Knife',
          variant: 'Silverware',
          quantity: 1
        },
        {
          sku: '3333',
          price: '1.52',
          name: 'Napkin',
          variant: 'Cotton',
          quantity: 1
        }
      ]
    })
    it('/ if sku is valid and in basket', () => {
      const newBasket = [
        {
          sku: '1111',
          price: '0.55',
          name: 'Fork',
          variant: 'Silverware',
          quantity: 1
        },
        {
          sku: '3333',
          price: '1.52',
          name: 'Napkin',
          variant: 'Cotton',
          quantity: 1
        }
      ]
      basket.removeItem('2222')
      expect(basket.basketList[0].name).toEqual('Fork')
      expect(basket.basketList).toEqual(newBasket)
    })
    it('/ if sku is valid but not in basket', () => {
      const result = basket.removeItem('4444')
      expect(result).toEqual('item is not in basket')
    })
    it('/ no sku added ', () => {
      const removedItem = basket.removeItem('')
      expect(removedItem).toEqual('sku required!')
    })
    it('/ if parameter is not a string', () => {
      const removingSku = basket.removeItem(1234)
      expect(removingSku).toEqual('sku required!')
    })
  })
  describe(' / Checking for full basket', () => {
    const basket = new Basket()
    beforeEach(() => {
      basket.basketList = [
        {
          sku: '1111',
          price: '0.55',
          name: 'Fork',
          variant: 'Silverware',
          quantity: 6
        },
        {
          sku: '2222',
          price: '0.89',
          name: 'Knife',
          variant: 'Silverware',
          quantity: 4
        },
        {
          sku: '3333',
          price: '1.52',
          name: 'Napkin',
          variant: 'Cotton',
          quantity: 2
        }
      ]
    })
    it('/ if basket quantity exceeds 12 items', () => {
      const itemCheck = basket.checkIfFull()
      const sameBasket = basket.basketList

      expect(itemCheck).toEqual('basket is full')
      expect(basket.basketList).toEqual(sameBasket)
    })
  })
  describe('/ change basket size', () => {
    const basket = new Basket()
    it('/ if changeBasketSize recieves a number, return new basket size', () => {
      basket.basketSize = 12
      basket.changeBasketSize(16)

      expect(basket.basketSize).toEqual(16)
    })
    it('/ if changeBasketSize does not recieve a number', () => {
      const basketSize = basket.basketSize

      const result = basket.changeBasketSize('sixteen')

      expect(result).toEqual('error, set basket size.')
      expect(basket.basketSize).toEqual(basketSize)
    })
  })
  describe('/ finding items in the inventory and if true, display the values of the items', () => {
    const basket = new Basket()
    beforeEach(() => {
      basket.inventory = [
        {
          sku: 'a1a1',
          price: '1.25',
          name: 'Item1',
          variant: 'None',
          quantity: 1
        },
        {
          sku: 'b2b2',
          price: '6.55',
          name: 'Item2',
          variant: 'None',
          quantity: 1
        },
        {
          sku: 'c3c3',
          price: '8.50',
          name: 'Item3',
          variant: 'None',
          quantity: 1
        }
      ]
    })
    it('if item exists in inventory list', () => {
      const result = basket.findItemDetails('b2b2')
      expect(result).toEqual('Name: Item2, Price: £6.55')
    })
    it('/ if item does not exist in inventory list', () => {
      const result = basket.findItemDetails('d4d4')
      expect(result).toBeFalse()
    })
  })
  describe('/ if items in array of basket list. Add all items prices and return total cost', () => {
    const basket = new Basket()
    it('/ if items in basket list ', () => {
      basket.basketList = [
        {
          sku: 'aa11',
          price: '1.25',
          name: 'Item1',
          variant: 'None',
          quantity: 3
        },
        {
          sku: 'bb22',
          price: '6.55',
          name: 'Item2',
          variant: 'None',
          quantity: 1
        },
        {
          sku: 'cc33',
          price: '8.50',
          name: 'Item3',
          variant: 'None',
          quantity: 2
        }
      ]

      const result = basket.totalCost()
      expect(result).toEqual('Total Cost: £27.30')
    })
    it('/ if basket list does not have any items in its array', () => {
      basket.basketList = []
      const result = basket.totalCost()
      expect(result).toEqual('Total Cost: £0.00')
    })
  })
})
