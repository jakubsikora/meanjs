'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Serviceroute = mongoose.model('Serviceroute');

/**
 * Globals
 */
var user, serviceroute;

/**
 * Unit tests
 */
describe('Serviceroute Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			serviceroute = new Serviceroute({
				name: 'Serviceroute Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return serviceroute.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			serviceroute.name = '';

			return serviceroute.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Serviceroute.remove().exec();
		User.remove().exec();

		done();
	});
});