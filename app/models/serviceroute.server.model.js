'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Serviceroute Schema
 */
var ServicerouteSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Serviceroute name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Serviceroute', ServicerouteSchema);