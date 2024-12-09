class BasketNotFoundError extends Error {
  constructor(uuid) {
    super(`${uuid}: Basket not found`)
  }
}

module.exports = { BasketNotFoundError }
