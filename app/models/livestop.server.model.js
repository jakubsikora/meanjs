'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Livestop Schema
 */
var LivestopSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Livestop name',
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

mongoose.model('Livestop', LivestopSchema);