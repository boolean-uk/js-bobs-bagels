const inventoryData = require('../inventory.json')
const inventory = JSON.parse(JSON.stringify(inventoryData.inventory))

class Basket {
    constructor() {
        this.items = []
        this.capacity = 5
        this.totalPrice = 0
    }

    addItem(sku) {
        if (this.isFull()) {
            console.log('Basket is full!')
            return false
        }

        const existingItem = this.items.find((item) => item.sku === sku)
        if (existingItem) {
            existingItem.quantity++
            existingItem.price = (
                Math.round(Number(existingItem.price) * existingItem.quantity * 100) / 100
            ).toString()
            return this.items
        }

        const newItem = inventory.find((item) => item.sku === sku)
        if (!newItem) {
            console.log('Item not in stock!')
            return false
        }

        newItem.quantity = 1
        this.items.push({ ...newItem })
        return this.items
    }

    setCapacity(capacity) {
        if (capacity < this.currentAmount()) {
            return false
        }
        this.capacity = capacity
        return this.capacity
    }

    removeItem(sku) {
        const itemIndex = this.items.findIndex((item) => item.sku === sku)
        if (itemIndex === -1) {
            console.log('Item is not in the basket!')
            return false
        }
        const item = this.items[itemIndex]
        item.quantity--
        if (item.quantity <= 0) {
            this.items.splice(itemIndex, 1)
        }
        return this.items
    }

    currentAmount() {
        let currentAmount = 0
        this.items.forEach((item) => {
            currentAmount += item.quantity
        });
        return currentAmount
    }

    isFull() {
        return this.currentAmount() === this.capacity
    }

    getDiscount() {
        let countCoffee = 0
        let restofBGLP = 0
        let restofCoffee = 0
        this.items.forEach((item) => {
            if (item.sku === 'COF') {
                countCoffee = item.quantity
            }
            if (item.sku === 'BGLP') {
                restofBGLP = item.quantity
            }
        })

        this.items.forEach((item) => {
            if (item.sku === 'BGLO' || item.sku === 'BGLE') {
                const discount = Math.floor(item.quantity / 6) * 2.49
                const reminder = (item.quantity % 6) * 0.49
                item.price = (discount + reminder).toFixed(2)
            }
            if (item.sku === 'BGLP') {
                const discount = Math.floor(item.quantity / 12) * 3.99

                let reminder = 0
                if (restofBGLP) {
                    const restofPlain = Math.abs(countCoffee - restofBGLP)
                    reminder = restofPlain * 0.39
                }
                item.price = (discount + reminder).toFixed(2)
            }
            if (item.sku === 'COF') {
                const coffeePriceDiscount =
                    restofBGLP % countCoffee > 0
                        ? (restofBGLP % countCoffee) * 1.25
                        : restofBGLP === 1 && countCoffee === 1
                            ? 1.25
                            : 0
                if (countCoffee - restofBGLP > 0) {
                    restofCoffee = (countCoffee - restofBGLP) * 0.99
                }

                item.price = (coffeePriceDiscount + restofCoffee).toFixed(2)
            }
        });
        return this.items
    }

    getTotalPrice() {
        this.totalPrice = 0
        this.items.forEach((item) => {
            this.totalPrice += Number(item.price)
        });
        return this.totalPrice.toFixed(2)
    }
}

module.exports = {
    Basket: Basket,
};