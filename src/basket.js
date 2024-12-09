const itemCosts = { chocolate_bagel : 2.99 , philidelphia_bagel : 1.99 , pizza_bagel : 3.99 , pbandj_bagel : 0.99 }

class Basket {
    constructor (capacityBasket = 2) {
        this.basket =  []
        this.capacityBasket = capacityBasket
    }

    fetchPriceOfItem(item) {
        return itemCosts[item] || false
    }

    addItemToBasket (item) {
        if (this.isFull() === true ) { return false }
        this.basket.push(item)
        return this.basket
    }

    removeItemFromBasket (id) {
        const newBasket = []
        let foundItem = false

        for (let i = 0; i < this.basket.length; i++){
            if (this.basket[i].id !== id) {
                newBasket.push(this.basket[i])
                continue
            }
            foundItem = true
        }

        if (!foundItem) {return false}
        
        this.basket = newBasket
        return this.basket
    }

    isFull () {
        return this.basket.length >= this.capacityBasket
    }

    sumOfBasket(){
        let sum = 0
        for ( let i = 0; i < this.basket.length; i++ ) {
            sum += itemCosts[this.basket[i].name]
        }
        return sum
    }

}
module.exports = Basket