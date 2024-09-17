const {
  clearBasket,
  add,
  remove,
  changeCapacity,
  total,
  checkBagelPrice,
  getReceipt
} = require('../src/basket')

afterEach(() => {
  clearBasket()
})

describe('Basket', () => {
  it('adding type of bagel existing in inventory should return true', () => {
    const result = add('BGLO', 1)

    expect(result).toEqual(true)
  })

  it('adding with string as quantity should return false', () => {
    const result = add('BGLO', 'x')

    expect(result).toEqual(false)
  })

  it('adding with int as sku should return false', () => {
    const result = add(1, 2)

    expect(result).toEqual(false)
  })

  it('adding with boolean as quantity should return false', () => {
    const result = add('BGLO', false)

    expect(result).toEqual(false)
  })

  it('adding with boolean as sku should return false', () => {
    const result = add(false, 2)

    expect(result).toEqual(false)
  })

  it('adding more bagels than capacity should return false', () => {
    const result = add('BGLO', 100)

    expect(result).toEqual(false)
  })

  it('adding type of bagel not existing in inventory should return false', () => {
    const result = add('BOAFF', 1)

    expect(result).toEqual(false)
  })

  it('removing bagels existing in basket should return true', () => {
    add('BGLO', 5)
    const result = remove('BGLO', 4)

    expect(result).toEqual(true)
  })

  it('removing bagels not existing in basket should return false', () => {
    add('BGLO', 5)
    const result = remove('BGLE', 4)

    expect(result).toEqual(false)
  })

  it('removing with int as sku should return true', () => {
    add('BGLO', 5)
    const result = remove(1, 4)

    expect(result).toEqual(false)
  })

  it('removing with boolean as sku should return true', () => {
    add('BGLO', 5)
    const result = remove(false, 4)

    expect(result).toEqual(false)
  })

  it('removing with string as quantity should return true', () => {
    add('BGLO', 5)
    const result = remove('BGLE', 'x')

    expect(result).toEqual(false)
  })

  it('removing with boolean as quantity should return true', () => {
    add('BGLO', 5)
    const result = remove('BGLE', false)

    expect(result).toEqual(false)
  })

  it('changing capacity to normal value, higher than previous capacity should return true', () => {
    const result = changeCapacity(20)

    expect(result).toEqual(true)
  })

  it('changing capacity to value less than previous capacity should return false', () => {
    const result = changeCapacity(8)

    expect(result).toEqual(false)
  })

  it('changing capacity without parameter should return false', () => {
    const result = changeCapacity()

    expect(result).toEqual(false)
  })

  it('changing capacity to string should return false', () => {
    const result = changeCapacity('x')

    expect(result).toEqual(false)
  })

  it('changing capacity to boolean should return false', () => {
    const result = changeCapacity(false)

    expect(result).toEqual(false)
  })

  it('testing changing capacity', () => {
    changeCapacity(13)
    const result = add('BGLO', 11)

    expect(result).toEqual(true)
  })

  it('testing price checking', () => {
    const result = checkBagelPrice('BGLO')

    expect(result).toEqual('0.49')
  })

  it('checking price of not existing bagel should return flase', () => {
    const result = checkBagelPrice('BddGLO')

    expect(result).toEqual(0)
  })

  it('cost of bagels in basket should return ', () => {
    add('BGLO', 5)
    add('BGLP', 3)
    add('COF', 1)
    add('BGSS', 1)
    const result = total()

    expect(result).toEqual(9.6)
  })

  it('getReceipt should return receipt', () => {
    changeCapacity(40)
    add('BGLO', 2)
    add('BGLP', 12)
    add('BGLE', 6)
    add('COF', 3)
    const expected = []
    expected.push("    ~~~ Bob's Bagels ~~~\n\n")
    let now = Date.now()
    now = new Date(now)
    expected.push(now.toLocaleDateString().padStart(19) + '\n\n')
    expected.push('-'.repeat(28) + '\n')

    expected.push('Onion Bagel       2    $0.98\n')
    expected.push('Plain Bagel       12   $4.68\n')
    expected.push('Everything Bagel  6    $2.94\n')
    expected.push('Coffee            3    $2.97\n')

    expected.push('\n' + '-'.repeat(28) + '\n')
    expected.push('Total                 $11.57\n')
    expected.push('        Thank you\n')
    expected.push('      for your order!')

    const result = getReceipt()

    expect(result).toEqual(expected.join(''))
  })
})
