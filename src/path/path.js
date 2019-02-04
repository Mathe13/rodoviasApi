const
    sql_op = require("../../utils/sql/sql_common_operations.js"),
    table = 'trajeto';

class Trajeto {


    static select(fields = null, targets = null) {
        return sql_op.select(fields, targets, table)
    }

    static select_veiculos() {
        return sql_op.select(null, null, 'tipo_veiculo')
    }

    static full_select(targets) {
        //busca trajetos
        return new Promise(function (resolve, reject) {
            sql_op.select(null, targets, table).then((rows, fields) => {
                let paths = rows
                //busca leituras
                paths.forEach(path => {
                    //busca gps
                    targets = [{ 'name': 'trajeto_id', 'value': path.id }]
                    sql_op.select(null, targets, 'gps').then((rows2, fields) => {
                        path.gps = rows2
                        console.log(rows2)
                        //busca giroscopio
                        sql_op.select(null, targets, 'giroscopio').then((rows3, fields) => {
                            path.giroscopio = rows3
                            console.log(rows3)
                            //busca acelerometro
                            sql_op.select(null, targets, 'acelerometro').then((rows4, fields) => {
                                path.acelerometro = rows4
                                console.log(rows4)
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


    static update(data) {
        // if (data.recebido) {
        //     data.recebido = (fecha.format(data.recebido, 'YYYY-MM-DD HH:mm:ss'))
        // }
        // if (data.hora_inicio) {
        //     data.hora_inicio = (fecha.format(data.hora_inicio, 'YYYY-MM-DD HH:mm:ss'))
        // }
        // if (data.hora_fim) {
        //     data.hora_fim = (fecha.format(data.hora_fim, 'YYYY-MM-DD HH:mm:ss'))
        // }
        // if (data.enviado) {
        //     data.enviado = (fecha.format(data.enviado, 'YYYY-MM-DD HH:mm:ss'))
        // }
        return sql_op.update(data, table)
    }

}


module.exports = Trajeto