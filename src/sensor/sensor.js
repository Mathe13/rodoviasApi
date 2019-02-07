const
    sql_op = require("../../utils/sql/sql_common_operations.js")

class Sensor {
    static select(sensor, targets = null, fields = null, ) {
        return sql_op.select(fields, targets, sensor)
    }
    static insert(sensor, data) {
        return sql_op.insert(data, sensor)
    }
    static select_sensor_data_desc(sensor, path_id) {
        var sql = 'select * from ' + sensor + ' where trajeto_id=' + path_id + " order by datahora desc"
        var con = require("../../services/mysql_db.js")
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

module.exports = Sensor