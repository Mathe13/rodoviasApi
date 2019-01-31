const
    sql_op = require("../../utils/sql/sql_common_operations.js"),
    table = 'user';

class User {
    static select(fields = null, targets = null) {
        return sql_op.select(fields, targets, table)

    }
    static insert(data) {
        return sql_op.insert(data, table)

    }
    static update(data) {
        if (data.editado_em) {
            data.editado_em = (new Date(data.editado_em)).toISOString().substring(0, 10)
        }
        if (data.ultimo_acesso) {
            data.ultimo_acesso = (new Date(data.ultimo_acesso)).toISOString().substring(0, 10)
        }
        if (data.criado_em) {
            data.criado_em = (new Date(data.criado_em)).toISOString().substring(0, 10)
        }
        return sql_op.update(data, table)
    }
    /**
    * 
    * @param {string} celular 
    * @param {string} senha 
    */
    static login(celular, senha) {
        const
            con = require("../../services/mysql_db.js"),
            sqlUtils = require("../../utils/sql/sql_utils.js"),
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