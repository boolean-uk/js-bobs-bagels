import Basket from '../src/basket.js';
import inventory from '../inventory.json' assert { type: 'json' }; 

function test() {
const testBasket = new Basket()

testBasket.addToBasket("BGLO")
testBasket.addToBasket("BGLO")
testBasket.addToBasket("BGLO")
testBasket.addToBasket("BGLO")
testBasket.addToBasket("BGLO")
testBasket.addToBasket("BGLO")

}

export default test
