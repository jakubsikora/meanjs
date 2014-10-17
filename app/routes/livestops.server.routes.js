'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var livestops = require('../../app/controllers/livestops');

	// Livestops Routes
	app.route('/livestops')
		.get(livestops.list)
		.post(users.requiresLogin, livestops.create);

	app.route('/livestops/:livestopId')
		.get(livestops.read)
		.put(users.requiresLogin, livestops.hasAuthorization, livestops.update)
		.delete(users.requiresLogin, livestops.hasAuthorization, livestops.delete);

	// Finish by binding the Livestop middleware
	app.param('livestopId', livestops.livestopByID);
};