const handleSignin = (req, res, db, bcrypt) => {
	const {email , password} = req.body; 
	if(!email | !password){
		res.status(400).json('invalid entries');
	}
	db.select('email','hash').from('login')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash);
		if(isValid) {
			return db.select('*').from('users')
			.where('email', '=', req.body.email)
			.then(user => {
				if(user.length)
					res.json(user[0])
				else{
					res.status(400).json('unable to get user');
					console.log('not able to find user');
				}

			})
			.catch(err => { 
				res.status(400).json('unable to fetch user')
			})
		} else {
			res.status(400).json('wrong credentials')
		}
	})
	.catch(err => res.status(400).json('wrong credentials'))
	
} 
module.exports = {
	handleSignin : handleSignin
} 