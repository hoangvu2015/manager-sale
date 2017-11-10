'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var slug = require('slug');
/**
 * Province Schema
 */
var ProvinceSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Province name',
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
    ghn_data:{
        ProvinceCode:String,
        default: '',
    },
    ordering: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 1
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date
    }
},{
    versionKey: false // You should be aware of the outcome after set to false
});

ProvinceSchema.index({ slug: 1 });

ProvinceSchema.virtual('districts', {
    ref: 'District',
    localField: '_id',
    foreignField: 'province'
});

ProvinceSchema.pre('update', function(next) {
    if (!this.slug) {
        this.slug = slug(this.name);
    }
    this.slug = this.slug.toLowerCase();
    this.modified = Date.now();
    next();
});

ProvinceSchema.pre('save', function(next) {
    if (!this.slug) {
        this.slug = slug(this.name);
    }
    this.slug = this.slug.toLowerCase();
    this.modified = Date.now();
    next();
});

module.exports = mongoose.model('Province', ProvinceSchema);
