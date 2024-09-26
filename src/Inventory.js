const { Product } = require("./Product");


class Inventory {
    inventoryList = []
    constructor () {
        //bagel
        this.inventoryList.push(new Product("BGLO", 0.49, "Bagel", "Onion"));
        this.inventoryList.push(new Product("BGLP", 0.39, "Bagel", "Plain"));
        this.inventoryList.push(new Product("BGLE", 0.49, "Bagel", "Everything"));
        this.inventoryList.push(new Product("BGLS", 0.49, "Bagel", "Sesame"));
        //coffee
        this.inventoryList.push(new Product("COFB", 0.99, "Coffee", "Black"));
        this.inventoryList.push(new Product("COFW", 1.19, "Coffee", "White"));
        this.inventoryList.push(new Product("COFC", 1.29, "Coffee", "Capuccino"));
        this.inventoryList.push(new Product("COFL", 1.29, "Coffee", "Latte"));
        //filling
        this.inventoryList.push(new Product("FILB", 0.12, "Filling", "Bacon"));
        this.inventoryList.push(new Product("FILE", 0.12, "Filling", "Egg"));
        this.inventoryList.push(new Product("FILC", 0.12, "Filling", "Cheese"));
        this.inventoryList.push(new Product("FILX", 0.12, "Filling", "Cream Cheese"));
        this.inventoryList.push(new Product("FILS", 0.12, "Filling", "Smoked Salmon"));
        this.inventoryList.push(new Product("FILH", 0.12, "Filling", "Ham"));
    }

    getProductBySKU = (sku) => {
        return this.inventoryList.filter(product => product.sku === sku)[0]
    }

}

module.exports = {
    Inventory
}
