const server = require('../api/server.js');
const request = require('supertest');

test('Register returns 400 without a username or password provided', () => {
	return request(server).post('/api/auth/register').expect(400);
});

test('Register returns server error', () => {
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

test('Login error works', () => {
	return request(server)
		.post('/api/auth/login/')
		.then((res) => {
			expect(res.body.message).toBe('Provide a username and password');
		});
});
