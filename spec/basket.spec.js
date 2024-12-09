import Basket, { Order } from '../src/basket.js'

describe('Basket', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  it('should exist', () => {
    expect(basket).toBeInstanceOf(Basket)
  })

  it('should add an order', () => {
    expect(basket.add('plain bagel')).toEqual([new Order(1, 'plain bagel', 0.25, 1)])
    expect(basket.add('blueberry bagel')).toEqual([
      new Order(1, 'plain bagel', 0.25, 1),
      new Order(2, 'blueberry bagel', 0.3, 1)
    ])

    expect(() => basket.add(1)).toThrowError('order not string provided')
    expect(() => basket.add('water')).toThrowError('item not found')
  })

  it('should remove an order', () => {
    basket.add('plain bagel')
    basket.add('blueberry bagel')

    expect(basket.remove(1)).toEqual([new Order(2, 'blueberry bagel', 0.3, 1)])
    expect(basket.remove(2)).toEqual([])
    expect(basket.add('garlic bagel')).toEqual([new Order(3, 'garlic bagel', 0.35, 1)])

    expect(() => basket.remove(4)).toThrowError('order not found')
  })

  it('should have an default maximum capacity', () => {
    basket.add('plain bagel', 10)

    expect(() => basket.add('plain bagel', 1)).toThrowError('The basket is full')
  })

  it('should have an dynamic maximum capacity', () => {
    basket.maxCapacity = 5

    basket.add('plain bagel')
    basket.add('blueberry bagel')
    basket.add('garlic bagel')
    basket.add('sesame bagel')
    basket.add('oat bagel')
    expect(() => basket.add('chocolate bagel')).toThrowError('The basket is full')
  })

  it("should show the item's price", () => {
    expect(basket.checkPrice('plain bagel')).toBe(0.25)
  })

  it('should show the total price of the basket', () => {
    basket.add('plain bagel')
    basket.add('plain bagel')
    basket.add('blueberry bagel')
    basket.add('garlic bagel')
    basket.add('asiago bagel')

    expect(basket.totalPrice()).toBe(1.65)
  })

  it('should print receipt', () => {
    basket.maxCapacity = 20
    basket.add('plain bagel', 16)
    basket.add('asiago bagel', 4)

    expect(basket.getReceipt()).toBe('Plain Bagel 16 £4 | Asiago Bagel 4 £2 | Total £6')
  })
})
