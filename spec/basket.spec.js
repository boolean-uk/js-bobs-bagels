const Basket = require("../src/basket.js");

describe("Basket", () => {
  it("check bagel menu", () => {
    // set up
    const newBagel = new Basket();
    // newBagel.menu.createItemUpdateMenu("Bagel Onion", 0.49);
    const expected = [
      { SKU: "BGLO", id: 0, name: "Bagel Onion", price: 0.49 },
      { SKU: "BGLP", id: 1, name: "Bagel Plain", price: 0.39 },
      { SKU: "BGLE", id: 2, name: "Bagel Everything", price: 0.49 },
      { SKU: "COF", id: 3, name: "Coffee", price: 0.99 }
    ];
    // execute
    const result = newBagel.latestMenu;
    // verify
    expect(result).toEqual(expected);
  });

  it("adds selected bagel to basket", () => {
    // set up
    const newBagel = new Basket();
    const expected = [{ SKU: "BGLO", id: 0, name: "Bagel Onion", price: 0.49 }];
    // execute

    const result = newBagel.addItemToBasketByName("Bagel Onion");
    // verify
    expect(result).toEqual(expected);
  });

  it("adds two selected bagels to basket", () => {
    // set up
    const newBagel = new Basket();
    const expected = [
      { SKU: "BGLE", id: 2, name: "Bagel Everything", price: 0.49 },
      { SKU: "COF", id: 3, name: "Coffee", price: 0.99 }
    ];
    // execute
    newBagel.addItemToBasketByName("Bagel Everything");
    const result = newBagel.addItemToBasketByName("Coffee");
    // verify
    expect(result).toEqual(expected);
  });

  it("returns basket without item if not on menu", () => {
    // set up
    const newBagel = new Basket();
    const expected = [];
    // execute

    const result = newBagel.addItemToBasketByName("MexicanoExtraHot");

    // verify
    expect(result).toEqual(expected);
  });

  it("removes an item by name from basket", () => {
    // set up
    const newBagel = new Basket();
    const expected = [
      { SKU: "BGLP", id: 1, name: "Bagel Plain", price: 0.39 },
      { SKU: "BGLE", id: 2, name: "Bagel Everything", price: 0.49 },
      { SKU: "COF", id: 3, name: "Coffee", price: 0.99 }
    ];
    // execute

    newBagel.addItemToBasketByName("Bagel Onion");
    newBagel.addItemToBasketByName("Bagel Plain");
    newBagel.addItemToBasketByName("Bagel Everything");
    newBagel.addItemToBasketByName("Coffee");

    // newBagel.removeItemByName("New Yorker");
    const result = newBagel.removeItemByName("Bagel Onion");

    // verify
    expect(result).toEqual(expected);
  });

  it("returns string if item to remove does not exist", () => {
    // set up
    const newBagel = new Basket();
    const expected = `No such item to remove. Get a grip !!!!`;
    // execute
    newBagel.addItemToBasketByName("Bagel Onion");
    newBagel.addItemToBasketByName("Bagel Plain");
    newBagel.addItemToBasketByName("Bagel Everything");

    const result = newBagel.removeItemByName("New Yorker ");

    // verify
    expect(result).toEqual(expected);
  });

  it("checks basket capacity #basketCapacity", () => {
    // set up
    const newBagel = new Basket();
    const expected = 5;
    // execute
    const result = newBagel.basketCapacity;
    // verify
    expect(result).toEqual(expected);
  });

  it("sets new #basketCapacity", () => {
    // set up
    const newBagel = new Basket();
    const expected = 8;
    // execute
    newBagel.basketCapacity = 8;
    const result = newBagel.basketCapacity;
    // verify
    expect(result).toEqual(expected);
  });

  it("on basket capacity, returns string", () => {
    // set up
    const newBagel = new Basket();
    const expected = `I'm afraid your basket is full`;
    // execute

    newBagel.addItemToBasketByName("Bagel Onion");
    newBagel.addItemToBasketByName("Bagel Plain");
    newBagel.addItemToBasketByName("Bagel Everything");
    newBagel.addItemToBasketByName("Bagel Onion");
    newBagel.addItemToBasketByName("Bagel Plain");

    const result = newBagel.isMyBasketFull();

    // verify
    expect(result).toEqual(expected);
  });

  it("two under basket capacity, returns string", () => {
    // set up
    const newBagel = new Basket();
    const expected = `You can buy another 2 bagels`;
    // execute

    newBagel.addItemToBasketByName("Bagel Onion");
    newBagel.addItemToBasketByName("Bagel Plain");
    newBagel.addItemToBasketByName("Bagel Everything");

    const result = newBagel.isMyBasketFull();

    // verify
    expect(result).toEqual(expected);
  });

  it("basket on capacity, want to add another", () => {
    // set up
    const newBagel = new Basket();
    const expected = `I'm afraid your basket is full`;
    // execute
    newBagel.addItemToBasketByName("Bagel Onion");
    newBagel.addItemToBasketByName("Bagel Plain");
    newBagel.addItemToBasketByName("Bagel Everything");
    newBagel.addItemToBasketByName("Bagel Plain");
    newBagel.addItemToBasketByName("Bagel Everything");

    const result = newBagel.addItemToBasketByName("Bagel Everything");

    // verify
    expect(result).toEqual(expected);
  });

  it("returns a string with each item and it's price", () => {
    // set up
    const newBagel = new Basket();
    const expected =
      "Your Bagel Plain will cost you $0.39.\nYour Bagel Everything will cost you $0.49.\n";

    // execute

    newBagel.addItemToBasketByName("Bagel Plain");
    newBagel.addItemToBasketByName("Bagel Everything");
    const result = newBagel.pricePerItem();

    // verify
    expect(result).toEqual(expected);
  });

  it("add more than one of same bagel", () => {
    // set up
    const newBagel = new Basket();
    const expected = [
      { SKU: "BGLE", id: 2, name: "Bagel Everything", price: 0.49 },
      { SKU: "BGLP", id: 1, name: "Bagel Plain", price: 0.39 },
      { SKU: "BGLE", id: 2, name: "Bagel Everything", price: 0.49 },
      { SKU: "BGLE", id: 2, name: "Bagel Everything", price: 0.49 }
    ];
    // execute

    newBagel.addItemToBasketByName("Bagel Everything");
    newBagel.addItemToBasketByName("Bagel Plain");
    newBagel.addItemToBasketByName("Bagel Everything");

    const result = newBagel.addItemToBasketByName("Bagel Everything");
    // verify
    expect(result).toEqual(expected);
  });

  it("returns total for basket", () => {
    // set up
    const newBagel = new Basket();
    const expected = "$1.37";
    // execute
    newBagel.addItemToBasketByName("Bagel Everything");
    newBagel.addItemToBasketByName("Bagel Plain");
    newBagel.addItemToBasketByName("Bagel Everything");

    const result = newBagel.totalForBasket();

    // verify
    expect(result).toEqual(expected);
  });
});
