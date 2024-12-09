import Basket from '../src/basket.js'

const mockInventory = [
  {
    sku: 'AAAA',
    price: '5',
    name: 'Donut',
    variant: 'Sesame'
  },
  {
    sku: 'BBBB',
    price: '10',
    name: 'Lettuce',
    variant: ''
  },
  {
    sku: 'CCCC',
    price: '15',
    name: 'Tomato',
    variant: ''
  }
]

const mockInventoryCopy = JSON.parse(JSON.stringify(mockInventory))
const mockBasketList = mockInventoryCopy.map((item) => {
  item.quantity = 1
  return item
})

describe('Basket', () => {
  describe('add bagel to basket', () => {
    const basket = new Basket()

    beforeEach(() => {
      basket._list = []
      basket._inventory = JSON.parse(JSON.stringify(mockInventory))
      basket.capacity = 12
    })

    it('add items to basket', () => {
      const result1 = basket.add('AAAA')
      const result2 = basket.add('CCCC')

      expect(basket._list).toEqual([mockBasketList[0], mockBasketList[2]])

      expect(result1).toEqual('item added')
      expect(result2).toEqual('item added')
    })

    it('return "item not found" when invalid sku given', () => {
      const result = basket.add('not a real sku')

      expect(result).toEqual('item sku not found')
    })

    it('return "item sku required" if no sku input', () => {
      const result1 = basket.add()
      const result2 = basket.add('')

      expect(result1).toEqual('item sku required')
      expect(result2).toEqual('item sku required')
    })

    it('increase item quantity if item already in basket', () => {
      basket.add('BBBB')
      const result = basket.add('BBBB')

      expect(result).toBe('item quantity increased')
      expect(basket._list[0].quantity).toEqual(2)
    })

    it('return "basket is full" if basket full', () => {
      basket.add('AAAA')
      basket.setBasketCapacity(1)
      const result = basket.add('BBBB')

      expect(result).toBe('basket full')
    })
  })

  describe('find item in inventory', () => {
    const basket = new Basket()

    beforeEach(() => {
      basket._inventory = JSON.parse(JSON.stringify(mockInventory))
    })

    it('find items in inventory', () => {
      const result = basket.findInventoryItem('AAAA')

      expect(result.sku).toEqual('AAAA')
      expect(result.price).toEqual('5')
      expect(result.name).toEqual('Donut')
      expect(result.variant).toEqual('Sesame')
    })

    it('sku not found in inventory', () => {
      const result = basket.findInventoryItem('DDDD')

      expect(result).toEqual('item not found')
    })
  })

  describe('find item in basket', () => {
    const basket = new Basket()

    beforeEach(() => {
      basket._list = mockBasketList.slice(1)
      basket._inventory = JSON.parse(JSON.stringify(mockInventory))
    })

    it('return item if valid sku', () => {
      const result = basket.findBasketItem('BBBB')

      expect(result).toEqual(mockBasketList[1])
    })

    it('return "item not found" if sku not found', () => {
      const result = basket.findBasketItem('AAAA')

      expect(result).toBe('item not found')
    })

    it('return "invalid" sku when sku does not exist in inventory', () => {
      const result = basket.findBasketItem('ZZZZ')

      expect(result).toBe('item is not stocked')
    })
  })

  describe('remove item from basket', () => {
    const basket = new Basket()

    beforeEach(() => {
      basket._inventory = JSON.parse(JSON.stringify(mockInventory))
    })

    it('remove item with valid sku', () => {
      basket._list = JSON.parse(JSON.stringify(mockBasketList))

      const result = basket.remove('BBBB')

      expect(result).toBe('item removed')
      expect(basket.list).toEqual([mockBasketList[0], mockBasketList[2]])
    })

    it('return "item not found" if sku not found in basket', () => {
      basket._list = mockBasketList.slice(0, 2)

      const result = basket.remove('CCCC')

      expect(result).toBe('item not found')
    })

    it('return "invalid sku" when sku does not exist in inventory', () => {
      basket._list = JSON.parse(JSON.stringify(mockBasketList))
      const result = basket.remove('ZZZZ')

      expect(result).toBe('item is not stocked')
    })

    it('return "item sku required" if no sku input', () => {
      const result1 = basket.remove()
      const result2 = basket.remove('')

      expect(result1).toBe('item sku required')
      expect(result2).toBe('item sku required')
    })
  })

  describe('check basket total item quantity', () => {
    const basket = new Basket()

    it('return number of items in basket', () => {
      basket._list = JSON.parse(JSON.stringify(mockBasketList))
      basket._list[1].quantity = 3
      basket._list[2].quantity = 6

      const result = basket.checkBasketQuantity()

      expect(result).toBe(10)
    })

    it('return "basket misconfigured" if basketList is not Array', () => {
      const inputs = ['', 1, {}]

      inputs.forEach((input) => {
        basket._list = input
        const result = basket.checkBasketQuantity()

        expect(result).toBe('misconfigured basket')
      })
    })
  })

  describe('set basket capacity', () => {
    const basket = new Basket()

    it('set basket capacity to input', () => {
      const result = basket.setBasketCapacity(20)

      expect(result).toBe(20)
      expect(basket.capacity).toBe(20)
    })

    it('return "please enter positive integer value" if not positive integer value given ', () => {
      const inputs = ['10', 3.5, 0, -5, [1], { 1: 1 }]

      inputs.forEach((input) => {
        const result = basket.setBasketCapacity(input)
        expect(result).toBe('please enter positive integer value')
      })
    })
  })

  describe('display item price', () => {
    const basket = new Basket()

    beforeEach(() => {
      basket._inventory = JSON.parse(JSON.stringify(mockInventory))
    })

    it('return item price with valid sku', () => {
      const result = basket.displayItemPrice('CCCC')

      expect(result).toBe(15)
    })

    it('return "item not found" if sku not found', () => {
      const result = basket.displayItemPrice('ZZZZ')

      expect(result).toBe('item not found')
    })

    it('return "sku required" when no sku input', () => {
      const inputs = ['', undefined, null, [], {}]

      inputs.forEach((input) => {
        const result = basket.displayItemPrice(input)

        expect(result).toBe('sku required')
      })
    })
  })

  describe('display basket sum', () => {
    const basket = new Basket()

    beforeEach(() => {
      basket._list = JSON.parse(JSON.stringify(mockBasketList))
    })

    it('return sum of items in basket list', () => {
      const result = basket.displayBasketSum()

      expect(result).toBe(30)
    })

    it('return 0 if no items in basket', () => {
      basket._list = []

      const result = basket.displayBasketSum()

      expect(result).toBe(0)
    })
  })
})
