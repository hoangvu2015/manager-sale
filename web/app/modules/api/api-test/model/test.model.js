'use strict';

/**
* Module dependencies.
*/

import mongoose from 'mongoose'
import slug from 'slug'
var Schema = mongoose.Schema;

/**
*  Test Schema
*/
var TestSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill title',
		trim: true
	},
	slug: {
		type: String,
		default: '',
		trim: true
	},
	num: {
		type: Number,
		default: 1
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	thumb: {
		type: String,
		default: '',
		trim: true
	},
	gallery: [
		{
			type: String,
			default: '',
			trim: true
		}
	],
	date: {
		type: Date
	},
	date_range: {
		startDate: {
			type: Date
		},
		endDate: {
			type: Date
		}
	},
	category: [
		{
			type: Schema.ObjectId,
			ref: 'Category'
		}
	],
	option: {
		type: String
	},
	status: {
		type: Number,
		default: 1
	}
}, { collection: 'tests', timestamps: true });

export default mongoose.model('Test', TestSchema);
