//-------------------------USERS MODEL-----------------------------//
'use strict';

const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

//User Schema
var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: 'Email required',
        unique: true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: 'Password required'
    },
    username: {
        type: String,
        required: 'Username required'
    }
});

UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);

module.exports = mongoose.model('User', UserSchema);