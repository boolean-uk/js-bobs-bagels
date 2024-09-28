
class Price {
  constructor () {
    // FIGURE OUT HOW NOT TO HARD CODE THESE PROPERTIES
    this.list = {
      plain: 2,
      cheese: 3,
      cinnamon: 3,
      raisin: 3,
      poppy: 4,
      sesame: 4,
      BGLO: 0.49,
      BGLP: 0.39,
      BGLE: 0.49,
      COF: 0.99
    }
  }

  checkPrice (item) {
    // make an object into an array with Object.entries()
    const itemListArr = Object.entries(this.list)
    const itemAndPrice = itemListArr.find(list => list[0] === item)
    return `bagel: ${itemAndPrice[0]}, price: $${itemAndPrice[1]}`
  }

  skuQuantity (basket) {
    const skuQuantityObj = {}
    // Go through the basket, and create @Obj {item: quantity}
    // if item exists in obj, add 1; else create a new property with value 1
    basket.forEach(item => {
      skuQuantityObj[item] ? skuQuantityObj[item] += 1 : skuQuantityObj[item] = 1
    })
    return skuQuantityObj
  }

  // IS THERE A BETTER WAY TO CREATE THIS METHOD???
  cofDeal (skuQuantityObj) {
    const skuArr = Object.keys(skuQuantityObj)
    const bglp = skuQuantityObj['BGLP']
    const cof = skuQuantityObj['COF']

    if (skuArr.includes('BGLP') && skuArr.includes('COF')) {
      if (bglp === cof) {
        skuQuantityObj['COFP'] = bglp
        delete skuQuantityObj['BGLP']
        delete skuQuantityObj['COF']
      }
      if (bglp > cof) {
        skuQuantityObj['COFP'] = cof
        skuQuantityObj['BGLP'] = bglp - cof
        delete skuQuantityObj['COF']
      }
      if (bglp < cof) {
        skuQuantityObj['COFP'] = bglp
        skuQuantityObj['COF'] = cof - bglp
        delete skuQuantityObj['BGLP']
      }
    }
    return skuQuantityObj
  }

  subPrice (cofDeal) {
    const subPriceObj = {}

    for (const skuQuantity in cofDeal) {
      const sku = skuQuantity
      const quantity = cofDeal[sku]
      let subPrice = 0

      if (sku === 'COFP') subPrice += 1.25 * quantity
      if (sku === 'BGLO' || sku === 'BGLE') subPrice += (2.49 * (Math.floor(quantity / 6))) + (this.list[sku] * (quantity % 6))
      if (sku === 'BGLP') subPrice += (3.99 * Math.floor(quantity / 12)) + (this.list[sku] * (quantity % 12))
      if (sku === 'COF') subPrice += this.list[sku] * (quantity)
      subPriceObj[sku] = Number(Number.parseFloat(subPrice).toFixed(3))
    }
    return subPriceObj
  }

  noDiscountPrice (skuQuantityObj) {
    const noDiscountObj = {}

    for (const skuQuantity in skuQuantityObj) {
      const sku = skuQuantity
      const quantity = skuQuantityObj[sku]
      const nodiscountPrice = this.list[sku] * quantity
      noDiscountObj[sku] = Number(Number.parseFloat(nodiscountPrice).toFixed(3))
    }
    return noDiscountObj
  }

  savedPrice (subPriceObj, noDiscountPriceObj) {
    const savedPriceObj = {}
    const item = Object.keys(subPriceObj)
    const subPrice = Object.values(subPriceObj)
    const noDiscountPrice = Object.values(noDiscountPriceObj)

    for (let i = 0; i < subPrice.length; i++) {
      savedPriceObj[item[i]] = Number(Number.parseFloat(noDiscountPrice[i] - subPrice[i]).toFixed(3))
    }
    return savedPriceObj
  }

  convertSKU (subPrice) {
    const itemObj = {}

    for (const skuQuantity in subPrice) {
      let sku = skuQuantity
      const quantity = subPrice[sku]

      if (sku === 'BGLO') sku = 'Onion Bagel'
      if (sku === 'BFLP') sku = 'Plain Bagel'
      if (sku === 'BGLE') sku = 'Everything Bagel'
      if (sku === 'COF') sku = 'Coffee'
      if (sku === 'COFP') sku = 'Coffee & Plain Bagel Combo'
      itemObj[sku] = quantity
    }
    return itemObj
  }

  totalSavedPrice (savedPrice) {
    const savedPriceArr = Object.values(savedPrice)
    const totalSavedPrice = savedPriceArr.reduce((firstPrice, nextPrice) => (firstPrice + nextPrice), 0)
    return Number(Number.parseFloat(totalSavedPrice).toFixed(3))
  }

  totalPrice (basket) {
  // convert all bagels to its price, and then .reduce();
    let totalPrice
    // conditional if basket type is array (for core criteria) or object (for extension)
    if (Array.isArray(basket)) {
      const bagelPriceArr = basket.map(bagel => this.list[bagel])
      totalPrice = bagelPriceArr.reduce((firstPrice, nextPrice) => (firstPrice + nextPrice), 0)
      return `total: $${totalPrice}`
    }

    const subPriceArr = Object.values(basket)
    totalPrice = subPriceArr.reduce((firstPrice, nextPrice) => (firstPrice + nextPrice), 0)
    return Number(Number.parseFloat(totalPrice).toFixed(3))
  }
}

module.exports = Price
