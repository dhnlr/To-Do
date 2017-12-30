const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const {Todo, create, read, readId, readAuth, complete, update, destroy} = require('../models/todoModel.js')

module.exports = (req, res, next) =>{
	readAuth(req.decoded.userId, (todo)=>{
		if (req.decoded && todo) {
			next()
		}
		else {
			res.status(403).json({
				message: 'User not authorize'
			})
		}
	})
}