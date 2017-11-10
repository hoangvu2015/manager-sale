'use strict';

/**
* Module dependencies.
*/
import mongoose, { Schema } from 'mongoose';

/**
* Schema
*/
var BannerSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill banner title',
    trim: true
  },
  subtitle: {
    type: String,
    default: '',
    trim: true
  },
  link: {
    type: String,
    default: '',
    trim: true
  },
  image: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: Number,
    default: 1
  },
  category: [{
    type: Schema.ObjectId,
    ref: 'Category'
  }],
  position: {
    type: String,
    default: 'right',
    trim: true,
    enum: ['home', 'right', 'top', 'bottom', 'left', 'middle']
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
}, { collection: 'banners', timestamps: true });

export default mongoose.model('Banner', BannerSchema);
