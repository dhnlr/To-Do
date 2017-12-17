const {create, read, readId, update, destroy, User} = require('../models/userModel');

class UserController {
	static getUser(req, res){
		read(users=>{
			if (users) {
				res.status(200).json({
					message: 'Users summoned',
					data: users,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static getUserId(req,res){
		readId(req.params.id, (user)=>{
			if (user) {
				res.status(200).json({
					message: 'Users summoned',
					data: user,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static createUser(req,res){
		let data = {
			username: req.body.username,
			password: req.body.password
		}
		create(data, (error)=>{
			if (!error) {
				res.status(200).json({
					message: 'Users created',
					data: data,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured',
					data: error
				})
			}
		})
	}
	static updateUser(req,res){
		readId(req.params.id, (user)=>{
			let data = {
				username: req.body.username || user[0].username,
				password: req.body.password || user[0].password,
			}
			update(req.params.id, data, (error)=>{
				if (!error) {
					res.status(200).json({
						message: 'Users updated',
						data: data,
					})
				}
				else {
					res.status(400).json({
						message: 'Error occured',
						data: error
					})
				}
			})
		})
	}
	static deleteUser(req,res){
		destroy(req.params.id, (error)=>{
			if (!error) {
				res.status(200).json({
					message: 'Users delete'
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured',
					data: error
				})
			}
		})
	}
}

module.exports = UserController;