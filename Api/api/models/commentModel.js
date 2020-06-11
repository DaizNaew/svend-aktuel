'user strict';

const dbConn = require('../../connectionHandler.js');

class Comment {

    constructor(comment) {
        this.User_ID = comment.user_id;
        this.Comment = comment.comment;

    }

    static createComment(newComment, result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("INSERT INTO chat_log SET ?", [newComment], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    console.log('inserted Comment: ', res.insertId);
                    result(null, res.insertId);
                }
            });
            connection.release();
        });
    };

    static getAllComments(result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("SELECT * FROM chat_log", (err, res) => {
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

    static getCommentById(commentId, result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("SELECT * FROM chat_log WHERE ID = ?", [commentId], (err, res) => {
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

    static updateById(id, comment, result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("UPDATE chat_log SET ? WHERE ID = ?", [comment, id], (err, res) => {
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

    static deleteCommentById(id, result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("DELETE FROM chat_log WHERE ID = ?", [id], (err, res) => {
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

module.exports = Comment;