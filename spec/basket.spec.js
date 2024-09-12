const Basket = require("../src/basket.js");

describe("Basket for Bob's Bagel", () => {
  it("Add item to the basket", () => {
    // set-up
    const basket = new Basket();
    const expected = [{ id: 1, name: "bagel", price: 50 }];
    // execute
    const result = basket.addItemToBasket("bagel");
    // verify
    expect(result).toEqual(expected);
  });

  it("Removes Item from Basket", () => {
    // set-up
    const basket = new Basket();
    basket.addItemToBasket("bagel");
    basket.addItemToBasket("special-bagel");
    const expected = [{ id: 2, name: "special-bagel", price: 130 }];
    // execute
    const result = basket.removeItemFromBasket(1);
    // verify
    expect(result).toEqual(expected);
  });

  it("Tells you if your basket is full", () => {
    // set-up
    const basket = new Basket();
    basket.addItemToBasket("bagel");
    basket.addItemToBasket("special-bagel");
    basket.addItemToBasket("bagel");
    basket.addItemToBasket("special-bagel");
    basket.addItemToBasket("special-bagel");
    const expected = "Your basket is full!";
    // execute
    const result = basket.addItemToBasket("extra-special-bagel");
    // verify
    expect(result).toEqual(expected);
  });

  it("Set new Limit to the Basket", () => {
    // set-up
    const basket = new Basket();
    basket.addItemToBasket("bagel");
    basket.addItemToBasket("special-bagel");
    const expected = 8;
    // execute
    basket.changeBasketLimit(8);
    // verify
    expect(basket.limit).toEqual(expected);
  });

  it("Message if try to remove something doesn't exist", () => {
    // set-up
    const basket = new Basket();
    basket.addItemToBasket("bagel");
    basket.addItemToBasket("special-bagel");
    const expected = "Item doesn't exist";
    // execute
    const result = basket.removeItemFromBasket(3);
    // verify
    expect(result).toEqual(expected);
  });

  it("Check for price before add to cart", () => {
    // set-up
    const basket = new Basket();
    basket.addItemToBasket("bagel");
    basket.addItemToBasket("special-bagel");
    const expected = `The price of your bagel is 50 pence`;
    // execute
    const result = basket.checkForPriceBeforeAddToCart("bagel");
    // verify
    expect(result).toEqual(expected);
  });

  it("Add multiple favorite to cart", () => {
    // set-up
    const basket = new Basket();
    basket.addItemToBasket("bagel");
    basket.addItemToBasket("special-bagel");
    const expected = "Too much item for your basket 2 of 5";
    // execute
    const result = basket.addMultipleFavoriteToCart("bagel", 6);
    // verify
    expect(result).toEqual(expected);
  });

  it("Add multiple favorite to cart", () => {
    // set-up
    const basket = new Basket();
    const expected = [
      { id: 1, name: "bagel", price: 50 },
      { id: 2, name: "bagel", price: 50 },
      { id: 3, name: "bagel", price: 50 },
      { id: 4, name: "bagel", price: 50 },
      { id: 5, name: "bagel", price: 50 },
    ];
    // execute
    const result = basket.addMultipleFavoriteToCart("bagel", 5);
    // verify
    expect(result).toEqual(expected);
  });

  it("Get total amount of cart", () => {
    // set-up
    const basket = new Basket();
    basket.addMultipleFavoriteToCart("bagel", 5);
    const expected = 250;
    // execute
    const result = basket.getTotalSumOfCart();
    // verify
    expect(result).toEqual(expected);
  });

  it("Get total amount of cart", () => {
    // set-up
    const basket = new Basket();
    basket.addItemToBasket("bagel");
    basket.addItemToBasket("special-bagel");
    basket.addMultipleFavoriteToCart("bagel", 5);
    const expected = 180;
    // execute
    const result = basket.getTotalSumOfCart();
    // verify
    expect(result).toEqual(expected);
  });
});
