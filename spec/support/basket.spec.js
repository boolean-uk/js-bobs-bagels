
const { bagelSandwich,Bagel,Filling } = require('../../src/bagelSandwich')
const { basket } = require('../../src/basket')
const { coffee,CoffeeType } = require('../../src/coffee')

describe('Add to basket', () => {
    let  bask
    beforeEach(() => {
         bask = new basket(5)
      })
    it('should add to basket', () => {
        // Set up
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLO))
        // Test
        expect(bask.products.length).toEqual(1)
       
    })
    it('should fail to add to basket and throw', () => {
        // Set up
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLO))
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLE))
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLP))
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLO))
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLS))
        // Test
       
        expect(()=>bask.add(new bagelSandwich([Filling.FILB,Filling.FILE],Bagel.BGLO))).toThrow()
    })
    it('should remove from basket', () => {
        // Set up
        onionBagel=new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLO)
        bask.add(onionBagel)
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLE))
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLP))
        bask.add(new bagelSandwich([Filling.FILE],Bagel.BGLO))
        // Test
       
    bask.remove(onionBagel)
        expect(bask.products.length).toEqual(3)
    })
    it('should not remove from basket and throw', () => {
        // Set up
        onionBagel=new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLO)
        bask.add(onionBagel)
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLE))
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLP))
        bask.add(new bagelSandwich([Filling.FILE],Bagel.BGLO))
        painBagel=new bagelSandwich([Filling.FILE],Bagel.BGLP)
        // Test
       
   
    expect(()=>bask.remove(plainBagel)).toThrow()
    })
    it('should change capacity', () => {
        // Set up
        onionBagel=new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLO)
        bask.add(onionBagel)
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLE))
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLP))
        bask.add(new bagelSandwich([Filling.FILE],Bagel.BGLO))
       
        // Test
       bask.changeCapacity(6)
   
       expect(bask.capacity).toEqual(6)
    })
    it('should not change capacity and throw', () => {
        // Set up
        onionBagel=new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLO)
        bask.add(onionBagel)
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLE))
        bask.add(new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLP))
        bask.add(new bagelSandwich([Filling.FILE],Bagel.BGLO))
       
        // Test
   
       expect(()=>bask.changeCapacity(3)).toThrow()
    })
    it('should chang size of products list', () => {
        // Set up
        onionBagel=new bagelSandwich([Filling.FILE,Filling.FILE],Bagel.BGLO)
        bask.add(onionBagel)
        bask.remove(onionBagel)
       
        // Test
   
        expect(bask.products.length).toEqual(0)
    })
    it('should return total price', () => {
        // Set up
        onionBagel=new bagelSandwich([Filling.FILE,Filling.FILC],Bagel.BGLO)
        bask.add(onionBagel)
        plainBagel=new bagelSandwich([Filling.FILX],Bagel.BGLP)
        bask.add(plainBagel)
       
        // Test
        expect(bask.totalPrice()).toEqual(plainBagel.getPrice()+onionBagel.getPrice())
        expect(bask.totalPrice()).toEqual(1.24)
    })
    it('should return total price', () => {
        // Set up
        onionBagel=new bagelSandwich([Filling.FILE,Filling.FILC],Bagel.BGLO)
        bask.add(onionBagel)
        plainBagel=new bagelSandwich([Filling.FILX],Bagel.BGLP)
        bask.add(plainBagel)
        capucino=new coffee(CoffeeType.COFC)
        bask.add(capucino)
       
        // Test
        ourTotal=Math.round((plainBagel.getPrice()+onionBagel.getPrice()+capucino.getPrice()) * 100) / 100
        expect(bask.totalPrice()).toEqual(ourTotal)
       expect(bask.totalPrice()).toEqual(2.53)
    })

    it('should return receipt', () => {
            // Set up
            onionBagel=new bagelSandwich([Filling.FILE,Filling.FILC],Bagel.BGLO)
            bask.add(onionBagel)
            plainBagel=new bagelSandwich([Filling.FILX],Bagel.BGLP)
            bask.add(plainBagel)
            plainBagel2=new bagelSandwich([Filling.FILX,Filling.FILC],Bagel.BGLP)
            bask.add(plainBagel2)
            capucino=new coffee(CoffeeType.COFC)
            bask.add(capucino)
           
            // Test
        
           bask.printReceipt()
        })
})
