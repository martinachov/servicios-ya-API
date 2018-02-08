'use strict';

// All Routers files
const user = require('./user.router');
const category = require('./category.router');

module.exports = function(server) {
    user(server);
    category(server);
    
};