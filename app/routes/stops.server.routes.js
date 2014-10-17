'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var stops = require('../../app/controllers/stops');

	// Stops Routes
	app.route('/stops')
		.get(stops.list)
		.post(users.requiresLogin, stops.create);

	app.route('/stops/:stopId')
		.get(stops.read)
		.put(users.requiresLogin, stops.hasAuthorization, stops.update)
		.delete(users.requiresLogin, stops.hasAuthorization, stops.delete);

	// Finish by binding the Stop middleware
	app.param('stopId', stops.stopByID);
};