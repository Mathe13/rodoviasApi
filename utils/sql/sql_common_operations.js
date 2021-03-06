var con = require("../../services/mysql_db.js")
const sqlUtils = require("./sql_utils.js")
class sql_common {

    /**
     * Realiza um consulta na tabela indicada usando o objeto targets para gerar o where 
     * e o objeto fields para listar os campos, quando os valores são omitidos 
     * é gerado um select * from ___ 
     * @param {string} fields[] campos a serem consultados
     * @param {object} target[] array de obejetos que conte nome do campo (name) e valor a ser consultado(value)
     * @returns {Promise}  que vai resolver em rows e fields   
     **/
    static select(fields = null, targets = null, table) {
        console.log('sql recebeu', {
            fields: fields,
            targets: targets
        })

        const sql = sqlUtils.generate_select_query(targets, fields, table)
        console.log("sql gerado:", sql)
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

    /**
     * Realiza um insert na tabela indicada, utilizando o objeto data para gerar a query,
     * note que é necessario que as chave do objeto sejam iguais aos nomes dos campos da tabela
     * que se deseja inserir
     * @param {object} data contem os pares de campo e valor como chave e campo
     * @returns {Promise}  que vai resolver em rows e fields
     */
    static insert(data, table) {

        const sql = sqlUtils.generate_insert_query(data, table)
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
    /**
     * Realiza um update na tabela indicada, utilizando o objeto data para gerar a query,
     * note que é necessario que as chave do objeto sejam iguais aos nomes dos campos da tabela *
     * que se deseja atualizar
     * @param {object} data contem os pares de campo e valor 
     * @returns {Promise}  que vai resolver em rows e fields
     */
    static update(data, table) {
        const sql = sqlUtils.generate_update_query(data, table)
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
module.exports = sql_common