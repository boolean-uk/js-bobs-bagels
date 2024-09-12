/*
OBJECTS |    PROPERTIES      |      METHODS       |       Output
Item        id @Number
Basket: |   items @Array[Item], |  add(item @Item) |     item
        |   Price          |
        |   remove(name)   |    remove(item by id) |    item [new array]
        |   Capacity       |    Is full()          |    Yes or no
        |   Capacity       |    maxCapacity()      |    More Items
        |   quantity       |    quality(item)      !    no of items
*/
const Item = require("./item.js")

const Menu = [
    new Item('chocolateBagel', 3),
    new Item('jamBagel', 2)
]

class Basket {
    constructor() {
        this.items = []
        this.maxCapacity = 2
        this.menu = Menu
        this.quantity = quantity
        // this.checkPrice = []
    }

    add(item) {
        this.items.push(item)
        // console.log("Added item, returning items;",this.items)
        return this.items
    }

    remove(name) {
        const keptItems = []

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name !== name) {
                keptItems.push(this.items[i])
            }
        }

        if (this.items.length === keptItems.length) {
            return "cannot remove from Basket"
        }

        this.items = keptItems

        return this.items
    }

    isFull() {
        if (this.items.length >= this.maxCapacity) {
            return true
        }
        return false
    }

    setMaxCapacity(newMaxCapacity) {
        if (newMaxCapacity > 0 && newMaxCapacity > this.items.length) {

            this.maxCapacity = newMaxCapacity
        }

        return this.maxCapacity
    }

    // checkPrice(price) {
    checkPrice(itemName) {
        for (let i = 0; i < this.menu.length; i++) {
            let item = this.menu[i]
            if (item.name === itemName) {
                return item.price
            }
        }
        return "item does not exist"
    }

    amountOfItem(itemName) {

    }
}


module.exports = Basket
