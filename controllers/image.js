const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey:'de24ba7f7eec497a95d403c448077725'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err =>{
		res.status(400).json('cannot use API');
	})
}

const handleImage = (req,res,db) => {
	const { id } = req.body; 

	db('users').where('id', '=', id)
	.increment('counter', 1)
	.returning('counter')
	.then(counter => {
		res.json(counter[0]);
	})
	.catch(err => {
		res.status(400).json('user not identified');
	})
}
module.exports = {
	handleImage : handleImage, 
	handleApiCall: handleApiCall
}