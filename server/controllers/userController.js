const {User, create, read, readId, update, destroy, signInEmail} = require('../models/userModel');
const jwt = require('jsonwebtoken');
const FB = require('fb')

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
	static signIn(req, res){
		FB.api(`/${req.body.userId}`, 'GET', {fields: ['email'], access_token: req.body.accessToken}, (response)=>{
			signInEmail(response.email, (user)=>{
				if (user.length == 0) {
					let data = { email: response.email}
					create(data, (error, userS)=>{
						if (!error) {
							let payload = {userId : data._id, email: data.email}
							jwt.sign(payload, process.env.SECRET_KEY, (errr, token)=>{
								if (!token) {
									res.status(403).json({message: 'User and password wrong', error: errr})
								} else {
									req.headers.token = token;
									res.status(200).json({
										message: 'User created and signed in successfully',
										data: userS,
										token: token
									})
								}
							})
						}
					})
				} else{
					let payload = {userId : user._id, email : user.email}
					jwt.sign(payload, process.env.SECRET_KEY, (error, token)=>{
						if (error) {
							res.status(403).json({message: 'User and password wrong', error: error})
						} else {
							req.headers.token = token;
							res.status(200).json({
								message: 'User signed in successfully',
								data: user,
								token: token
							})
						}
					})
				}
			})
		})
	}
	static updateUser(req,res){
		readId(req.params.id, (user)=>{
			let data = {
				email: req.body.email || user[0].email,
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