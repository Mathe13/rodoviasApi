const
    sql_op = require("../../utils/sql/sql_common_operations.js"),
    table = 'rodovias.user';

class User {
    static select(fields = null, targets = null) {
        return sql_op.select(fields, targets, table)

    }
    static insert(data) {
        return sql_op.insert(data, table)

    }
    static update(data) {
        return sql_op.update(data, table)
    }
    /**
    * 
    * @param {string} celular 
    * @param {string} senha 
    */
    static login(celular, senha) {
        const
            sqlUtils = require("../../utils/sql/sql_utils.js"),
            con = require("../../services/mysql_db.js"),
            sql = sqlUtils.generate_select_query(
                [{
                    name: "celular",
                    value: celular,
                    operator: "="
                }],
                null, table
            );
        //console.log(sql)
        return new Promise(function (resolve, reject) {
            // Do async job
            con.query(sql, function (err, rows, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows, fields);
                }
            })
        })
    }
}


module.exports = User