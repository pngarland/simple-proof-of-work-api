const crypto = require('crypto');
const _ = require('lodash')
const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000

function hex2bin(data) {
  return _.map(data, (i) => {
    return parseInt(i, 16).toString(2).padStart(4, '0')
  }).join('')
}

function countLeadingZeroBits(str) {
  const hash = crypto
    .createHash('sha256')
    .update(str)
    .digest('hex')

  let result = 0
  _.some(hex2bin(hash), (char) => {
    if (_.isEqual(char, '0')) {
      result = result + 1
    } else {
      return true
    }
  })
  return result
}

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .put("/find", (req, res) => {
    let finished = false
    let w = 0

    const c = req.body.c
    const n = req.body.n

    do {
      w++;
      if (_.isEqual(countLeadingZeroBits(`${c}${w}`), n)) {
        finished = true
      }
    }
    while (finished != true);

    res.json({result: w})
  })
  .put("/verify", (req, res) => {
    let message = 'False'

    const c = req.body.c
    const n = req.body.n
    const w = req.body.w

    if (_.isEqual(countLeadingZeroBits(`${c}${w}`), n)) {
      message = 'True'
    }

    res.json({result: message})
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
