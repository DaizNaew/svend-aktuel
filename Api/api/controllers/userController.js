'use strict';

const crypto = require('crypto');

var User = require('../models/userModel');

exports.create_a_user = function(req, res) {
    var new_user = new User(req.body);

    if(!new_user.username || !new_user.password) {
        res.status(400).send({
            error: true,
            message: 'Please supply a username and password to setup an user.'
        });
    } else {
        let password = new_user.password;
        let hashedPassAndSalt = saltHashPassword(password)
        new_user.password = hashedPassAndSalt.salt + '$' + hashedPassAndSalt.passwordHash;
        User.createUser(new_user, (err, user) => {
            if(err) return res.send(err);
            res.json(user);
        })
    }
}
exports.list_all_users = (req, res) => {
    User.getAllUsers((err, users) => {
        if(err) return res.send(err);
        res.json(users)
    })
}

exports.read_a_user = (req, res) => {
    let user_id = req.params.userId
    if(!user_id) {
        return res.status(400).send({
            error: true, message: 'Venligst suppler et user ID'
        })
    }
    User.getUserById(user_id, (err, user) => {
        if(err) return res.send(err);
        res.json(user)
    })
}

exports.fetch_user_username = (req, res) => {
    let username = req.params.username,
        password = req.params.password;
    if(!username || !password) {
        return res.status(400).send({
            error: true, message: 'Venligst suppler et brugernavn'
        })
    }
    User.getUserByUsername(username, (err, user) => {
        if(err || !user[0] || user[0] == undefined) {console.dir(err); return res.send(err)};
        let passArr = user[0].password.split("$");
        console.dir(password)
        if(verifyPassword(password, passArr[0], passArr[1])) {
            res.json(user);
        } else {
            res.json(err)
        }
    })
}

exports.update_a_user = (req, res) => {
    let user_id = req.params.userId,
        user = req.body;
    if(!user_id || !user) {
        return res.status(400).send({
            error: true,
            Message: 'Venligst suppler bruger og bruger ID'
        })
    }
    User.updateById(user_id, user, (err, user) => {
        if(err) return res.send(err);
        res.json(user)
    })
}

exports.delete_a_user = (req, res) => {
    let user_id = req.params.userId;
    if(!user_id) {
        res.status(400).send({
            error: true,
            message: 'Venligst suppler userId på den bruger som skal slettes'
        })
    }
    User.disableUserById(user_id, (err, user) => {
        if(err) return res.send(err);
        res.json(user);
    })
}

exports.activate_a_user = (req, res) => {
    let user_id = req.params.userId;
    if(!user_id) {
        res.status(400).send({
            error: true,
            message: 'Venligst suppler userId på den bruger som skal aktiveres'
        })
    }
    User.activateUserById(user_id, (err, user) => {
        if(err) return res.send(err);
        res.json(user);
    })
}

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
    return salt,passwordData;
}

function verifyPassword(userpassword, salt, hashedAndSaltedPass) {
    var passwordData = sha512(userpassword, salt);
    console.dir(passwordData)
    return passwordData.passwordHash == hashedAndSaltedPass ? true : false;
}