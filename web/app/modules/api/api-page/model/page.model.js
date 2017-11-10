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
var PageSchema = new Schema({
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
    identity: {
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
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    status: {
        type: Number,
        default: 1
    },
}, { collection: 'pages', timestamps: true });

PageSchema.index({slug: 1});

export default mongoose.model('Page', PageSchema);