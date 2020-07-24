const server = require('../api/server.js');
const request = require('supertest');

test('Register returns 400 without a body provided', () => {
	return request(server).post('/api/auth/register').expect(400);
});

test('Register returns json when no password is provided', () => {
	return request(server)
		.post('/api/auth/register')
		.send({ username: 'anything' })
		.then((res) => {
			expect(res.body.message).toBe('Provide a username and password.');
		});
});

test('Register returns json when no username is provided', () => {
	return request(server)
		.post('/api/auth/register')
		.send({ password: 'anything' })
		.then((res) => {
			expect(res.body.message).toBe('Provide a username and password.');
		});
});

test('Register returns server error if username already exists', () => {
	return request(server)
		.post('/api/auth/register')
		.send({ username: 'user1', password: 'user1' })
		.then((res) => {
			expect(res.body.message).toBe('Server error');
		});
});

test('Login works', () => {
	return request(server)
		.post('/api/auth/login/')
		.send({ username: 'user1', password: 'user1' })
		.then((res) => {
			expect(res.body.message).toBe('Login Successful');
		});
});

test('Login returns json if there is no req.body', () => {
	return request(server)
		.post('/api/auth/login/')
		.then((res) => {
			expect(res.body.message).toBe('Provide a username and password');
		});
});

test('Login returns json if there is no password', () => {
	return request(server)
		.post('/api/auth/login/')
		.send({ username: 'user1' }) 
		.then((res) => {
			expect(res.body.message).toBe('Provide a username and password');
		});
});

test('Login returns json if password is incorrect', () => {
	return request(server)
		.post('/api/auth/login/')
		.send({ username: 'user1', password: 'wrongpass' })
		.then((res) => {
			expect(res.body.message).toBe('Incorrect credentials');
		});
});

test('Get to jokes endpoint returns a message if no token is provided', () => {
    return request(server)
    .get('/api/jokes')
    .then(res => {
        expect(res.body.message).toBe('Provide a token');
    })
});