const {Basket} = require("./../src/basket")


describe("class basket", () => {
  it("add a bagel to the basket", () => {
    //step:1 setup
    const basket = new Basket ()
    
    const expected = [
        {sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'}
    ];
    //step:2 execute
    const result = basket.addBagel('BGLO')
    
    //step:3 verify
    expect(expected).toEqual(result)
    console.log(basket.addBagel , result)
  })

  it("add same type of bagel to the basket", () => {
    //step:1 setup
    const basket = new Basket ()
    
    const expected = [
      {sku: 'BGLS',  price: '0.49', name: 'Bagel', variant: 'Sesame'},
      {sku: 'BGLS',  price: '0.49', name: 'Bagel', variant: 'Sesame'}
    ];
    //step:2 execute
    const result = basket.addBagel('BGLS' )
    
    //step:3 verify
    expect(expected.length).toEqual(2)
    console.log(basket.addBagel , result)
  })

  it("remove a bagel from the basket", () => {
    //step:1 setup
    const basket = new Basket ()
    // Basket.basket = ['BGSE']
    
    const expected = [
      {sku: 'BGSE', price: '2.99', name: 'Bagel Sandwich', variant: 'Everything',  fillings: ['Bacon', 'Egg', 'Cheese']
      }
    ];
    //step:2 execute
    // const result = basket.addBagel("Onion", 2)
    basket.addBagel('BGLO')
    basket.addBagel('BGSE')
    const result = basket.removeBagel('BGLO')
    
    //step:3 verify
    
    // expect(expected.length).toEqual(1)
    console.log(basket.removeBagel, result)
    // 
   /// //basket.basket.length should be 1 and then basket.basket array should equal to expected array
    // expect(Basket.basket.length).toEqual(1)
    // Basket.basket= expected
    expect(result).toEqual(expected)
  })

  it("3. reach to max capasity", () => {
    //step:1 setup
    const basket = new Basket ()
    
    const expected = [
        {sku: 'BGLO', price: '0.49', name: 'Bagel',variant: 'Onion'},
        {sku: 'BGLS',  price: '0.49', name: 'Bagel', variant: 'Sesame'},
        {sku: 'BGLS',  price: '0.49', name: 'Bagel', variant: 'Sesame'},
        {sku: 'BGLO', price: '0.49', name: 'Bagel',variant: 'Onion'},
        {sku: 'BGLS',  price: '0.49', name: 'Bagel', variant: 'Sesame'},
    ];
    //step:2 execute
    
    basket.addBagel('BGLO')
    basket.addBagel('BGLS')
    basket.addBagel('BGLS')
    basket.addBagel('BGLO')
    basket.addBagel('BGLS')
    
    //step:3 verify
    expect(basket.addBagel('COF')).toEqual('basket capacity is full')
     console.log("Reach to max capasity" , (basket.addBagel('COF')))
  })

  it("change the capasity of basket", () => {
    //step:1 setup
    const basket = new Basket ()
    //step:2 execute
    const result = basket.newBasketCapacity(5)
    //step:3 verify
    expect(basket.capacity).toEqual(10)
    console.log("new capasity is:", result)
  })

  it("bagel is not in the basket", () => {
    //step:1 setup
    const basket = new Basket ()
    basket.addBagel('BGLO')
    basket.removeBagel('BGLP')
    //step:2 execute
    const result = basket.removeBagel('BGLP')
    const expected = ("this bagel does not exist")
    //step:3 verify
    expect(result).toEqual(expected)
    // console.log("trying to remove:", result)
    console.log("not exist", result)
  })

  it("bagel price", () => {
    //step:1 setup
    const basket = new Basket ()
    basket.addBagel('BGLO')
  
    //step:2 execute
    const result = basket.bagelPrice('BGLO')
    const expected = ("0.49")
    //step:3 verify
    expect(result).toEqual(expected)
    // console.log("trying to remove:", result)
    console.log("bagel price is:", result)
  })

  it("total price", () => {
    //step:1 setup
    const basket = new Basket ()
    basket.addBagel('BGLO')
    basket.addBagel('BGLO')
    basket.addBagel('BGLE')
    //step:2 execute
    const result = basket.totalBasket()
    const expected = ("1.47")
    //step:3 verify
    expect(result).toEqual(expected)
    // console.log("trying to remove:", result)
    console.log("totalBasket is:", result)
  })
})

