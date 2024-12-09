const { productType } = require("./productType")

class basket{
    constructor(capacity){
        this.products=[]
        this.capacity=capacity
    }
    
    add(product){
        if(this.products.length +1 <=this.capacity){
        this.products.push(product)
        }
        else{
            throw "You cant add new product. No space left."
        }

    }
    remove(product){
        if(this.products.includes(product)){
            this.products.splice(this.products.indexOf(product),1)
        }else{
            throw "Product you want to remove is not in the basket."
        }
    }
    changeCapacity(newCapacity){
        if(newCapacity<this.products.length){
            throw "New capacity cannot be smaller than amount of items in basket."
        }
        this.capacity=newCapacity
    }
    totalPrice(){
       let totalPrice=0
        for(let i=0;i<this.products.length;i++){
            totalPrice+=this.products[i].getPrice()
        }
       return Math.round(totalPrice * 100) / 100
    }

    //  groupByType(items){
    //     const groupedByType = {};
    //     items.forEach((item) => {
    //     const type = item.type;
    //     if (!groupedByType[type]) {
    //     groupedByType[type] = [];
    //     }
    //     groupedByType[type].push(item);
    //     })
    // return groupedByType
    // }
    // groupCoffees(coffees){
    //     const groupedByType = {};
    //     coffees.forEach((item) => {
    //     const type = item.coffeeType;
    //     if (!groupedByType[type]) {
    //     groupedByType[type] = [];
    // }
    // groupedByType[type].push(item);
    // })
    // return groupedByType
    // }
    // groupBagels(bagels){
    //     const groupedByType = {};
    //     bagels.forEach((item) => {
    //     const type = item.bagel;
    //     if (!groupedByType[type]) {
    //     groupedByType[type] = [];
    // }
    // groupedByType[type].push(item);
    // })
    // return groupedByType
    // }
    groupByProductType(){
        const groupedArrays = [];
        const groupedByType = {};
      
        this.products.forEach((item) => {
          const type = item.type;
          if (!groupedByType[type]) {
            groupedByType[type] = [];
          }
          groupedByType[type].push(item);
        });
      
        for (const key in groupedByType) {
          groupedArrays.push(groupedByType[key]);
        }
        return groupedArrays
    }
    groupByBagelType(bagels){
        const groupedBagelsArrays = [];
        const groupedByBagelType = {};
      
        bagels.forEach((item) => {
          const type = item.bagel.bagelType;
         // console.log(item.bagel.bagelType)
          if (!groupedByBagelType[type]) {
            groupedByBagelType[type] = [];
          }
          groupedByBagelType[type].push(item);
        });
      
        for (const key in groupedByBagelType) {
            groupedBagelsArrays.push(groupedByBagelType[key]);
        }
        return groupedBagelsArrays
    }
    groupByCoffeeType(coffees){
        const groupedCoffeesArrays = [];
        const groupedByCoffeeType = {};
      
        coffees.forEach((item) => {
          const type = item.coffeeType.coffeeType;
        //  console.log(item.coffeeType.coffeeType)
          if (!groupedByCoffeeType[type]) {
            groupedByCoffeeType[type] = [];
          }
          groupedByCoffeeType[type].push(item);
        });
      
        for (const key in groupedByCoffeeType) {
            groupedCoffeesArrays.push(groupedByCoffeeType[key]);
        }
        return groupedCoffeesArrays
    }
    printReceipt(){
        console.log("")
        console.log("---------Bob's Bagels----------")
        console.log("")
        const currentDate = new Date();
       // const dateString = currentDate.toDateString();
       // const timeString = currentDate.toTimeString();
        const dateTimeString = currentDate.toLocaleString();
        console.log(dateTimeString)
        console.log("")

        const groupedArrays = this.groupByProductType();
       
        let bagels=[]
        let coffees=[]
        groupedArrays.forEach((group) => {
            if(group[0].type==productType.BagelSandwich){
            bagels=group
            }else{
                coffees=group
            }
        })
       
        const groupedBagelsArrays = this.groupByBagelType(bagels);
       
        groupedBagelsArrays.forEach((group) => {
            let bagelName="";
            let priceOfOne=1;
            const numOfBagelType=group.length
            group.forEach((bagel)=>{
                bagelName=bagel.bagel.bagelType
                priceOfOne=bagel.bagel.price
            })
            console.log(bagelName+" bagel "+numOfBagelType+" x "+priceOfOne+" = "+(priceOfOne*numOfBagelType));
        })

        const groupedCoffeesArrays = this.groupByCoffeeType(coffees);
        
        groupedCoffeesArrays.forEach((group) => {
            let coffeeName="";
            let priceOfOneCoffee=1;
            const numOfCoffeeType=group.length
            group.forEach((coffee)=>{
                coffeeName=coffee.coffeeType.coffeeType
                priceOfOneCoffee=coffee.coffeeType.price
            })
            console.log(coffeeName+"  "+numOfCoffeeType+" x "+priceOfOneCoffee+" = "+(priceOfOneCoffee*numOfCoffeeType));
        })
        console.log("--------------------------------")
        console.log("Total: "+this.totalPrice())
      
    }

}
module.exports = {
    basket
}

