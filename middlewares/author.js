module.exports = (req, res, next) =>{
	if (req.decoded && req.decoded.role == 'admin') {
		next()
	}
	else {
		res.status(403).json({
			message: 'User not authorize'
		})
	}
}