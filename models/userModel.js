const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/todo');

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		lowercase: true,
		validate: {
			unique: function (value, done){
				this.model('User').count({ username: value }, function(err, count) {
			        if (err) {
			            return done(err);
			        } 
			        // If `count` is greater than zero, "invalidate"
			        done(!count);
				});
			}, 
			message: `${value} existed`
		}
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		default: 'User'
	}
})

const User = mongoose.model('User', UserSchema);

const create = (data, callback) => {
	User.create(data, (error, data)=>{
		if (!error) callback(null)
		else {
			callback(error)
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
	User.find({'_id': ObjectId(id)}, (err, user)=>{
		if (!err) {
			callback(user)
		}
	})
}

const signIn = (username, callback) => {
	User.find({'username': username}, (err, user)=>{
		if (!err) {
			callback(user)
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

module.exports = {create, read, readId, update, destroy, signIn, User};