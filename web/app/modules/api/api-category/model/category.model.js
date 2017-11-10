'use strict';

/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose';

var slug = require('slug');
/**
 * Category Schema
 */
var CategorySchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Category name',
        trim: true
    },
    slug: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
    },
    ordering: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: ''
    },
    taxanomy: {
        type: Schema.ObjectId,
        ref: 'Taxanomy'
    },
    type: {
        type: String,
        enum: ['product', 'post', 'banner']
    },
    status: {
        type: Number,
        default: 1
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    attrs: {
        title: String,
        description: String,
        keyword: String
    }
}, { collection: 'categories', timestamps: true });

CategorySchema.index({ slug: 1 });

export default mongoose.model('Category', CategorySchema);