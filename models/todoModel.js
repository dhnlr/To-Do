const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/todo');

const TodoSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: 'yet'
	}
})

const Todo = mongoose.model('Todo', TodoSchema);

const create = (data, callback) => {
	Todo.create(data, (error, data)=>{
		if (!error) callback(null)
		else {
			callback(error)
		}
	})
}

const read = (callback) =>{
	Todo.find((err, todos)=>{
		if (!err) {
			callback(todos)
		}
	})	
}

const readId = (id, callback) => {
	Todo.find({'_id': ObjectId(id)}, (err, todo)=>{
		if (!err) {
			callback(todo)
		}
	})
}

const update = (id, data, callback) => {
	Todo.findOneAndUpdate({'_id': ObjectId(id)}, {$set: data}, {upsert: true, new : true},(error, data)=>{
		if (!error) {
			callback(null)
		}
		else {
			callback(error)
		}
	})
}

const destroy = (id, callback) => {
	Todo.remove({'_id': ObjectId(id)}, (error) => {
		if (!error) {
			callback(null)
		}
		else {
			callback(error)
		}
	})
}

module.exports = {create, read, readId, update, destroy, Todo};