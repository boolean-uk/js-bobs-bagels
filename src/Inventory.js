class Inventory {
  constructor() {
    this.items = []
    this.specialOffers = []
  }

  addSKU(sku) {
    this.items.push(sku)
  }

  addSpecialOffer(specialOffer) {
    this.specialOffers.push(specialOffer)
  }

  findSKU(skuCode) {
    return this.items.find((item) => item.sku === skuCode)
  }

  findSpecialOffer(skuCode, quantity) {
    return this.specialOffers.find(
      (offer) => offer.sku === skuCode && quantity >= offer.quantity
    )
  }
}

module.exports = Inventory
