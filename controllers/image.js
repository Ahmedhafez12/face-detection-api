const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey:'0256d4ee69d04350b952d285da545261'
});

const handleApiCall = (req, res) => {
	const {input} = req.body;
	app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
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