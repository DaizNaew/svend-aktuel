'user strict';

const dbConn = require('../../connectionHandler.js');

class View {

    static getView(viewName, result) {
        dbConn.getConnection((err, connection) => {
            if (err)
                return console.error(err);
            dbConn.query("SELECT * FROM "+ viewName, (err, res) => {
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

module.exports = View;