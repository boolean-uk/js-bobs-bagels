const Menu = require("../src/menu.js");

describe("Menu", () => {
  it("check bagel menu", () => {
    // set up
    const newMenu = new Menu();
    const expected = [
      { SKU: "BGLO", id: 0, name: "Bagel Onion", price: 0.49 },
      { SKU: "BGLP", id: 1, name: "Bagel Plain", price: 0.39 },
      { SKU: "BGLE", id: 2, name: "Bagel Everything", price: 0.49 },
      { SKU: "COF", id: 3, name: "Coffee", price: 0.99 }
    ];
    // execute
    newMenu.createItemUpdateMenu("Bagel Onion", 0.49);
    newMenu.createItemUpdateMenu("Bagel Plain", 0.39);
    newMenu.createItemUpdateMenu("Bagel Everything", 0.49);
    const result = newMenu.createItemUpdateMenu("Coffee", 0.99);
    // verify
    expect(result).toEqual(expected);
  });

  it("create SKU code form string", () => {
    // set up
    const newCode = new Menu();
    const expected = "BGLO";
    // execute
    const result = newCode.createSkuCode("Bagel Onion");
    // verify
    expect(result).toEqual(expected);
  });

  it("create SKU code for non-bagel string", () => {
    // set up
    const newCode = new Menu();
    const expected = "COF";
    // execute
    const result = newCode.createSkuCode("Coffee");
    // verify
    expect(result).toEqual(expected);
  });
});
