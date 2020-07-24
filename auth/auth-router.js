const router = require('express').Router();
const api = require('../database/authModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');

let generateToken = (user) => {
	const payload = {
		userID: user.id,
		username: user.username,
	};

	const secret = secrets.jwtSecret;
	const options = {
		expiresIn: '1d',
	};

	return jwt.sign(payload, secret, options);
};

//Path starts in /api/auth/

router.post('/register', (req, res) => {
	if (req.body.username && req.body.password) {
		let hashedPass = bcrypt.hashSync(req.body.password, 12);

		api
			.newAccount({
				username: req.body.username,
				password: hashedPass,
			})
			.then((returned) => {
				res.status(201).json({ message: 'Account created!' });
			})
			.catch((error) => {
				res.status(500).json({ message: 'Server error', error: error });
			});
	} else {
		res.status(400).json({ message: 'Provide a username and password.' });
	}
});

router.post('/login', (req, res) => {
	if (req.body.username && req.body.password) {
		let { username, password } = req.body;
		api
			.findByUsername(username)
			.then((found) => {
				if (found && bcrypt.compareSync(password, found.password)) {
					const token = generateToken(found);
					res.status(200).json({ message: 'Login Successful', token });
				} else {
					res.status(400).json({ message: 'Incorrect credentials' });
				}
			})
			.catch((error) => {
				res.status(500).json({ message: 'Server error', error: error });
			});
	} else {
		res.status(400).json({ message: 'Provide a username and password' });
	}
});

module.exports = router;
