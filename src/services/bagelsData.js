import bagelsJSON from '../data/inventory.json' assert { type: 'json' }

const bagelsData = bagelsJSON.inventory

const findBagelById = (bagelId) => {
  return bagelsData.find((bagel) => bagel.sku === bagelId)
}

export { bagelsData, findBagelById }
