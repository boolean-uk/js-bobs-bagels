const { Bagel } = require('../src/models/bagel')
const { Basket } = require('../src/models/basket')

describe('constructor', () => {
  it('should throw for non positive capacity', function () {
    expect(() => new Basket(0)).toThrow()
    expect(() => new Basket(-1)).toThrow()
  })

  it('should create instance for positive capacity', function () {
    let defaultBasket, basket

    expect(() => (defaultBasket = new Basket())).not.toThrow()
    expect(() => (basket = new Basket(20))).not.toThrow()

    expect(defaultBasket.capacity).toEqual(10)
    expect(defaultBasket.bagels).toEqual([])
    expect(basket.capacity).toEqual(20)
    expect(basket.bagels).toEqual([])
  })
})

describe('addBagel', () => {
  let basket, bagel

  beforeAll(() => {
    bagel = new Bagel('test', 1)
  })

  beforeEach(() => {
    basket = new Basket(1)
  })

  it('should add bagel', function () {
    expect(() => basket.addBagel(bagel)).not.toThrow()
    expect(basket.bagels.length).toEqual(1)
    expect(basket.bagels[0]).toEqual(bagel)
  })

  it('should not add bagel if basket is full', function () {
    expect(() => basket.addBagel(bagel)).not.toThrow()
    expect(() => basket.addBagel(bagel)).toThrow()
  })
})

describe('removeBagel', () => {
  let basket, bagel

  beforeAll(() => {
    bagel = new Bagel('test', 1)
  })

  beforeEach(() => {
    basket = new Basket()
  })

  it('should remove bagel', () => {
    basket.addBagel(bagel)
    expect(() => basket.removeBagel(bagel.uuid)).not.toThrow()
    expect(basket.bagels).toEqual([])
  })

  it('should throw when trying to remove more bagels than present in basket', () => {
    expect(() => basket.removeBagel(new Bagel('test', 2).uuid)).toThrow()
    expect(() => basket.removeBagel(bagel.uuid)).toThrow()
  })
})

describe('bagelAmount', () => {
  let basket, bagel

  beforeAll(() => {
    bagel = new Bagel('test', 1)
  })

  beforeEach(() => {
    basket = new Basket()
  })

  it('should correctly calculate amount of bagels in basket', () => {
    expect(basket.bagelAmount()).toEqual(0)
    basket.addBagel(bagel)
    expect(basket.bagelAmount()).toEqual(1)
    basket.addBagel(new Bagel('test', 2))
    expect(basket.bagelAmount()).toEqual(2)
  })
})

describe('totalCost', () => {
  let basket, bagel

  beforeAll(() => {
    bagel = new Bagel('test', 1.25)
  })

  beforeEach(() => {
    basket = new Basket()
  })

  it('should correctly calculate price', () => {
    expect(new Basket().totalCost()).toEqual(0)
    basket.addBagel(new Bagel('test', 1.25))
    expect(basket.totalCost()).toEqual(1.25)
    basket.addBagel(new Bagel('test', 3.2))
    expect(basket.totalCost()).toEqual(1.25 + 3.2)
  })
})
