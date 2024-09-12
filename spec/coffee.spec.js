describe('Coffee functionality', () => {
    const Coffee  = require('../src/coffee.js')
  
    let coffee
    let coffee2
    beforeEach(() => {
        coffee = new Coffee('COFB', 'coffee', 12)
        coffee2 = new Coffee('COFB', 'coffee', 10)
    })
  
    it('should return cost of a coffee', () => {
      expect(coffee.getPrice()).toBe(12)
      expect(coffee2.getPrice()).toBe(10)
    })
  
  })
  