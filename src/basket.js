class Basket {
    constructor () {
        this.items = []
        this.capacity = 5
    }

    add (item) {
        if (!this._hasCapacity()) return 'Sorry, your basket is already full.'
        this.items.push(item)
        return this.items
    }

    remove (id) {
        if (!this._itemExists(id)) return 'Sorry, that item is not in the basket'
        
        this.items = this.items.filter((item) => item.id !== id)
        return this.items
    }

    setCapacity (newCapacity) {
        this.capacity = newCapacity
        return this.capacity
    }

    _hasCapacity () {
        return this.items.length < this.capacity
    }

    _itemExists (id) {
        for (const item of this.items) {
            if (item.id === id) return true
        }
        return false
    }
}

const Item = require("../src/item")
const basket = new Basket()
const item = new Item(1, 'bagel')
const item2 = new Item(2, 'bagel')
basket.add(item)
basket.add(item2)
console.log(basket.items)

module.exports = Basket