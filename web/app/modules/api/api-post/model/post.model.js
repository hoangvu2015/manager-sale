'use strict';

/**
* Module dependencies.
*/
import mongoose, { Schema } from 'mongoose';

/**
* Schema
*/
var PostSchema = new Schema({
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
  teaser: {
    type: String,
    default: '',
    trim: true
  },
  gallery: {
    type: Array,
    default: []
  },
  image: {
    type: String,
    default: '',
    trim: true
  },
  thumb: {
    type: String,
    default: '',
    trim: true
  },
  content: {
    type: String,
    default: '',
    required: 'Please fill content',
    trim: true
  },
  feature: {
    type: Number,
    default: 0
  },
  // [{ id: 1, name: 'Public' }, { id: 2, name: 'Unpublic' }, { id: 0, name: 'Draft' }],
  status: {
    type: Number,
    default: 1
  },
  category: [{
    type: Schema.ObjectId,
    ref: 'Category'
  }],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  attrs: {
    title: String,
    description: String,
    keyword: String
  }
}, { collection: 'posts', timestamps: true });

PostSchema.index({ slug: 1 });

export default mongoose.model('Post', PostSchema);
