const
    sql_op = require("../../utils/sql/sql_common_operations.js"),
    table = 'trajeto';

class Trajeto {


    static select(fields = null, targets = null) {
        console.log('recebi :', {
            fields: fields,
            targets: targets
        })
        return sql_op.select(fields, targets, table)
    }

    static select_veiculos() {
        return sql_op.select(null, null, 'tipo_veiculo')
    }

    static full_select(targets) {
        const utils = require('../../utils/misc_utils.js');
        console.log('recebi', targets)
        return new Promise(function (resolve, reject) {
            sql_op.select(null, targets, table).then((rows, fields) => {
                let paths = rows
                paths.forEach(path => {
                    targets = [{
                        'name': 'trajeto_id',
                        'value': path.id
                    }]
                    sql_op.select(null, targets, 'gps').then((rows2, fields) => {
                        path.gps = rows2

                        sql_op.select(null, targets, 'giroscopio').then((rows3, fields) => {
                            path.giroscopio = rows3

                            sql_op.select(null, targets, 'acelerometro').then((rows4, fields) => {
                                path.acelerometro = rows4
                                path['distancia_percorrida'] = utils.getHaversineDistance({
                                    lat: path.gps[0].lat,
                                    lng: path.gps[0].lng
                                }, {
                                    lat: path.gps[path.gps.length - 1].lat,
                                    lng: path.gps[path.gps.length - 1].lng
                                })
                                console.log(path.acelerometro[path.acelerometro.length - 1].datahora)
                                console.log(path.acelerometro[0].datahora)
                                path['tempo'] = Math.abs(new Date(path.acelerometro[path.acelerometro.length - 1].datahora) - new Date(path.acelerometro[0].datahora)) / (60 * 1000)
                                resolve(paths)
                            })
                        })
                    })
                });

            }).catch(err => reject(err))
        })
    }


    static insert(data) {
        return sql_op.insert(data, table)
    }


    static select_by_name(nome) {
        var con = require("../../services/mysql_db.js")
        var sql = 'select t.* from trajeto t where (select u.nome from user u  where u.id=t.user_id) like "%' + nome + '%"'
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

    static update(data) {
        return sql_op.update(data, table)
    }

}


module.exports = Trajeto