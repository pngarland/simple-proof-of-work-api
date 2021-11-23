const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .put("/find", (req, res) => {
    res.json({ message: "foo" })
  })
  .put("/verify", (req, res) => {
    res.json({ message: "True" })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
