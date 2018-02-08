//-------------------------SERVICE CONTROLLER-----------------------------//
'use strict';

const errors = require('restify-errors');
const Service = require('../model/service.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../configuration/config');

const SALT_WORK_FACTOR = 10;

module.exports = {

    createService: (req, res, next) => {
        
    },

    getCategoryServices: (req, res, next) =>{

    }, 
    
    deleteService: (req, res, next) => {

    }

}