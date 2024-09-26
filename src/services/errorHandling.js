const throwNotFoundError = (message) => {
  const error = new Error(message)
  error.code = 404
  error.status = 'error'
  throw error
}

const throwBasketFullError = () => {
  const error = new Error('Basket is full')
  error.code = 403
  error.status = 'error'
  throw error
}

export { throwNotFoundError, throwBasketFullError }
