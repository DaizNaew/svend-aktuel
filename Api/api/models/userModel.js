'user strict';

const dbConn = require('../../connectionHandler.js');

class User {

    constructor(user) {
        this.firstname = user.FirstName;
        this.lastname = user.LastName;
        this.username = user.UserName;
        this.email = user.Email;
        this.password = user.Password;
        this.group_ID = user.group_id;
    }

    static createUser(newUser, result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("INSERT INTO user SET ?", [newUser], (err, res) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, res.insertId);
                }
            });
            connection.release();
        });
    };

    static getAllUsers(result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("SELECT * FROM user", (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    result(null, res);
                }
            });
            connection.release();
        });
    }

    static getUserById(userId, result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("SELECT * FROM user WHERE ID = ?", [userId], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    result(null, res);
                }
            });
            connection.release();
        });
    }

    static getUserByUsername(username, result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("SELECT * FROM user WHERE username = ?", [username], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    console.dir(
                        res
                    )
                    result(null, res);
                }
            });
            connection.release();
        })
    }

    static updateById(id, user, result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("UPDATE user SET ? WHERE ID = ?", [user, id], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    result(null, res);
                }
            });
            connection.release();
        });
    }
}

module.exports = User;