//-------------------------SERVICE MODEL-----------------------------//
'use strict';

const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

//Service Schema
var ServiceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: 'Name required',
        unique: true,
    },
    description: {
        type: String
    },
    category: {
        type: Schema.ObjectId,
        ref:'Category',
        required: true
    }

});

ServiceSchema.plugin(timestamps);
ServiceSchema.plugin(mongooseStringQuery);

//Define SERVICE model with ServiceSchema
module.exports = mongoose.model('Service', ServiceSchema);