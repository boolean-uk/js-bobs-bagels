class ReceiptLine {
    item;
    quantity;
    price;
    isSpecialOffer;

    constructor(item, quantity, price, isSpecialOffer) {
        this.item = item;
        this.quantity = quantity;
        this.price = price;
        this.isSpecialOffer = isSpecialOffer;
      }
}

module.exports = ReceiptLine;