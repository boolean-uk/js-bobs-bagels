/* 
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

As a member of the public,
So that I can change my order
I'd like to remove an item from my basket

As a member of the public,
So that I can not overfill my small bagel basket
I'd like to know when my basket is full when I try adding an item beyond my basket capacity.

As a Bob's Bagels manager,
So that I can record more sales
I’d like to create baskets with larger capacity when I need to.

As a member of the public
So that I can maintain my sanity
I'd like to know if I try to remove an item that doesn't exist in my basket. 

As a member of the public,
So that I can know how much my bagels are,
I’d like to see the price of each item before I add it to my basket.

As a member of the public
So that I can buy many of my favorite bagel
I'd like to be able to add the same type of bagel to my basket more than once

As a member of the public,
So that I can prepare to pay
When I go to checkout I'd like to know the total sum of the bagels in my basket

DOMAIN MODEL
bagel = {sku: string, price: string, name: string, variant: string, fillings: [string]}

basket CLASS
PROPERTIES
- basket: array [empty]
- limit: number

METHODS
addBagel(sku) -> adds bagel into basket
  INPUT: SKU of bagel

removeBagel(bagel SKU) -> removes bagel from basket
  INPUT: SKU of bagel

increaseBasketLimit(limitIncrease) -> increase the limit of the basket
  INPUT: amount you want to increase the basket by

bagelPrice(sku) -> view the price of a bagel
  INPUT: SKU of bagel
  OUTPUT: price of the bagel

total() -> view total price of items in the basket
  OUTPUT: number for sum of basket

*/

const { basket } = require('../src/basket.js')

// Create a new instance of basket
let myBasket
beforeEach(() => {
  myBasket = new basket()
})

describe('Basket', function () {
  it('should add a bagel to the basket', function () {
    myBasket.addBagel('BGLO')
    expect(myBasket.basket.length).toEqual(1)
  })

  it('should add multiple of same type of bagel', function () {
    myBasket.addBagel('BGLO')
    myBasket.addBagel('BGLO')
    expect(myBasket.basket.length).toEqual(2)
  })

  it('should remove a bagel from the basket', function () {
    myBasket.addBagel('BGLO')
    myBasket.addBagel('BGLE')
    myBasket.removeBagel('BGLO')
    expect(myBasket.basket.length).toEqual(1)
  })

  it('should inform user that basket limit has been reached', function () {
    myBasket.addBagel('BGLO')
    myBasket.addBagel('BGLP')
    myBasket.addBagel('BGLE')
    myBasket.addBagel('BGLS')
    myBasket.addBagel('COF')
    expect(myBasket.addBagel('BGSE')).toEqual('Basket limit reached.')
  })

  it('should be able to change basket limit', function () {
    myBasket.increaseBasketLimit(3)
    expect(myBasket.limit).toEqual(7)
  })

  it('should be able to find bagel price', function () {
    myBasket.addBagel('BGLO')
    expect(myBasket.bagelPrice('BGLO')).toEqual('0.49')
  })

  it('should let user know the item is not in the basket', function () {
    expect(myBasket.removeBagel('BGLO')).toEqual('This is not in your basket.')
  })

  it('should be able to calculate the total of the basket', function () {
    myBasket.addBagel('BGLP')
    myBasket.addBagel('BGLE')
    myBasket.addBagel('COF')
    expect(myBasket.total()).toEqual('1.87')
  })
})
