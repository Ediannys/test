const express = require('express')
const route = express.Router()
const cors = require('cors')
const Sequelize = require('sequelize')

const db = require('../database/db.js')
route.use(cors())
process.env.SECRET_KEY = 'secret'


route.post('/tickets', async(req, res) => {

	try {
		const today = new Date()
		const ticketData = {
			user_id: req.body.user_id,
			issue: req.body.issue,
			status: req.body.status,
			created: today
		}
		const ticket = await db.ticket.create(ticketData);
		res.json(ticket);

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
})

route.get('/tickets', async (req, res) => {

	try {
		const tickets = await db.ticket.findAll()
		res.json(tickets)


	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}


})

route.get('/tickets/:id', async (req, res) => {

	try {

		const tickets = await db.ticket.findByPk(req.params.id);
		res.json(tickets);

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
})

route.get('/all_user_tickets', async (req, res) => {

	try {

		const tickets = await db.ticket.findAll({
			include: [{
				model: db.user,

			}]
		});
		res.json(tickets)

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');

	}
})

route.get('/user_tickets/:id', async (req, res) => {

	try {
		const id = req.params.id
		const tickets = await db.ticket.findAll({
			where: {
				user_id: id
			}
		});
		res.json(tickets)


	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');

	}

})

route.put('/tickets/:id', async (req, res) => {

	try {
		const today = new Date()
		const id = req.params.id
		const ticketData = {
			user_id: req.body.user_id,
			issue: req.body.issue,
			created: today
		}

		const ticket = await db.ticket.update(ticketData, {
			where: {
				id: id
			}
		});
		res.json(ticket)

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');

	}


})

route.put('/ticket_status/:id', async (req, res) => {

	try {

		const id = req.params.id
		const ticketData = {
			status: req.body.status,
		}
		const ticket = await db.ticket.update(ticketData, {
			where: {
				id: id
			}
		});
		res.json(ticket);

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}

})

route.delete('/tickets/:id', async (req, res) => {
	try {
		const id = req.params.id
		const ticket = await db.ticket.destroy({
			where: {
				id: id
			}
		});
		res.json(ticket);

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
})


module.exports = route;