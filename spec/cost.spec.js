const Cost = require("../src/cost.js");

describe("Cost", () => {
  it("cost without any discounts", () => {
    // set up
    const newBasket = new Cost();
    const expected = 3.35;
    // execute

    const result = newBasket.totalCost();
    console.log("11....test....", result);

    // verify
    expect(result).toEqual(expected);
  });

  it("cost with discounts", () => {
    // set up
    const newBasket = new Cost();
    const expected = 3.22;
    // execute

    const result = newBasket.totalDiscountCost();
    console.log("24....test....", result);

    // verify
    expect(result).toEqual(expected);
  });
});
