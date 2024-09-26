function addItem(basket, item, quantity = 1) {
    if(isFull(basket))
        throw 'Basket is full'

    if(basket.items.length + quantity > basket.capacity)
        throw 'Basket can not containt that much items'

    for(let i = 0; i < quantity; i++)
        basket.items.push(item)
}

function removeItem(basket, item) {
    if(!containsItem(basket, item))
        throw 'Item does not exist in the basket'

    const index = basket.items.indexOf(item)
    basket.items.splice(index, 1)
}

function caclulatePromoPrice(item, itemQuantityInBasket){
    let promoPrice = 0;
    while (itemQuantityInBasket > 0 ){
        if (itemQuantityInBasket > 0 && itemQuantityInBasket <6){
            promoPrice += getItemPrice(item) * itemQuantityInBasket
            break
        }
        else if (itemQuantityInBasket >= 6 && itemQuantityInBasket <12){
            promoPrice +=2.49
            itemQuantityInBasket -= 6
        }
        else if (itemQuantityInBasket >= 12){
            promoPrice += 3.99
            itemQuantityInBasket -= 12
        }
    }
    return promoPrice
}


const isFull = (basket) =>
    basket.items.length === basket.capacity

const containsItem = (basket, item) =>
    basket.items.indexOf(item) !== -1

const setCapacity = (basket, capacity) =>
    basket.capacity = capacity

const getItemPrice = (item) => Number(item.price)

const totalPrice = (basket) => {
    let totalPrice = 0// = basket.items.reduce((acc, item) => acc += getItemPrice(item), 0)

    let bagelCounter = new Map()

    basket.items.forEach(element => {
        bagelCounter.set(element, (bagelCounter.get(element)?? 0) +1)//value + 1      
    })
    bagelCounter.forEach((quantity, item) => {
        if(item.sku.substring(0,3) === 'BGL' ){
            totalPrice +=caclulatePromoPrice(item, quantity)
        }
        else{
            totalPrice += getItemPrice(item) * quantity
        }
    });

    return totalPrice
}


module.exports = {
    addItem,
    removeItem,
    isFull,
    containsItem,
    setCapacity,
    getItemPrice,
    totalPrice
}