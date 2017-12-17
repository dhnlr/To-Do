const {create, read, readId, update, destroy, Todo} = require('../models/todoModel');

class TodoController {
	static getTodo(req, res){
		read(todos=>{
			if (todos) {
				res.status(200).json({
					message: 'Todos summoned',
					data: todos,
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
			todoname: req.body.todoname,
			password: req.body.password
		}
		create(data, (error)=>{
			if (!error) {
				res.status(200).json({
					message: 'Todos created',
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
	static updateTodo(req,res){
		readId(req.params.id, (todo)=>{
			let data = {
				todoname: req.body.todoname || todo[0].todoname,
				password: req.body.password || todo[0].password,
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