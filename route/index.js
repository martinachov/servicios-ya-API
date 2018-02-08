'use strict';

// All Routers files
const user = require('./user.router');

module.exports = function(server) {
    user(server);
    
};