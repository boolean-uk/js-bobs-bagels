const {inventory} = require('../inventory.json')

class Basket{
    constructor(){
        this.items = []
    }

    addItemToBasket(item){
        this.items.push(item)
        return true

    }


    
    removeOrder(orderIndex){
        this.items = this.items.filter((item, index) => index !== orderIndex);
        return this.items;
    }
    
    checkBasketCapacity(maximumCapacity){
        return  this.items.length >=  maximumCapacity ? false : true

    }
   
    increaseCapacity(item, capacity) {
        if (this.items.length >= capacity) {
            capacity ++
            this.items.push(item);
            return 'Capacity has been increase and a new item has been added'
        }
        else {
            this.items.push(item);
            return 'New item has been added'
        }
    }

  
    
    itemNotExisting(itemToBeRemoved) {
        const indexToRemove = this.items.findIndex(item => item === itemToBeRemoved);
    
        if (indexToRemove !== -1) {
            this.items.splice(indexToRemove, 1);
            return "Item has been removed";
        } else {
            return "Item doesn't exist";
        }
    }

    displayPrice(item){
        return item.price
    }
    

       
    inCreaseFavoriteBagel(favItem, quantity = 1){
        const favBagel = this.items.find((item)=> item === favItem )
        
        const favItemIndex  = this.items.indexOf(favBagel)
                    
        if(!this.items[favItemIndex] !== -1){

            if (!this.items[favItemIndex].quantity){
               let itemQuanity =  this.items[favItemIndex].quantity = quantity
             
                return `${favItem.name}, ${itemQuanity}` 
 
            }

            else{
                this.items.push({favItem, quantity})
                return `New Item added`
            }
        }

    
    }

    checkOut(){
        let totalPrice = 0;

        this.items.forEach(item => {
            totalPrice += parseFloat(item.price);
        });
      
        return totalPrice;
    }

  
    
    
}






class Item{
    constructor(item){
      this.sku = item.sku
      this.price = item.price
      this.name = item.name
      this.variant = item.variant
    }
}


module.exports = { Basket, Item}
 


