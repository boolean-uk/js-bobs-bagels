const Basket = require("../src/basket.js");
const Item = require("../src/item.js");

// ---------------------------------------- add() testing
describe("Basket add function", () => {
  it("adds an item to the basket", () => {
    // set up
    const basket = new Basket();
    const expected = [new Item("Blueberry")];
    // execute
    const result = basket.addBagelToBasket("Blueberry");
    // verify
    expect(result).toEqual(expected);
  });

  it("adds the same item more than once", () => {
    // set up
    const basket = new Basket();
    const expected = [new Item("Blueberry"), new Item("Blueberry")];
    // execute
    const result = basket.addBagelToBasket("Blueberry", 2);
    // verify
    expect(result).toEqual(expected);
  });

  it("doesnt allow you to add more bagels than the limit", () => {
    // set up
    const basket = new Basket();
    const expected = "youre trying to add too many bagels";
    // execute
    const result = basket.addBagelToBasket("Blueberry", 10);
    // verify
    expect(result).toEqual(expected);
  });
});

describe("Basket remove function", () => {
  it("removes an item to the basket", () => {
    // set up
    const basket = new Basket();
    basket.addBagelToBasket("Blueberry");
    basket.addBagelToBasket("Chocolate Chip");

    const expected = [new Item("Chocolate Chip")];
    // execute
    const result = basket.removeBagelFromBasket("Blueberry");
    // verify
    expect(result).toEqual(expected);
  });

  it("cant remove unknown bagel to basket", () => {
    // set up
    const basket = new Basket();
    const expected = "Bagel not found";
    // execute
    const result = basket.removeBagelFromBasket("Orange");
    // verify
    expect(result).toEqual(expected);
  });
});

describe("Basket is full function", () => {
  it("returns an error message when you try to add more than 5 items", () => {
    // set up
    const basket = new Basket();
    basket.addBagelToBasket("Blueberry");
    basket.addBagelToBasket("Chocolate Chip");
    basket.addBagelToBasket("Chocolate Chip");
    basket.addBagelToBasket("Blueberry");
    basket.addBagelToBasket("Blueberry");
    basket.addBagelToBasket("Cinnamon Raisin");
    basket.addBagelToBasket("Chocolate Chip");

    const expected = "youre trying to add too many bagels";
    // execute
    const result = basket.addBagelToBasket("Blueberry");
    // verify
    expect(result).toEqual(expected);
  });
});

describe("Basket max capacity function", () => {
  it("sets a new max capacity for the basket", () => {
    // set up
    const basket = new Basket(10);

    const expected = "youre trying to add too many bagels";
    // execute
    const result = basket.addBagelToBasket("blueberry", 11);
    // verify
    expect(result).toEqual(expected);
  });
});

describe("Item price check", () => {
  it("returns the price of an item", () => {
    // set up
    const item = new Item();

    const expected = 2.99;
    // execute
    const result = item.checkPrice();
    // verify
    expect(result).toEqual(expected);
  });
});

describe("checkout", () => {
  it("returns the price of all the bagels added up", () => {
    // set up
    const basket = new Basket();
    basket.addBagelToBasket("Chocolate Chip");
    basket.addBagelToBasket("Chocolate Chip");
    basket.addBagelToBasket("Chocolate Chip");

    const expected = 8.97;
    // execute
    const result = basket.checkoutTotalPrice();
    // verify
    expect(result).toEqual(expected);
  });
});
