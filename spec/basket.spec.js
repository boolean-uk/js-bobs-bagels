const {inventory} = require('../inventory.json')
const {Basket, Item} = require('../src/basket')




    describe( 'Basket',()=>{

        let basket;
        beforeEach( ()=>{
            basket = new Basket()
        })

        describe('Add and an Item', ()=>{


            it('Can have an item added to it and returns true', ()=>{
                //GIVEN
                    const itemObject = inventory[0]
                    const item = new Item(itemObject)

                //WHEN
                const result =  basket.addItemToBasket(item)
                
                //THEN
                expect(result).toBeTrue()
            })
    
            it('returns false if an invalid item is added to the basket', ()=>{
                //GIVEN
                const item = {name: "bagel"}
        
                //WHEN
        
                const result = basket.addItemToBasket(item)
        
                //THEN
                expect(result).toBeFalse
        
            })
        })

        describe('remove or change items in the basket',()=>{
            it('Can change order or remove item', ()=>{
                // GIVEN
                const item1 = new Item(inventory[0]);
                const item2 = new Item(inventory[1]);
                const item3 = new Item(inventory[2]);
            
                basket.addItemToBasket(item1);
                basket.addItemToBasket(item2);
                basket.addItemToBasket(item3);
            
                const orderToBeRemoved = 1;
            
                // WHEN
                const result = basket.removeOrder(orderToBeRemoved);
            
                // THEN
                const remainingItems = [item1, item3];
            
                expect(result).toEqual(remainingItems);
            });


            it('Can change order or remove item', ()=>{
                // GIVEN
                const item1 = new Item(inventory[0]);
                const item2 = new Item(inventory[1]);
                const item3 = new Item(inventory[2]);
            
                basket.addItemToBasket(item1);
                basket.addItemToBasket(item2);
                basket.addItemToBasket(item3);
            
                const orderToBeRemoved = 1;
            
                // WHEN
                const result = basket.removeOrder(orderToBeRemoved);
            
                // THEN
                const remainingItems = [item1, item3];
            
                expect(result).toEqual(remainingItems);
            });
            
        })

        describe('Basket Capacity', ()=>{
            it(' When basket is not overfilled ', ()=>{
                //GIVEN
                const item1 = new Item(inventory[0]);
                const item2 = new Item(inventory[1]);
                const item3 = new Item(inventory[2]);
                const item4 = new Item(inventory[3])
        

                basket.addItemToBasket(item1);
                basket.addItemToBasket(item2);
                basket.addItemToBasket(item3);
                basket.addItemToBasket(item4);
        

                const basketCapacity = 5

                //WHEN
                    const result = basket.checkBasketCapacity(basketCapacity)

                //THEN
                    expect(result).toEqual(true)
            })
        })


        describe('To record more sales', ()=>{

            it('When trying to add an item within basket capacity', () => {
                // GIVEN
                const item2 = new Item(inventory[1]);
                const item1 = new Item(inventory[0]);
        
                basket.increaseCapacity(item1);
            
                const basketCapacity = 3; 
                // WHEN
                
                const result = basket.increaseCapacity(new Item(item2), basketCapacity);
        
                // THEN
                expect(result).toEqual('New item has been added'); 
            });

            
            it('When trying to add an item beyond basket capacity', () => {
                // GIVEN
                const item2 = new Item(inventory[1]);
                const item1 = new Item(inventory[0]);
                const item3 = new Item(inventory[2]);
                const item4 = new Item(inventory[3]);
                const item5 = new Item(inventory[4]);

        
                basket.increaseCapacity(item2);
                basket.increaseCapacity(item1);
                basket.increaseCapacity(item3);
                basket.increaseCapacity(item4);

        
                const basketCapacity = 3; 
                // WHEN
                
                const result = basket.increaseCapacity(new Item(item5), basketCapacity);
        
                // THEN
                expect(result).toEqual('Capacity has been increase and a new item has been added'); // Basket should be full
            });
        });
    
    
        describe('Determine when Item doesnt exist', () => {

            it('when removing an item that doesnt exist', () => {
               
              //GIVEN  
              const item1 = new Item(inventory[0]);
              const item2 = new Item(inventory[1]);
              const item3 = new Item(inventory[2]);
              
              basket.addItemToBasket(item1)
              basket.addItemToBasket(item2)
              basket.addItemToBasket(item3)
              
              //WHEN
              const removingItem = {
                "item": "Juice",
                "amount": "10",
                "name": "orange juice",
              }
              const result = basket.itemNotExisting(removingItem)

              //THEN
              expect(result).toEqual("Item doesn't exist")
            })

            

            it(' when removing an item  exist', () => {
               
                //GIVEN  
                const item1 = new Item(inventory[0]);
                const item2 = new Item(inventory[1]);
                const item3 = new Item(inventory[2]);
                const item4 = new Item(inventory[3]);
                
                basket.addItemToBasket(item1)
                basket.addItemToBasket(item2)
                basket.addItemToBasket(item3)
                basket.addItemToBasket(item4)

                
                //WHEN
                
                const result = basket.itemNotExisting(item4)
  
                //THEN
                expect(result).toEqual( "Item has been removed")
              })
        })
        
        describe('Display the price of an item before adding it to the basket', ()=>{


            it('show item price',()=>{
                //GIVEN
                const item1 = new Item(inventory[0]);
                const item2 = new Item(inventory[1]);
                const item3 = new Item(inventory[2]);
        
                basket.addItemToBasket(item1);
                basket.addItemToBasket(item2);
                basket.addItemToBasket(item3);
                
                //WHEN

                const price1 =  basket.displayPrice(item1) 
                const price2 = basket.displayPrice(item2) 
                const price3 = basket.displayPrice(item3) 


                //THEN
                expect(price1).toEqual('0.49')
                expect(price2).toEqual('0.39')
                expect(price3).toEqual('0.49')

            })
        })


        describe('Add more than one favorite Bagel to the basket', ()=>{


            it('Can increase the quantity of favorite bagel',()=>{
                //GIVEN
                const item1 = new Item(inventory[0]);
                const item2 = new Item(inventory[1]);
                const item3 = new Item(inventory[2]);
        
                basket.addItemToBasket(item1);
                basket.addItemToBasket(item2);
                basket.addItemToBasket(item3);
                
                //WHEN
                const result = basket.inCreaseFavoriteBagel(item2, 3)
                
                //THEN
                expect(result).toEqual(`${item2.name}, ${3}`)

 

            })
        })


        describe('Sum up all the items price', ()=>{


            it('Can get a total price of all the items',()=>{
                //GIVEN
                const item1 = new Item(inventory[0]);
                const item2 = new Item(inventory[1]);
                const item3 = new Item(inventory[2]);
                const item4 = new Item(inventory[2]);

        
                basket.addItemToBasket(item1);
                basket.addItemToBasket(item2);
                basket.addItemToBasket(item3);
                basket.addItemToBasket(item4);

                
                //WHEN
                const result = basket.checkOut()
                
                //THEN
                expect(result).toEqual(1.86)

 

            })
        })

})

