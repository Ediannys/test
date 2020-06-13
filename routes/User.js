const express = require('express')
const route = express.Router()
const cors = require('cors')

const db = require('../database/db.js')
route.use(cors())


route.get('/users', async (req, res) => {

	try{
		const users= db.user.findAll();
		res.json(users)

	}catch(err){
		console.error(err.message);
    	res.status(500).send('Server Error');

	}
})


module.exports = route;