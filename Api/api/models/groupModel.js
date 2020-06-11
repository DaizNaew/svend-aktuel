'user strict';

const dbConn = require('../../connectionHandler.js');

class Group {

    constructor(group) {
        this.name = group.name;
    }

    static createGroup(newGroup, result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("INSERT INTO group SET ?", [newGroup], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    console.log('inserted group: ', res.insertId);
                    result(null, res.insertId);
                }
            });
            connection.release();
        });
    };

    static getAllGroups(result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("SELECT * FROM group", (err, res) => {
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

    static getGroupById(groupId, result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("SELECT * FROM group WHERE ID = ?", [groupId], (err, res) => {
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

    static updateById(id, group, result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("UPDATE group SET ? WHERE ID = ?", [group, id], (err, res) => {
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

module.exports = Group;