//-------------------------USERS CONTROLLER-----------------------------//
'use strict';

const errors = require('restify-errors');
const User = require('../model/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../configuration/config');

const SALT_WORK_FACTOR = 10;

module.exports = {
    //SignUp User
    signUp: function(req, res, next){
        console.log('SIGNING UP USER');
        //Check if exist the email user in DB
        User.find({email: req.body.email})
            .then(user => {
                //The user exist
                if(user.length >= 1) {
                    console.log('User exist');
                    return next(new errors.BadRequestError('User exist!'));
                } //User not exist in DB, create
                else {
                    console.log('User dont exist');
                    //Hash password Async
                    bcrypt.hash(req.body.password, SALT_WORK_FACTOR, (err, hash) => {
                        if(err){
                            return next(new errors.InternalServerError('Server error!'));
                        } else {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                username: req.body.username,
                                email: req.body.email,
                                password: hash
                            });
                            //Save User in DB
                            user.save()
                                .then((user) => {
                                    console.log('User creation success');
                                    res.status(201);
                                    res.send({
                                        message: 'User created'
                                    });
                                })
                                .catch(err => {
                                    console.log(err, 'Error creating user');
                                    res.status(500);
                                    res.send(err.message);
                                });
                            next();
                        }
                    });
                }
            });
    },

    //Login User
    loginUser: (req, res, next) => {
        //Check if exist the email user in DB
        User.find({email: req.body.email})
            .then(user => {
                //The email user dont exist, login fail
                if(user.length < 1) {
                    console.log('User dont exist');
                    return next(new errors.UnauthorizedError('Auth failed'));
                }
                //The email user exist, compare de password
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if(err) {
                        console.log('Error comparing passwords');
                        return next(new errors.UnauthorizedError('Auth failed'));
                    }
                    if(result) {
                        //Generate the token with jsonwebtoken
                        const token = jwt.sign(   
                            {
                                email: user[0].email,
                                id: user[0]._id
                            }, 
                            config.jwtSecret, 
                            {
                                expiresIn: '1h'
                            }
                        );
                        console.log('Token create, login successfull');
                        res.status(200);
                        res.send({
                            message: 'Auth successfull',
                            token: token
                        });
                    } else {
                        console.log('Error, passwords dont match');
                        return next(new errors.UnauthorizedError('Auth failed'));
                    }
                    
                });

            })
            .catch(err => {
                console.log(err, 'Error login user');
                res.status(500);
                res.send(err.message);
            });
    },

    //Delete User
    deleteUser: (req, res, next) => {
        User.remove({_id: req.params.userid})
            .then(result => {
                res.status(200);
                res.send({
                    message: 'User deleted'
                });
            })
            .catch(err => {
                console.log(err, 'Error delete user');
                res.status(500);
                res.send(err.message);
            });
    },

    //Get All users
    getAllUsers: function(req, res, next){
        console.log('GET ALL USERS');

        User.find({}, {})
            .then((result) => {
                console.log('Users loaded OK!!' + result);
                res.send(result.docs);
            })
            .catch(error => {
                console.log(error, 'Error while loading user')
                res.status(500);
                res.send(error.message);
            });

        next();
    }

}