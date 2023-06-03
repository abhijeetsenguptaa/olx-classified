require('dotenv').config()
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');




const userRoute = express.Router();



userRoute.post('/signup', async (req, res) => {
    try {
        const { name, email, password, registered_on } = req.body;
        const searchUser = await UserModel.find({ email });
        if (searchUser.length >= 1) {
            res.status(201).send({
                status: false,
                msg: 'User-Email already Registered..'
            })
        } else {
            bcrypt.hash(password, 6, async (err, hash) => {
                const createUser = new UserModel({ name, email, password: hash, registered_on });
                await createUser.save();
                res.status(200).send({
                    status: true,
                    msg: "Registered Successfully"
                })
            })
        }
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error while registering the new user.'
        })
    }
})


userRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const searchUser = await UserModel.find({ email });
        if (searchUser.length >= 1) {
            bcrypt.compare(password, searchUser[0].password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ 'user-id': searchUser[0]._id }, process.env.secret_key, { expiresIn: '7d' });
                    res.status(200).send({
                        status: true,
                        msg: 'Login Successful',
                        token: token,
                        data: searchUser[0]
                    })
                } else {
                    res.status(404).send({
                        status: false,
                        msg: 'Wrong Credentials'
                    })
                }
            })
        } else {
            res.status(404).send({
                status: false,
                msg: 'User Not Found..'
            })
        }
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in logging in..'
        })
    }
})


module.exports = { userRoute };