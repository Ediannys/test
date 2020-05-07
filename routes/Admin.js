const express = require('express')
const route = express.Router()
const cors = require('cors')



const User = require('../models/User')
const Ticket = require('../models/Ticket')
route.use(cors())


process.env.SECRET_KEY = 'secret'



route.post('/tickets', (req, res) => {
    const today = new Date()
    const ticketData = {
        id_user: req.body.id_user,
        issue: req.body.issue,
        requested_ticket: req.body.requested_ticket,
        created: today
    }
    
    Ticket.create(ticketData)
    .then(ticket => {
        res.json({ status: ticket.issue + ' Ticket agregado!' })
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

route.get('/tickets', (req, res) => {
    
    Ticket.findAll() .then(tickets => {
         res.json(tickets)
        })
        .catch(err => {
            res.json('error: ' + err)
        })
})

route.get('/tickets/:id', (req, res) => {
    
    Ticket.findByPk(req.params.id).then(ticket => {
        res.json(ticket);
      })
})

route.put('/tickets/:id', (req, res) => {

    const ticketData = {
        id_user: req.body.id_user,
        issue: req.body.issue,
        requested_ticket: req.body.requested_ticket,
        created: req.body.today
    }
    Ticket.update(ticketData, { where: {id: req.params.id} })
    .then(() => {
        res.json({ message:' Ticket actualizado!' })
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

route.delete('/tickets/:id', (req, res) => {

    const id = req.params.id
    Ticket.destroy({where: {id:id}})
    .then(() => {
        res.json({ message:' Ticket eliminado!' })
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

route.get('/users', (req, res) => {
    
    User.findAll() .then(users => {
         res.json(users)
        })
        .catch(err => {
            res.json('error: ' + err)
        })
})

module.exports = route;

