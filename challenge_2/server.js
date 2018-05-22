var express = require('express')
var http = require('http')
var parser = require('body-parser')

var app = express()

app.use(express.static('./client'))
app.use(parser.json())
app.get('/app.js', function(req, res) {
  res.sendFile('./client/app.js')
})
app.post('/json', function(req, res) {
  var storage = []
  function store(child) {
    var cache = []
    for (var key in child) {
      if (key !== 'children') cache.push(child[key])
    }
    storage.push(cache)
    var recurse = child.children
    recurse.forEach(item => {
      store(item)
    })
  }
  var parsed = req.body
  var children = parsed.children
  for (var property in parsed) {
    !storage[0] ? storage.push([property]) : storage[0].push(property)
    !storage[1] ? storage.push([parsed[property]]) : storage[1].push(parsed[property])
  }
  storage.forEach(item => {
    item.pop()
  })
  children.forEach(child => {
    store(child)
  })
  res.end(storage.join('\n'))
})
http.createServer(app).listen(8080)
console.log("Listening on port 8080")
