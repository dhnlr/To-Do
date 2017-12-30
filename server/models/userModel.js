const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb://localhost:27017/todo');

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	}
})
UserSchema.plugin(uniqueValidator, { message: 'Error, {VALUE} already used.' });

const User = mongoose.model('User', UserSchema);

const create = (data, callback) => {
	User.create(data, (error, data)=>{
		if (!error) callback(null, data)
		else {
			callback(error, null)
		}
	})
}

const read = (callback) =>{
	User.find((err, users)=>{
		if (!err) {
			callback(users)
		}
	})	
}

const readId = (id, callback) => {
	User.findOne({'_id': ObjectId(id)}, (err, user)=>{
		if (!err) {
			callback(user)
		}
	})
}

const signInEmail = (email, callback) => {
	User.findOne({'email': email}, (err, user)=>{
		if (!err) {
			callback(user)
		}
		else {
			console.log(err)
		}
	})
}

const update = (id, data, callback) => {
	User.findOneAndUpdate({'_id': ObjectId(id)}, {$set: data}, {upsert: true, new : true},(error, data)=>{
		if (!error) {
			callback(null)
		}
		else {
			callback(error)
		}
	})
}

const destroy = (id, callback) => {
	User.remove({'_id': ObjectId(id)}, (error) => {
		if (!error) {
			callback(null)
		}
		else {
			callback(error)
		}
	})
}

module.exports = {User, create, read, readId, update, destroy, signInEmail};