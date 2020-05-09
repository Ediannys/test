const express = require('express')
const route = express.Router()
const cors = require('cors')

const User = require('../models/User')
route.use(cors())


route.get('/users', (req, res) => {
    
    User.findAll() .then(users => {
         res.json(users)
        })
        .catch(err => {
            res.json('error: ' + err)
        })
})


module.exports = route;

