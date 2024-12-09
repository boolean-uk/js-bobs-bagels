import Basket, {Bagel} from "../src/basket.js"

describe("basket", () => {
    let basket

    beforeEach(() => {
        basket = new Basket()
    })
    
    it("is an instance of the class", () => {
        expect(basket).toBeInstanceOf(Basket)
    })

    it("initalises with an empty arr", () => {
        expect(basket.contents.length).toBe(0)
    })

    it("adds an item to the basket", () => {
        const bagel = new Bagel("BGLE","Bagel", "Everything", 0.49)

        basket.addItem(bagel)

        expect(basket.contents.find((element) => { return element.variant === "Everything" && element.price === 0.49}).variant).toBe("Everything")
    })

    it("increments the quantity of items already in the basket", () => {
        const bagel = new Bagel("BGLE","Bagel", "Everything", 0.49)

        basket.addItem(bagel)

        expect(basket.contents.find((element) => { return element.variant === "Everything" && element.price === 0.49}).quantity).toBe(1)

        basket.addItem(bagel)

        expect(basket.contents.find((element) => { return element.variant === "Everything" && element.price === 0.49}).quantity).toBe(2)

    })

    it("removes the item from the basket", () => {
        const bagel = new Bagel("BGLE","Bagel", "Everything", 0.49)

        basket.addItem(bagel)

        basket.removeItem(bagel)

        expect(basket.contents.length).toBe(0)
    })

    it("decrements the quantity of items with a quantity greater than 1", () => {
        const bagel = new Bagel("BGLE","Bagel", "Everything", 0.49)

        basket.addItem(bagel)
        basket.addItem(bagel)

        basket.removeItem(bagel)

        expect(basket.contents.find((element) => { return element.variant === "Everything" && element.price === 0.49}).quantity).toBe(1)
    })

    it("throws an error when the item is not in the basket", () => {
        const bagel = new Bagel("BGLE","Bagel", "Everything", 0.49)
        
        expect(() => {basket.removeItem(bagel)}).toThrow(Error("The item does not exist in the basket"))
    })

    it("cannot add an item if it would cause the quantity of items to be larger than the size of the basket", () => {
        const bagel = new Bagel("BGLE","Bagel", "Everything", 0.49)

        basket.addItem(bagel)
        basket.addItem(bagel)
        basket.addItem(bagel)
        basket.addItem(bagel)
        basket.addItem(bagel)
        

        expect(() => {basket.addItem(bagel)}).toThrow(Error("Cannot add item, as basket is full"))
    })

    it("accepts a new basket size in the basket constructor", () => {
        const bagel = new Bagel("BGLE","Bagel", "Everything", 0.49)

        const newBasket = new Basket(10)

        newBasket.addItem(bagel)
        newBasket.addItem(bagel)
        newBasket.addItem(bagel)
        newBasket.addItem(bagel)
        newBasket.addItem(bagel)
        newBasket.addItem(bagel)

        expect(newBasket.contents[0].quantity).toBe(6)

        newBasket.addItem(bagel)
        newBasket.addItem(bagel)
        newBasket.addItem(bagel)
        newBasket.addItem(bagel)

        expect(() => {newBasket.addItem(bagel)}).toThrow(Error("Cannot add item, as basket is full"))
    })

    it("returns the total of the items in the basket",() => {
        const bagel = new Bagel("BGLE","Bagel", "Everything", 0.49)

        basket.addItem(bagel)
        basket.addItem(bagel)

        expect(basket.totalPrice()).toBe("£0.98")
    })
})

describe("bagel", () => {
    it("is an instance of bagel", () => {
        const bagel = new Bagel("BGLE","Bagel", "Everything", 0.49)
    })

    it("succesfully creates the bagel with the correct info", () => {
        const bagel = new Bagel("BGLE","Bagel", "Everything", 0.49)
        
        expect(bagel.variant).toBe("Everything")
        expect(bagel.price).toBe(0.49)
    })

    it("will throw an error with invalid inputs", () => {
        expect(() => {new Bagel(0.49, "Everything")}).toThrow(Error("Invalid argument types"))
    })

    it("will return the price of the bagel", () => {
        const bagel = new Bagel("BGLE","Bagel", "Everything", 0.49)

        expect(bagel.displayPrice()).toBe("£0.49")
    })
})