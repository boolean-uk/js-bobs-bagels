const { Bagel, validateBagel } = require('../src/models/bagel')

describe('validateBagel', () => {
  it('should not allow object of different type to be created', function () {
    expect(() => validateBagel({})).toThrow()
    expect(() => validateBagel({ name: 'test', price: 1 })).toThrow()
  })

  it('should allow object of Bagel type to be created', function () {
    expect(() => validateBagel(new Bagel('test', 1))).not.toThrow()
  })
})
