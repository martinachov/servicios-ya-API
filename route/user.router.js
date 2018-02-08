//-------------------------USERS ROUTES-----------------------------//
'use strict';

const restify = require('restify');
const controller = require('../controller/user.controller');
const checkAuth = require('../auth/check.auth');

module.exports = function(server) {

  //SignUp and Login  
  server.post('/api/user/signup', controller.signUp);
  server.del('/api/user/:userid', controller.deleteUser);
  server.post('/api/user/login', controller.loginUser);
  
  //Operations
  server.get('/api/user', controller.getAllUsers);

};