var express = require('express')
var mongoose = require('mongoose')
var http = require('http')
var parser = require('body-parser')
var Schema = mongoose.Schema

var app = express()
mongoose.connect('mongodb+srv://simon_stroh:etrelibre@cluster0-e0goe.mongodb.net/test?retryWrites=true')
var db = mongoose.connection
var customerSchema = new Schema({
  name: String,
  email: String,
  password: String
})
var shippingSchema = new Schema({
  name: String,
  address: String,
  zip: String
})
var cardSchema = new Schema({
  number: Number,
  cvv: Number,
  date: Number
})
var Customer = mongoose.model('Customer', customerSchema)
var Shipment = mongoose.model('Shipment', shippingSchema)
var Card = mongoose.model('Card', cardSchema)


app.use(parser.json())
app.use(express.static('./public'))
// app.get('/app.js', function(req, res) {
//   console.log("Serving GET")
//   res.sendFile(__dirname, './public/app.js')
// })
app.post('/users', function(req, res) {
  console.log("Serving request type POST for url", req.url)
  console.log("Object being sent is a(n)", typeof req.body)
  console.log(req.body)
  console.log("Object contains:", req.body.password, req.body.address, req.body.cvv)
  if (req.body.password) {
    var newCustomer = new Customer(req.body)
    newCustomer.save((err, newCustomer) => {
      if (err) console.log(err)
      console.log("New Customer\n", newCustomer)
    })
    res.end()
  } else if (req.body.address) {
    var newShipment = new Shipment(req.body)
    newShipment.save((err, newShipment) => {
      if (err) console.log(err)
      console.log("New Shipment\n", newShipment)
    })
    res.end()
  } else if (req.body.cvv) {
    var newCard = new Card(req.body)
    newCard.save((err, newCard) => {
      if (err) console.log(err)
      console.log("New Card\n", newCard)
    })
    res.end()
  }
})
http.createServer(app).listen(27017)
