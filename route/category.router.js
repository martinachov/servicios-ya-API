//-------------------------CATEGORY ROUTES-----------------------------//
'use strict';

const restify = require('restify');
const controller = require('../controller/category.controller');
const checkAuth = require('../auth/check.auth');

module.exports = function(server) {
  
  //Operations
  server.post('/api/category', controller.createCategory);
  server.get('/api/category', controller.getAllCategories);
  server.del('/api/category/:id', controller.deleteCategory);

};