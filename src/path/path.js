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
                    sql_op.select(null, targets, 'gps').then((rows, fields) => {
                        path.gps = rows
                        //busca giroscopio
                        sql_op.select(null, targets, 'giroscopio').then((rows, fields) => {
                            path.giroscopio = rows
                            //busca acelerometro
                            sql_op.select(null, targets, 'acelerometro').then((rows, fields) => {
                                path.acelerometro = rows
                            })
                        })
                    })
                });
                resolve(paths)
            }).catch(err => reject(err))
        })
    }


    static insert(data) {
        return sql_op.insert(data, table)
    }


    static update(data) {
        if (data.hora_inicio) {
            data.hora_inicio = (new Date(data.hora_inicio)).toISOString().substring(0, 10)
        }
        if (data.hora_fim) {
            data.hora_fim = (new Date(data.hora_fim)).toISOString().substring(0, 10)
        }
        if (data.enviado) {
            data.enviado = (new Date(data.enviado)).toISOString().substring(0, 10)
        }
        return sql_op.update(data, table)
    }

}


module.exports = Trajeto