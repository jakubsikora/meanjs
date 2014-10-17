'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Livestop = mongoose.model('Livestop'),
	_ = require('lodash');

/**
 * Create a Livestop
 */
exports.create = function(req, res) {
	var livestop = new Livestop(req.body);
	livestop.user = req.user;

	livestop.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(livestop);
		}
	});
};

/**
 * Show the current Livestop
 */
exports.read = function(req, res) {
	res.jsonp(req.livestop);
};

/**
 * Update a Livestop
 */
exports.update = function(req, res) {
	var livestop = req.livestop ;

	livestop = _.extend(livestop , req.body);

	livestop.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(livestop);
		}
	});
};

/**
 * Delete an Livestop
 */
exports.delete = function(req, res) {
	var livestop = req.livestop ;

	livestop.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(livestop);
		}
	});
};

/**
 * List of Livestops
 */
exports.list = function(req, res) { Livestop.find().sort('-created').populate('user', 'displayName').exec(function(err, livestops) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(livestops);
		}
	});
};

/**
 * Livestop middleware
 */
exports.livestopByID = function(req, res, next, id) { Livestop.findById(id).populate('user', 'displayName').exec(function(err, livestop) {
		if (err) return next(err);
		if (! livestop) return next(new Error('Failed to load Livestop ' + id));
		req.livestop = livestop ;
		next();
	});
};

/**
 * Livestop authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.livestop.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};