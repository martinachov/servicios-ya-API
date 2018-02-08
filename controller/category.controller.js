//-------------------------CATEGORY CONTROLLER-----------------------------//
'use strict';

const errors = require('restify-errors');
const Category = require('../model/category.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../configuration/config');

const SALT_WORK_FACTOR = 10;

module.exports = {

    //Create new Category (ej. Plomeria, Electricidad)
    createCategory: (req, res, next) => {
        console.log('Creating new Category');
        //Check if request is valid 
        if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'"),
			);
        }
        //Check if Category Name already exist
        Category.find({name: req.body.name})
                .then(result => {
                    if(result.length >= 1) {
                        console.log('Category already exist');
                        return next(new errors.BadRequestError('Category name already exist!'));
                    } else {
                        //Create a CATEGORY Model with request body
                        const category = new Category({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            description: req.body.description
                        });
                        category.save()
                                .then(result => {
                                    res.status(200);
                                    res.send({
                                        message: 'Category created'
                                    });
                                })
                                .catch(err => {
                                    console.log(err, 'Error creating Category');
                                    res.status(500);
                                    res.send({
                                        message: err.message
                                    });
                                });
                        next();
                    }

                })
                .catch(error => {
                    console.log(err, 'Error creating Category');
                    res.status(500);
                    res.send({
                        message: err.message
                    });
                });
    },

    //Return all categories
    getAllCategories: (req, res, next) => {
        console.log('Returning all categories');

        Category.find({})
                .then(result => {
                    res.status(200);
                    res.send(JSON.stringify(result));
                })
                .catch(error => {
                    console.log(err, 'Error returning all Categories');
                    res.status(500);
                    res.send({
                        message: err.message
                    });
                });

        next();
    },

    //Delete category
    deleteCategory: (req, res, next) => {
        console.log('Delete Category');

        Category.remove({_id: req.params.id})
                .then(result => {
                    res.status(200);
                    res.send({
                        message: 'Category deleted'
                    });
                })
                .catch(error => {
                    console.log(error, 'Error returning all Categories');
                    res.status(500);
                    res.send({
                        message: err.message
                    });
                });

        next();        
    }

}