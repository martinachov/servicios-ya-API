//-------------------------CATEGORY MODEL-----------------------------//
'use strict';

const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

//Category Schema
var CategorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: 'Name required',
        unique: true,
    },
    description: {
        type: String
    }

});

CategorySchema.plugin(timestamps);
CategorySchema.plugin(mongooseStringQuery);

//Define CATEGORY model with CategorySchema
module.exports = mongoose.model('Category', CategorySchema);