const jwt= require('jsonwebtoken');

module.exports = (req, res, next) =>{
	jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded)=>{
		if (!err) {
			req.decoded = decoded;
			next();
		}
		else {
			res.status(403).json({
				message: 'User not authentic'
			})
		}
	})
}