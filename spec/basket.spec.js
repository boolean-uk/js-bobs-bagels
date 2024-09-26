const Basket = require("../src/basket.js");
const Bagel = require("../src/bagel.js");

describe("", () => {
  it("add a bagel in your basket", () => {
    //set up
    const basket = new Basket();
    const bagel = new Bagel("Cream Bagel", 5);
    const expected = [bagel];
    //execute
    const result = basket.addToBasket(bagel);
    //verify
    expect(result).toEqual(expected);
  });

  it("remove bagel from your basket", () => {
    //set up
    const basket = new Basket();
    const bagel = new Bagel("Cream Bagel", 5);
    const expected = [];
    //execute
    basket.addToBasket(bagel);
    const result = basket.removeFromBasket("Cream Bagel");
    //verify
    expect(result).toEqual(expected);
  });

  it("the basket is full of bagels", () => {
    //set up
    const basket = new Basket();
    const bagel = new Bagel("Cream Bagel", 5);

    //execute
    basket.addToBasket(bagel);
    basket.addToBasket(bagel);
    basket.addToBasket(bagel);
    basket.addToBasket(bagel);
    const result = basket.fullBasket();
    //verify
    expect(result).toEqual(true);
  });

  it("the basket is NOT full of bagels", () => {
    //set up
    const basket = new Basket();
    const bagel = new Bagel("Cream Bagel", 5);

    //execute
    const result = basket.fullBasket();
    //verify
    expect(result).toEqual(false);
  });

  it("create baskets with larger capacity", () => {
    //set up
    const basket = new Basket(4);
    const bagel = new Bagel("Sesame Bagel", 2);
    const bagel2 = new Bagel("Garlic Bagel", 4);
    const bagel3 = new Bagel("Chocolate Bagel", 5);
    const bagel4 = new Bagel("Plain Bagel", 3);
    //execute
    basket.addToBasket(bagel);
    basket.addToBasket(bagel2);
    const result1 = basket.fullBasket();
    basket.addToBasket(bagel3);
    basket.addToBasket(bagel4);
    const result2 = basket.fullBasket();
    //verify
    expect(result1).toEqual(false);
    expect(result2).toEqual(true);
  });

  it("check if item exists", () => {
    //set up
    const basket = new Basket(4);
    const bagel = new Bagel("Sesame Bagel", 2);
    const bagel2 = new Bagel("Sesame Bagel", 2);
    //execute
    basket.addToBasket(bagel);
    basket.addToBasket(bagel2);
    const result = basket.checkItemExists("Sesame Bagel", 2);

    //verify
    expect(result).toEqual(true);
  });

  it("checkout total amount of bagels inside basket", () => {
    //set up
    const basket = new Basket();
    const bagel = new Bagel("Onion Bagel", 10);
    const expected = 40;
    //execute
    for (let i = 0; i < 4; i++) {
      basket.addToBasket(bagel);
    }
    const result = basket.checkout(expected);

    //verify
    expect(result).toEqual(expected);
  });
});
