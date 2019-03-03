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

    static resumo(id) {
        var con = require("../../services/mysql_db.js")
        const sql = `select p.*, count(a.id) as leituras_realizadas, (max(a.datahora)) as ultima_data,
        (min(a.datahora)) as primeira_data from trajeto p 
        join acelerometro a on a.trajeto_id=p.id where p.id=${id}`

        return new Promise(function (resolve, reject) {
            // Do async job
            con.query(sql, function (err, rows, fields) {
                if (err) {
                    reject(err);
                } else {
                    // console.log((Math.abs(new Date(rows[0].ultima_data) - new Date(rows[0].primeira_data)) / (60 * 1000)))
                    rows[0]['tempo'] = (Math.abs(new Date(rows[0].ultima_data) - new Date(rows[0].primeira_data)) / (60 * 1000))
                    rows[0]['leituras previstas'] = ((rows[0].tempo * 60) / (rows[0].espacamento / rows[0].velocidade))
                    resolve(rows);
                }
            })
        })

    }
    static select_veiculos() {
        return sql_op.select(null, null, 'tipo_veiculo')
    }
    static full_select(targets) {
        const utils = require('../../utils/misc_utils.js');
        console.log('recebi', targets)
        return new Promise(function (resolve, reject) {
            sql_op.select(null, targets, table).then(async (rows, fields) => {
                let path = rows[0]
                targets = [{
                    'name': 'trajeto_id',
                    'value': path.id
                }]
                try {
                    const promessas = [
                        sql_op.select(null, targets, 'gps'),
                        sql_op.select(null, targets, 'giroscopio'),
                        sql_op.select(null, targets, 'acelerometro'),
                    ];

                    const [gps, giroscopio, acelerometro] = await Promise.all(promessas);

                    path.gps = gps;
                    path.giroscopio = giroscopio;
                    path.acelerometro = acelerometro;
                    path['tempo'] = (Math.abs(new Date(path.acelerometro[path.acelerometro.length - 1].datahora) - new Date(path.acelerometro[0].datahora)) / (60 * 1000))
                    path['leituras previstas'] = ((path.tempo * 60) / (path.espacamento / path.velocidade))
                    path['distancia_percorrida'] = utils.getHaversineDistance({
                        lat: path.gps[0].lat,
                        lng: path.gps[0].lng
                    }, {
                        lat: path.gps[path.gps.length - 1].lat,
                        lng: path.gps[path.gps.length - 1].lng
                    })
                    console.log(path.acelerometro[path.acelerometro.length - 1].datahora)
                    console.log(path.acelerometro[0].datahora)
                    resolve(path)
                } catch (error) {
                    console.log(error)
                    reject(error)
                }


            });

        }).catch(err => reject(err))
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