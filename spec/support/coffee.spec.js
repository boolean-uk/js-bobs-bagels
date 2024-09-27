describe('Coffee functionality', () => {
    const Coffee  = require('../src/coffee.js')
  
    let coffee
    let coffee2
    beforeEach(() => {
        coffee = new Coffee('COFB', 'coffee', 1)
        coffee2 = new Coffee('COFB', 'coffee', 11)
    })
  
    it('should return cost of a coffee', () => {
      expect(coffee.getPrice()).toBe(1)
      expect(coffee2.getPrice()).toBe(11)
    })
  
  })