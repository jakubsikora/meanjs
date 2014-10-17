'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Serviceroute = mongoose.model('Serviceroute'),
	_ = require('lodash');

/**
 * Create a Serviceroute
 */
exports.create = function(req, res) {
	var serviceroute = new Serviceroute(req.body);
	serviceroute.user = req.user;

	serviceroute.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceroute);
		}
	});
};

/**
 * Show the current Serviceroute
 */
exports.read = function(req, res) {
	res.jsonp(req.serviceroute);
};

/**
 * Update a Serviceroute
 */
exports.update = function(req, res) {
	var serviceroute = req.serviceroute ;

	serviceroute = _.extend(serviceroute , req.body);

	serviceroute.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceroute);
		}
	});
};

/**
 * Delete an Serviceroute
 */
exports.delete = function(req, res) {
	var serviceroute = req.serviceroute ;

	serviceroute.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceroute);
		}
	});
};

/**
 * List of Serviceroutes
 */
exports.list = function(req, res) { Serviceroute.find().sort('-created').populate('user', 'displayName').exec(function(err, serviceroutes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceroutes);
		}
	});
};

/**
 * Serviceroute middleware
 */
exports.servicerouteByID = function(req, res, next, id) { Serviceroute.findById(id).populate('user', 'displayName').exec(function(err, serviceroute) {
		if (err) return next(err);
		if (! serviceroute) return next(new Error('Failed to load Serviceroute ' + id));
		req.serviceroute = serviceroute ;
		next();
	});
};

/**
 * Serviceroute authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.serviceroute.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};