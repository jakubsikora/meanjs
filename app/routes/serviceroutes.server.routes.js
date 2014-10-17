'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var serviceroutes = require('../../app/controllers/serviceroutes');

	// Serviceroutes Routes
	app.route('/serviceroutes')
		.get(serviceroutes.list)
		.post(users.requiresLogin, serviceroutes.create);

	app.route('/serviceroutes/:servicerouteId')
		.get(serviceroutes.read)
		.put(users.requiresLogin, serviceroutes.hasAuthorization, serviceroutes.update)
		.delete(users.requiresLogin, serviceroutes.hasAuthorization, serviceroutes.delete);

	// Finish by binding the Serviceroute middleware
	app.param('servicerouteId', serviceroutes.servicerouteByID);
};