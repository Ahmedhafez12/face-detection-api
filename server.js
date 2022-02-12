const express = require('express'); 
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL,
   	ssl:true
  }
});

const app = express(); 
//const ABC = process.env.ABC;

app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{	
			id: '1234',
			name: 'Jenny',
			email: 'jenny@mail.com',
			password: '12345',
			counter: 0,
			joined: new Date()
		}, 
		{
			id: '1235',
			name: 'Joseph',
			email: 'joseph@mail.com',
			password: '12345',
			counter: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req, res) => {
	res.send('it is working');
})

app.post('/signin', (req, res) => {signin.handleSignin(req,res,db,bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req,res,db)});

app.put('/image', (req, res) => {image.handleImage(req,res,db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000, () => {
	console.log(`this is working! ${process.env.PORT}`);
})
