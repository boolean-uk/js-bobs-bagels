import Store from "../../src/store.js"
import Customer from "../../src/customer.js"
import Basket from "../../src/basket.js"
import { basketTypesDefault } from "../../src/baskettypes.js"

describe("Store creation", () => {
  it("initially, the store exists with the default bucket types", () => {
    const myStore = new Store("Bob's Bagels")
    expect(myStore.availableBasketTypes).toEqual(basketTypesDefault)
    expect(myStore.employees).toEqual([])
    expect(myStore.availableProducts).toBeTruthy()
    expect(myStore.name === "Bob's Bagels").toBeTrue()
    expect(myStore.isOpen).toBeFalse()
  })
})

describe("Store opening", () => {
  it("opening store works", () => {
    const myStore = new Store("Bob's Bagels")
    expect(myStore.open()).toEqual("Store is now open!")
    expect(myStore.isOpen).toBeTrue()
  })

  it("opening store doesn't work when it's already open", () => {
    const myStore = new Store("Bob's Bagels")
    myStore.open()
    expect(myStore.open()).toEqual("We're already open!")
    expect(myStore.isOpen).toBeTrue()
  })
})

describe("Store closing", () => {
  it("closing store", () => {
    const myStore = new Store()
    myStore.open()
    expect(myStore.close()).toEqual("Store is now closed!")
    expect(myStore.isOpen).toBeFalse()
  })

  it("closing store when already closed doesn't work", () => {
    const myStore = new Store()
    expect(myStore.close()).toEqual("We're already closed!")
  })
})

describe("basket handout", () => {
  it("no basket template name returns no valid name", () => {
    const myStore = new Store()
    expect(myStore.handoutBasket()).toEqual("type not found")
  })

  it("basket XS has capacity 1", () => {
    const myStore = new Store()
    const handedOut = myStore.handoutBasket("XS")
    expect(handedOut.capacity).toEqual(1)
  })
})

describe("adding employees", () => {
  it("adding an employee adds employee count by one", () => {
    const myStore = new Store("Test")
    const oldEmployeeCount = myStore.employees.length
    myStore.addEmployee("Tina", "worker")
    expect(myStore.employees.length).toEqual(oldEmployeeCount + 1)
    expect(myStore.employees[oldEmployeeCount].name).toEqual("Tina")
    expect(myStore.employees[oldEmployeeCount].role).toEqual("worker")
  })
})

describe("customers", () => {
  it("customers can receive a basket", () => {
    const myStore = new Store("Test")
    const shopper = new Customer(myStore)
    shopper.receiveBasket(myStore.handoutBasket("M"))
    expect(shopper.basket.capacity).toEqual(4)
  })

  it("the store entered by the customer is a reference not a POJO", () =>{
    const myStore = new Store("Bob's Bagels")
    const shopper = new Customer(myStore)
    myStore.addEmployee("Bob", "manager")
    expect(myStore.employees).toEqual(shopper.atStore.employees)
  })

  it("Customers can put stuff into their basket", () => {
    const pseudoItem = { sku: 1234 }
    const myStore = new Store("Bob's Bagels")
    const shopper = new Customer(myStore)
    shopper.receiveBasket(new Basket(2))
    expect(shopper.basket.capacity).toEqual(2)
    expect(shopper.basket.isFull()).toBeFalse()
    expect(shopper.basket.items.length).toEqual(0)
  })

  it("customer can ask for price", () => {
    const myStore = new Store("Bob's Bagels")
    const shopper = new Customer(myStore)
    const askedFor = shopper.askForItem("Bagel", "everything")
    expect(askedFor).toBeTruthy()
    expect(askedFor.price > 0).toBeTrue()
  })

  it("customer can ask for price of item that doesn't exist", () => {
    const myStore = new Store("Bob's Bagels")
    const shopper = new Customer(myStore)
    const askedFor = shopper.askForItem("XYZ", "nonexisting")
    expect(askedFor).toBeFalse()
  })
})

describe("employees can do employee stuff", () => {
  it("adding basket templates works for managers", () => {
    const myStore = new Store("Bob's Bagels")
    myStore.addEmployee("Bob", "manager")
    const Bob = myStore.employees[0]
    const createdBasketType = Bob.createBasketType("XXL", 25)
    const indexOfNewBasket = myStore.availableBasketTypes.length
    myStore.addBasketType(createdBasketType)
    expect(myStore.availableBasketTypes.length).toEqual(indexOfNewBasket + 1)
    expect(myStore.availableBasketTypes[indexOfNewBasket].type).toEqual("XXL")
    expect(myStore.availableBasketTypes[indexOfNewBasket].capacity).toEqual(25)
  })
})