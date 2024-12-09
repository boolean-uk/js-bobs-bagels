const basket = [{ id: 1, name: 'poppyseed' }, { id: 1, name: 'salmon' }]

function multiBuys(order) {
    const checkBasket = basket.find(i => i.name === order.name)
    console.log(checkBasket.quantity)
    if(checkBasket.quantity === undefined) {
        checkBasket.quantity = 2
    } else {checkBasket.quantity++}
    return console.log(checkBasket)
}

multiBuys({ id: 1, name: 'poppyseed' })