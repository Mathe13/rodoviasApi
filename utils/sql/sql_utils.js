const utils = require("../misc_utils.js")
class sqlUtils {

    /**
     * Função que gera um query de select para ser utilizada pelo modulo mysql ou pelo sql_common_operation
     * @param {object} targets[] array de obejetos que conte nome do campo (name) e valor a ser consultado(value)
     * @param {string} target_table nome da tabela alvo
     * @param { string } fields[] campos a serem consultados
     * @returns {string} a clausula de select na tabela
     **/
    static generate_select_query(targets, fields, target_table) {
        var sql_fields = "*"
        var sql_targets = ""
        if (!(fields == null)) {
            sql_fields = sqlUtils.generate_field_list(fields)
        }
        if (!(targets == null)) {
            sql_targets = "WHERE " + sqlUtils.generate_where(targets)

        }

        var sql = "SELECT " + sql_fields + " from " + target_table + " " + sql_targets
        return sql
    }
    /**
     * Função que gera um query de insert para ser utilizada pelo modulo mysql ou pelo sql_common_operation
     * @param {object} data objeto que contem os pares de valor e chave(iguais aos do banco)
     * @param {string} target_table nome da tabela alvo 
     * @returns {string} a clausula de insert na tabela
     * 
     */
    static generate_insert_query(data, target_table) {
        var decomposed = utils.objec_decompose(data)
        var campos = sqlUtils.generate_field_list(decomposed.chaves)
        var valores = sqlUtils.generate_field_list(decomposed.valores, true)
        return "insert into " + target_table + " ( " + campos + " ) values ( " + valores + " ) "
    }

    /**
     * Função que gera um query de update para ser utilizada pelo modulo mysql ou pelo sql_common_operation
     * @param {object} data objeto que contem os pares de valor e chave(iguais aos do banco)
     * @param {string} target_table nome da tabela alvo 
     * @returns {string} a query de atualização da tabela
     * 
     */
    static generate_update_query(data, target_table) {
        var valor_chave = ""
        for (const [key, value] of Object.entries(data)) {
            if (key != "id") {
                if (valor_chave == "") {
                    valor_chave = key + " = '" + value + "'"
                } else {
                    valor_chave = valor_chave + ", " + key + " = '" + value + "'"
                }
            }
        }
        return "update " + target_table + " set " + valor_chave + " where id=" + data.id
    }




    /**
     * Função que gera um where para ser utilizada pelas demais funções desse modulo 
     * @param {object} targets[] array de obejetos que conte nome do campo (name), valor a ser consultado(value) e operador(operator)
     * @returns {string} uma string que contem o 'where' que será utilizado no mysql
     * 
     **/
    static generate_where(targets) {
        var result = ""
        console.log('aqui importa', targets)
        targets.forEach(target => {
            if (result == "") {
                if (target.operator) {
                    if (target.operator == 'like' || target.operator == 'LIKE') {
                        result = " " + target.name + " " + target.operator + " '%" + target.value + "%'"
                    } else {
                        result = " " + target.name + " " + target.operator + " '" + target.value + "'"
                    }
                } else {
                    result = " " + target.name + " = '" + target.value + "'"
                }
            } else {
                if (target.operator) {
                    result = result + " " + target.name + " " + target.operator + "  '" + target.value + "'"
                } else {
                    result = result + " " + target.name + " = '" + target.value + "'"
                }
            }
            result += ' AND ';
        });
        result = result.slice(0, (result.length - 4)) //tira o ultimo and
        return result
    }


    /** 
     * Função que gera a listagem de fields para ser utilizada pelas demais funções desse modulo
     * @param { string } fields[] campos a serem consultados
     * 
     */
    static generate_field_list(fields, aspas = false) {
        var result = ""
        if (aspas) {
            fields.forEach(field => {
                if (result == "") {
                    result = " '" + field + "'"
                } else {
                    result = result + " ,'" + field + "'"
                }
            });
        } else {
            fields.forEach(field => {
                if (result == "") {
                    result = " " + field
                } else {
                    result = result + " ," + field
                }
            });
        }

        return result
    }

}
module.exports = sqlUtils