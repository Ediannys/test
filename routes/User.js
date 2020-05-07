const express = require('express')
const route = express.Router()
const cors = require('cors')

const Ticket = require('../models/Ticket')
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

route.get('/users/tickets/:id', (req, res) => {
    
    Ticket.findAll({
        where:{
            id_user: req.params.id
        }
    }).then(tickets => {
        res.json(tickets);
      })
      .catch(err => {
        res.json('error: ' + err)
    })
})



module.exports = route;

