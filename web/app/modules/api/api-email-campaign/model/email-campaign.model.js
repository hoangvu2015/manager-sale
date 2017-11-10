'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var slug = require('slug');
/**
 * Campaign Schema
 */
var EmailCampaignSchema = new Schema({
    title: {
        type: String,
        required: 'Please fill campaign title',
        trim: true
    },
    slug: {
        type: String,
        trim: true,
        required: 'Please fill campaign slug',
        unique: 'Slug existed'
    },
    templatePath: {
        type: String,
        trim: true,
        required: 'Please fill campaign template path',
        unique: 'templatePath existed'
    },
    templates: {
        type: [{
            type: String
        }],
        required: 'Please fill campaign templates'
    },
    status: {
        type: Number,
        default: 1
    }
}, {
    versionKey: false, // You should be aware of the outcome after set to false
    collection: 'emailcampaigns', 
    timestamps: true
});

EmailCampaignSchema.pre('update', function (next) {
    if (!this.slug) {
        this.slug = slug(this.title);
    }
    this.slug = this.slug.toLowerCase();
    this.modified = Date.now();
    next();
});

EmailCampaignSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = slug(this.title);
    }
    this.slug = this.slug.toLowerCase();
    this.modified = Date.now();
    next();
});

module.exports = mongoose.model('EmailCampaign', EmailCampaignSchema);
