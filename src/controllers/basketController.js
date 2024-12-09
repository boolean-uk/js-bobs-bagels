const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const basketService = require('../services/basketService')
const bagelService = require('../services/bagelService')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/basket')
  .get((req, res) => {
    res.send(basketService.getAll())
  })
  .post((req, res) => {
    const capacity = req.query.capacity
    const createdBasketUUID = basketService.add(capacity)
    const address = `http://${req.hostname}:${port}`
    res.status(201)
    res.setHeader('Location', `${address}/basket/${createdBasketUUID}`);
    res.send();
  })

app.route('/basket/:uuid')
  .get((req, res) => {
    try {
      const basket = basketService.getByUUID(req.params.uuid)
      res.send(basket)
    } catch (err) {
      res.status(404)
      res.send(err.message)
    }
  })
  .delete((req, res) => {
    try {
      basketService.removeByUUID(req.params.uuid)
      res.send()
    } catch (err) {
      res.status(404)
      res.send(err.message)
    }
  })

app.route('/basket/:uuid/bagels')
  .get((req, res) => {
    try {
      res.send(bagelService.getAll(req.params.uuid))
    } catch (err) {
      res.status(404)
      res.send(err.message)
    }
  })
  .post((req, res) => {
    try {
      const createdBagelUUID = bagelService.add(req.params.uuid, req.body)
      const address = `http://${req.hostname}:${port}`
      res.status(201)
      res.setHeader('Location', `${address}/basket/${req.params.uuid}/bagels/${createdBagelUUID}`)
      res.send()
    } catch (err) {
      res.status(404)
      res.send(err.message)
    }
  })

app.route('/basket/:basketUUID/bagels/:bagelUUID')
  .delete((req, res) => {
    try {
      bagelService.remove(req.params.basketUUID, req.params.bagelUUID)
      res.send()
    } catch (err) {
      res.status(404)
      res.send(err.message)
    }
  })

app.route('/basket/:uuid/cost')
  .get((req, res) => {
    try {
      const basket = basketService.getByUUID(req.params.uuid)
      res.send({
        cost: basket.totalCost()
      })
    } catch (err) {
      res.status(404)
      res.send(err.message)
    }
  })

app.route('/basket/:uuid/bagelAmount')
  .get((req, res) => {
    try {
      const basket = basketService.getByUUID(req.params.uuid)
      res.send({
        bagelAmount: basket.bagelAmount()
      })
    } catch (err) {
      res.status(404)
      res.send(err.message)
    }
  })

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
