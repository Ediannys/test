const express = require('express')
const route = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const User = require('../models/User')
const db = require('../database/db.js')
route.use(cors())


process.env.SECRET_KEY = 'secret'


route.post('/register', async(req, res) => {
	try {
		const today = new Date()
		const userData = {
			role_id: req.body.role_id,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
			created: today
		}

		const user = await db.user.findOne({
			where: {
				email: req.body.email
			}
		})

		if (!user) {
			bcrypt.hash(req.body.password, 10, async(err, hash) => {
				if (err) throw err;
				userData.password = hash
				user = await db.user.create(userData)
				if (!user) res.json({
					status: user.email + ' Registered!'
				})

			})
		} else {
			res.json({
				error: 'User already exists'
			})
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');

	}
})

route.post('/login', async(req, res) => {

	try {
		const user = await db.user.findOne({
			where: {
				email: req.body.email
			}
		})
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.send(token)
      }
    } else {
      res.status(400).json({ error: 'User does not exist' })
    }
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
})


route.get('/profile', async(req, res) => {
	try {
		var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
		let user = await db.user.findOne({
			where: {
				id: decoded.id
			}
		})
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
})
module.exports = route;