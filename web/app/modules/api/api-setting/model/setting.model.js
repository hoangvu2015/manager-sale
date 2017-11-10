'use strict';

/**
* Module dependencies.
*/
import mongoose, { Schema } from 'mongoose';

/**
* Schema
*/
var SettingSchema = new Schema({
  key: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  value: {
    type: Schema.Types.Mixed,
    required: true
  },
  value_type: {
    type: String,
    default: 'string'
  },
  description: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  }
}, { collection: 'settings', timestamps: true, versionKey: false });

export default mongoose.model('Setting', SettingSchema);
