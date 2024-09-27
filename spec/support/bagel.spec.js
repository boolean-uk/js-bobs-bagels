describe('Bagel functionality', () => {
    const Bagel = require('../src/bagel.js')
  
    let bagel
    let bagel2
    beforeEach(() => {
      bagel = new Bagel('BGLO','bagel', 12)
      bagel2 = new Bagel('BGLO', 'bagel2', 10)
    })
  
    it('should return cost of a bagel', () => {
      expect(bagel.getPrice()).toBe(12)
      expect(bagel2.getPrice()).toBe(10)
    })
  })