module.exports = (req, res, next) =>{
	if (req.decoded && (req.decoded.id == req.params.id || req.decoded.role == 'admin')) {
		next()
	}
	else {
		res.status(403).json({
			message: 'Other user cannot modify or find another'
		})
	}
}