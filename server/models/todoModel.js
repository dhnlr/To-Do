const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
        default: false
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	}
})

const Todo = mongoose.model('Todo', TodoSchema);

const create = (data, callback) => {
	Todo.create(data, (error, data)=>{
		if (!error) callback(null, data)
		else {
			callback(error, null)
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

const readAuth = (auth, callback) => {
	Todo.find({'author': ObjectId(auth)}, (err, todo) => {
		if (!err) {
			callback(todo)
		}
	})
}

const complete = (id, callback) => {
	Todo.findOne({'_id': ObjectId(id)}, (err, todoFind)=>{
		Todo.findOneAndUpdate({'_id': ObjectId(id)}, {$set: {status: !todoFind.status}}, {upsert: true, new : true},(error, data)=>{
			if(!error){
				callback(null)
			}
		})
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

module.exports = {Todo, create, read, readId, readAuth, complete, update, destroy};