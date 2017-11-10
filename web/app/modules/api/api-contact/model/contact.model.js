'use strict';

/**
* Module dependencies.
*/

import mongoose from 'mongoose'
import slug from 'slug'
var Schema = mongoose.Schema;

/**
* Schema
*/
var ContactSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: false},
  address: {type: String, required: false},
  message: {type: String, required: true},
  status: {type: Number, required: false, default: 1},
}, { collection: 'contacts', timestamps: true });

export default mongoose.model('Contact', ContactSchema);
