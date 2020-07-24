const router = require('express').Router();
const api = require('../database/authModel.js');
const bcrypt = require('bcryptjs');

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
  // implement login
});

module.exports = router;
