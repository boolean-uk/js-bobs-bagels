class BagelNotFoundError extends Error {
    constructor (uuid) {
        super(`${uuid}: Bagel not found`)
    }
}

module.exports = { BagelNotFoundError }
