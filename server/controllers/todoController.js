const {Todo, create, read, readId, readAuth, complete, update, destroy} = require('../models/todoModel');

class TodoController {
	static getTodo(req, res){
		readAuth(req.decoded.userId, (todo) =>{
			if (todo) {
				res.status(200).json({
					message: 'Todos summoned',
					data: todo,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static getTodoId(req,res){
		readId(req.params.id, (todo)=>{
			if (todo) {
				res.status(200).json({
					message: 'Todos summoned',
					data: todo,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static createTodo(req,res){
		let data = {
			title: req.body.title,
			author:req.decoded.userId
		}
		create(data, (error, dataS)=>{
			if (!error) {
				res.status(200).json({
					message: 'Todos created',
					data: dataS,
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
	static updateTodo(req,res){
		readId(req.params.id, (todo)=>{
			let data = {
				title: req.body.title || todo[0].title
			}
			update(req.params.id, data, (error)=>{
				if (!error) {
					res.status(200).json({
						message: 'Todos updated',
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
	static completeTodo(req,res){
		complete(req.params.id, (error, data)=>{
			if (!error) {
				res.status(200).json({
					message: 'Todos completed',
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
	static deleteTodo(req,res){
		destroy(req.params.id, (error)=>{
			if (!error) {
				res.status(200).json({
					message: 'Todos delete'
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

module.exports = TodoController;