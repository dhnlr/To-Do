const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const Todo = require('../models/todoModel.js')

module.exports = (req, res, next) =>{
	let todo = Todo.findOne({'author': ObjectId(req.decoded.id)})
	if (req.decoded && todo) {
		next()
	}
	else {
		res.status(403).json({
			message: 'User not authorize'
		})
	}
}