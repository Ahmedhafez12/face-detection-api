const handleRegister = (req, res, db , bcrypt) => {
	const {email, name, password} = req.body;
	if(!email | !name | !password){
		return res.status(400).json("invalid entries");
	}
	const hash = bcrypt.hashSync(password);

	db('login')
	.returning('*')
	.insert({
		hash:hash,
		email:email
	})
	.then(data => {
		res.json(data[0]);
	})
	.catch(err => res.status(400).json("cannot % register!"))	

	 db('users')
		.returning('*')
		.insert({
			email: email,
			name: name, 
			joined: new Date()
		})
		.then(user => {
			res.json(user[0]);
		})
		.catch(err => res.status(400).json("cannot register!"))	
		
} 
module.exports = {
	handleRegister: handleRegister
}