const { MongoClient } = require('mongodb')
const express = require('express')
const { inventory } = require('../inventory.json')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const dbName = 'Inventory'
const collectionName = 'inventory'
const uri =
  'mongodb+srv://???:???@??????.mongodb.net/?retryWrites=true&w=majority'
let client
let db
let basket

app.listen(3000, async function () {
  if (!db) {
    await initializeDatabase()
  }
  basket = new Basket(50)
  await basket.add('BGLO', 5)
  await basket.add('BGLP', 20)
  console.log('Example app listening on port 3000!')
})

async function initializeDatabase() {
  client = new MongoClient(uri)
  try {
    await client.connect()
    db = client.db(dbName)
    const collection = db.collection(collectionName)
    await collection.drop()
    await collection.insertMany(inventory)
    console.log('Inventory items added to the database successfully.')
  } catch (e) {
    console.error('Error initializing database:', e)
  }
}

app.get('/basket', async (req, res) => {
  try {
    const table = generateTable(basket.shoppingList)
    res.send(table)
  } catch (e) {
    console.error('Error fetching items from MongoDB:', e)
    return res.status(500).send('Internal Server Error')
  }
})

app.post('/basket/add', async (req, res) => {
  try {
    const { sku, amount } = req.query
    const result = await basket.add(sku, amount)
    res.json(result)
  } catch (e) {
    console.error('Error adding item to the basket:', e)
    return res.status(500).send('Internal Server Error')
  }
})

app.delete('/basket/remove', async (req, res) => {
  try {
    const { sku } = req.query
    const result = basket.remove(sku)
    res.json(result)
  } catch (e) {
    console.error('Error removing item from the basket:', e)
    return res.status(500).send('Internal Server Error')
  }
})

app.put('/basket/capacity', async (req, res) => {
  try {
    const { newCapacity } = req.query
    const result = basket.changeCapacity(newCapacity)
    res.json(result)
  } catch (e) {
    console.error('Error changing basket capacity:', e)
    return res.status(500).send('Internal Server Error')
  }
})

app.get('/basket/price/:sku', async (req, res) => {
  try {
    const { sku } = req.params
    const result = await basket.checkPrice(sku)
    res.json(result)
  } catch (e) {
    console.error('Error fetching item price:', e)
    return res.status(500).send('Internal Server Error')
  }
})

app.get('/basket/total-price', async (req, res) => {
  try {
    const totalPrice = basket.totalPrice()
    res.json({ totalPrice })
  } catch (e) {
    console.error('Error calculating total price:', e)
    return res.status(500).send('Internal Server Error')
  }
})

class Basket {
  constructor(capacity) {
    this.shoppingList = []
    this.capacity = capacity
  }

  async add(sku, amount = 1) {
    if (this.capacity > this.shoppingList.length + amount) {
      const itemToAdd = await db
        .collection(collectionName)
        .findOne({ sku: sku })

      if (itemToAdd) {
        const inShoppingList = this.shoppingList.find(
          (item) => item.sku === sku
        )
        if (inShoppingList) {
          inShoppingList.quantity += amount
        } else this.shoppingList.push({ ...itemToAdd, quantity: amount })
      }
    } else return 'basket is full'
    return this.shoppingList
  }

  remove(sku) {
    const itemToRemove = this.shoppingList.find((item) => item.sku === sku)
    if (!itemToRemove) return 'item doesnt exist in basket'
    else if (itemToRemove.quantity > 1) itemToRemove.quantity--
    else {
      this.shoppingList.splice(this.shoppingList.indexOf(itemToRemove), 1)
    }
    return this.shoppingList
  }

  changeCapacity(newCapacity) {
    if (newCapacity > this.shoppingList.length) this.capacity = newCapacity
    else return 'cannot change capacity'
    return this.capacity
  }

  async checkPrice(sku) {
    const item = await db.collection(collectionName).findOne({ sku: sku })
    if (item) return item.price
    else return 'item not found in inv'
  }

  totalPrice() {
    let totalprice = 0
    this.shoppingList.forEach((element) => {
      totalprice += element.price * element.quantity
    })
    return totalprice.toFixed(2)
  }
}

function generateTable(shoppingList) {
  let table = '<table border="1">'
  table +=
    '<tr><th>Name</th><th>Variant</th><th>Quantity</th><th>Price</th></tr>'

  shoppingList.forEach((item) => {
    table += '<tr>'
    table += `<td>${item.name}</td>`
    table += `<td>${item.variant}</td>`
    table += `<td>${item.quantity}</td>`
    table += `<td>${item.price}</td>`
    table += '</tr>'
  })

  table += '</table>'
  return table
}
