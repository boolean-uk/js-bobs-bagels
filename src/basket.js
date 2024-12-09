// eslint-disable-next-line no-use-before-define
import inventory from '../inventory.json' assert { type: 'json' }

const store = inventory.inventory

class Basket {
    constructor(user) {
        this.basket = [],
            this.capacity = 15
        this.user = user
    }

    addToBasket(item) {
        // Checks for valid input
        if (item && typeof item !== 'string') {
            return 'ERROR: Please type in an item'
        }
        if (!item) {
            return 'ERROR: Please type in an item'
        }
        // Check that item is in the inventory/store
        const target = store.filter((obj) => obj.sku === item)
        if (target.length === 0) {
            return 'ERROR: Item not found'
        }

        // if statement for finding total items in basket, including quantities
        // find total items with quantities
        function basketTotal(arr) {
            let itemTotal = 0
            for (let i = 0; i < arr.length; i++) {
                itemTotal += arr[i].quantity
            }
            return itemTotal
        }

        const baskAmount = basketTotal(this.basket)
        if (baskAmount === this.capacity) {
            return "Basket is full"
        }

        // All checks complete, now adding to basket 
        const targObj = target[0]
        // Check if item is already in basket and add to the quantity
        const baskCheck = this.basket.find(({ sku }) => sku === targObj.sku)
        if (baskCheck !== undefined) {
            const baskIndex = this.basket.indexOf(baskCheck)
            this.basket[baskIndex].quantity += 1
            return this.basket
        }
        // Item is not in basket so add property of quantity = 1 and push to basket
        targObj.quantity = 1
        this.basket.push(targObj)
        return this.basket
    }

    removeBasket(item) {
        // Check for valid input 
        if (item && typeof item !== 'string') {
            return 'ERROR: Please type in an item'
        }
        if (!item) {
            return 'ERROR: Please type in an item'
        }
        // Check if item exists in store
        const targStore = store.find(({ sku }) => sku === item)
        if (targStore === undefined) {
            return 'ERROR: Item not found'
        }
        // Check if item is in basket
        const targ = this.basket.find(({ sku }) => sku === item)
        if (targ === undefined) {
            return 'ERROR: Item not in basket'
        }
        // If item is in basket and quantity is > 1
        if (targ.quantity > 1) {
            const baskIndex = this.basket.indexOf(targ);
            this.basket[baskIndex].quantity -= 1
            return this.basket
        }
        this.basket = this.basket.filter((obj) => obj.sku !== item)
        return this.basket
    }

    changeSizeBasket(num) {
        if (this.user !== "Bob") {
            return "Only the manager is authorised to change basket size!"
        }
        this.basket.capacity = num;
        return `Basket capacity changed to ${num}`
    }

    checkPrice(item) {
        // Checks for valid input
        if (item && typeof item !== 'string') {
            return 'ERROR: Please type in an item'
        }
        if (!item) {
            return 'ERROR: Please type in an item'
        }
        const targStore = store.find(({ sku }) => sku === item)
        if (targStore === undefined) {
            return 'ERROR: Item not found'
        }
        return `The price of the ${targStore.variant} ${targStore.name} is £${targStore.price}`
    }

    checkNumberBasket() {
        let numBagels = 0;
        this.basket.forEach((element) => {
            numBagels += element.quantity
        })
        return `You have ${numBagels} bagels in your basket`
    }

    checkBasketPrice() {
        let cost = 0
        // const wantCoffee = this.basket.find(({ sku }) => sku === "COF")
        // console.log(wantCoffee)
        this.basket.forEach((element) => {
            if (element.sku === "BGLO" && element.quantity >= 6) {
                let dealBagels = element.quantity
                for (let i = dealBagels; i >= 6; i -= 6) {
                    cost += 2.49
                    dealBagels -= 6
                }
                cost += dealBagels * element.price
            }
            else if (element.sku === "BGLP" && element.quantity >= 12) {
                let dealBagels = element.quantity
                for (let i = dealBagels; i >= 12; i -= 12) {
                    cost += 3.99
                    dealBagels -= 12
                }
                // if(wantCoffee !== undefined){
                //     let dealCoffee = wantCoffee.quantity
                //     console.log(dealCoffee)
                //     while(dealCoffee > 0 || dealBagels > 0) {
                //         cost += 1.25
                //         dealCoffee--
                //         dealBagels--
                //     }                    
                // }
                cost += dealBagels * element.price
            }
            else if (element.sku === "BGLE" && element.quantity >= 6) {
                let dealBagels = element.quantity
                for (let i = dealBagels; i >= 6; i -= 6) {
                    cost += 2.49
                    dealBagels -= 6
                }
                cost += dealBagels * element.price
            }
            else {
                cost += element.quantity * element.price
            }
        })
        return `The price of your basket is £${cost}`
    }



}

export default Basket