'use strict';

/**
* Module dependencies.
*/

import mongoose from 'mongoose'
import slug from 'slug'
var Schema = mongoose.Schema;
const Counters = mongoose.model('Counters');

/**
*  Order Schema
*/
var OrderSchema = new Schema({
	id_order: {
		type: Number,
		min: 1000
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill name',
		trim: true
	},
	link_facebook: {
		type: String,
		default: '',
		trim: true
	},
	phone: {
		type: String,
		default: '',
		trim: true
	},
	address: {
		type: String,
		default: ''
	},
	total: {
		type: Number,
		default: 0
	},
	ship_fee: {
		type: Number,
		default: 0
	},
	id_ship: {
		type: String,
		default: '',
		trim: true
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	date_order: {
		type: Date,
    default: Date.now,
	},
	province: {
		type: String,
		default: '',
	},
	status: {
		type: String,
		default: 'NEW',
    enum: ['NEW', 'PROCCESS', 'FINISH', 'CANCEL']
	}
}, { collection: 'orders', timestamps: true });

let preSave = function (next) {
    var order = this;
    // Check create or update
    if (!order.id_order) {
        // Create order id async
        let createOrderId = async function () {
            // Check counters for order is created
            var counter = await (Counters.findOne({
                collection_name: 'order'
            }));
            if (!counter) {
                let count = 200000000;
                // Created counter documents
                let counter_create = new Counters({
                    collection_name: 'order',
                    sequence_value: count
                });
                counter_create.save().then(function (resp) {
                });
                return count;
            }
            else {
                // Update counter documents
                let count = counter.sequence_value + 1;
                counter.sequence_value = count;
                counter.save().then(function () {
                });
                return count;
            }
        };

        createOrderId().then(function (resp) {
            order.id_order = resp;
            next();
        })
    }
    else {
        next();
    }
}

OrderSchema.pre('save', preSave);

export default mongoose.model('Order', OrderSchema);
