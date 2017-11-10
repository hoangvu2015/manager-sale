'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var slug = require('slug');
/**
 * District Schema
 */
var DistrictSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill District name',
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
    province: {
        type: Schema.ObjectId,
        ref: 'Province'
    },
    ordering: {
        type: Number,
        default: 0
    },
    ghn_data:{
        DistrictCode:{
            type: String,
            default: '',
        },
        DistrictName:{
            type: String,
            default: '',
        },
        ProvinceCode:{
            type: String,
            default: '',
        },
        ProvinceName:{
            type: String,
            default: '',
        },
        Type:{
            type: Number,
            default: 1,
        },
        SupportType:{
            type: Number,
            default: 1,
        }
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

DistrictSchema.index({slug: 1});

DistrictSchema.pre('update', function (next) {
    if (!this.slug) {
        this.slug = slug(this.name);
    }
    this.slug = this.slug.toLowerCase();
    this.modified = Date.now();
    next();
});

DistrictSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = slug(this.name);
    }
    this.slug = this.slug.toLowerCase();
    this.modified = Date.now();
    next();
});

module.exports = mongoose.model('District', DistrictSchema);
