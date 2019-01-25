const
    sql_op = require("../../utils/sql/sql_common_operations.js")

class Sensor {
    static select(sensor, fields = null, targets = null) {
        return sql_op.select(fields, targets, sensor)
    }
    static insert(sensor, data) {
        return sql_op.insert(data, sensor)
    }
}

module.exports = Sensor