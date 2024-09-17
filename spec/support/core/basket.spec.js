const Basket = require("../../../src/core/Basket");
const Bagel = require("../../../src/core/Bagel");

describe("basket class tests", () => {
  it("should add one bagel to the basket", () => {
    const newBagel = new Bagel("Plain", 3.57);
    const basket = new Basket(10);

    const resultAdd = basket.add(newBagel, 1);

    const resultQuantity = basket.bagels.filter(
      (item) => item.bagel.name === "Plain"
    )[0].quantity;

    expect(resultAdd).toEqual(true);
    expect(resultQuantity).toEqual(1);
  });

  it("should increase quantity of specfic bagel if it is already in the basket", () => {
    const newBagel = new Bagel("Plain", 3.57);
    const basket = new Basket(10);

    basket.add(newBagel, 1);
    const result = basket.add(newBagel, 3);

    const resultQuantity = basket.bagels.filter(
      (item) => item.bagel.name === "Plain"
    )[0].quantity;

    expect(result).toEqual(true);
    expect(resultQuantity).toEqual(4);
  });

  it("should not increase quantity of specfic bagel if it is already in the basket", () => {
    const newBagel = new Bagel("Plain", 3.57);
    const basket = new Basket(10);

    basket.add(newBagel, 1);
    const result = basket.add(newBagel, 10);

    const resultQuantity = basket.bagels.filter(
      (item) => item.bagel.name === "Plain"
    )[0].quantity;

    expect(result).toEqual(false);
    expect(resultQuantity).toEqual(1);
  });

  it("should not add bagel if given quantity is invalid", () => {
    const newBagel = new Bagel("Plain", 3.57);
    const basket = new Basket(10);

    const result = basket.add(newBagel, -4);

    const resultLength = basket.bagels.filter(
      (item) => item.bagel.name === "Plain"
    ).length;

    expect(result).toEqual(false);
    expect(resultLength).toEqual(0);
  });

  it("should remove specific quantity of bagels from the basket", () => {
    const newBagel = new Bagel("Plain", 3.57);
    const basket = new Basket(10);

    basket.add(newBagel, 4);
    const result = basket.remove(newBagel, 2);

    const resultQuantity = basket.bagels.filter(
      (item) => item.bagel.name === "Plain"
    )[0].quantity;

    expect(result).toEqual(true);
    expect(resultQuantity).toEqual(2);
  });

  it("should not remove if bagel with given name does not exist", () => {
    const newBagel = new Bagel("Plain", 3.57);
    const invalidBagel = new Bagel("Poppy", 3);
    const basket = new Basket(10);

    basket.add(newBagel, 4);
    const result = basket.remove(invalidBagel, 2);

    expect(result).toEqual(false);
  });

  it("should not remove bagel if given quantity is invalid", () => {
    const newBagel = new Bagel("Plain", 3.57);
    const basket = new Basket(10);

    basket.add(newBagel, 1);
    const result = basket.remove(newBagel, -4);

    const resultQuantity = basket.bagels.filter(
      (item) => item.bagel.name === "Plain"
    )[0].quantity;

    expect(result).toEqual(false);
    expect(resultQuantity).toEqual(1);
  });

  it("should remove all bagels of given type", () => {
    const newBagel = new Bagel("Plain", 3.57);
    const basket = new Basket(10);

    basket.add(newBagel, 4);
    const result = basket.remove(newBagel, 5);

    const resultLength = basket.bagels.filter(
      (item) => item.bagel.name === "Plain"
    ).length;

    expect(result).toEqual(true);
    expect(resultLength).toEqual(0);
  });

  it("should return true if basket is full when given quantity will be added", () => {
    const newBagel = new Bagel("Plain", 3.57);
    const basket = new Basket(10);

    basket.add(newBagel, 8);
    const result = basket.isFull(3);

    expect(result).toEqual(true);
  });

  it("should return false if basket is not full when given quantity will be added", () => {
    const newBagel = new Bagel("Plain", 3.57);
    const basket = new Basket(10);

    basket.add(newBagel, 8);
    const result = basket.isFull(2);

    expect(result).toEqual(false);
  });

  it("should return total price of products included in the basket", () => {
    const newBagel1 = new Bagel("Plain", 3.56);
    const newBagel2 = new Bagel("Onion", 1.02);
    const basket = new Basket(10);

    basket.add(newBagel1, 1);
    basket.add(newBagel2, 2);
    const result = basket.total();

    expect(result).toEqual(5.6);
  });
});
