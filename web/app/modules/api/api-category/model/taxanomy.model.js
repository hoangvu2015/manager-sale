'use strict';

/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose';

/**
 * Taxanomy Schema
 */
var TaxanomySchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill name',
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

export default mongoose.model('Taxanomy', TaxanomySchema);