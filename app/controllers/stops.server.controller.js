'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Stop = mongoose.model('Stop'),
	_ = require('lodash');

/**
 * Create a Stop
 */
exports.create = function(req, res) {
	var stop = new Stop(req.body);
	stop.user = req.user;

	stop.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stop);
		}
	});
};

/**
 * Show the current Stop
 */
exports.read = function(req, res) {
	res.jsonp(req.stop);
};

/**
 * Update a Stop
 */
exports.update = function(req, res) {
	var stop = req.stop ;

	stop = _.extend(stop , req.body);

	stop.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stop);
		}
	});
};

/**
 * Delete an Stop
 */
exports.delete = function(req, res) {
	var stop = req.stop ;

	stop.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stop);
		}
	});
};

/**
 * List of Stops
 */
exports.list = function(req, res) { Stop.find().sort('-created').populate('user', 'displayName').exec(function(err, stops) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stops);
		}
	});
};

/**
 * Stop middleware
 */
exports.stopByID = function(req, res, next, id) { Stop.findById(id).populate('user', 'displayName').exec(function(err, stop) {
		if (err) return next(err);
		if (! stop) return next(new Error('Failed to load Stop ' + id));
		req.stop = stop ;
		next();
	});
};

/**
 * Stop authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.stop.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};