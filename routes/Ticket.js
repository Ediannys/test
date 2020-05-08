const express = require('express')
const route = express.Router()
const cors = require('cors')
const Sequelize = require('sequelize')
const { QueryTypes } = require('sequelize');



const db = require('../database/db.js')
const Ticket = require('../models/Ticket')
const User = require('../models/User')

route.use(cors())


process.env.SECRET_KEY = 'secret'



route.post('/tickets', (req, res) => {
    const today = new Date()
    const ticketData = {
        user_id: req.body.user_id,
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

route.get('/all_user_tickets', (req, res) => {
    
    db.sequelize.query("SELECT * FROM users INNER JOIN tickets ON users.id = tickets.user_id", { type: QueryTypes.SELECT }).then(tickets => {
        res.json(tickets)
       })
       .catch(err => {
           res.json('error: ' + err)
       });
})

route.put('/tickets/:id', (req, res) => {
    const today = new Date()
    const ticketData = {
        user_id: req.body.user_id,
        issue: req.body.issue,
        requested_ticket: req.body.requested_ticket,
        created: today
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



module.exports = route;