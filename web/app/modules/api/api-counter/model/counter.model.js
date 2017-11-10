'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CountersSchema = new Schema({
    collection_name: {
        type: String,
        required: true,
    },
    sequence_value: {
        type: Number,
        default: 1,
        min: 1
    }
}, {
        collection: 'counters',
    });

module.exports = mongoose.model('Counters', CountersSchema);