class Utils {
    /**
     * @param {object} objeto um objeto qualquer
     * @returns {object} que contem um array de chaves e um de valores 
     */
    static objec_decompose(objeto) {
        var chaves = []
        var valores = []
        for (const [key, value] of Object.entries(objeto)) {
            chaves.push(key)
            valores.push(value)
            //console.log(key, value);
        }
        return { chaves: chaves, valores: valores }
    }

    /**
     * @returns uma string que contem diaDoAno/Ano
     */
    static get_day_year() {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = now - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        //console.log('Day of year: ' + day);
        return day + "-" + (new Date()).getFullYear()
    }

    static process_req(req) {
        var fields = null;
        var target = null;
        // console.log("recebi", req)
        if (fields) {
            fields = req.fields;
        }
        if (req.target && req.target_value) {
            // console.log("entrei if target")
            target = []
            var tmp = {}
            if (req.target.length == req.target_value.length) {
                for (var i = 0; i < (req.target).length; i++) {
                    tmp.name = req.target[i]
                    tmp.value = req.target_value[i]
                    if (req.target_operator) {
                        tmp.operator = req.target_operator[i]
                    } else {
                        tmp.operator = "=";
                    }
                    target.push(tmp)
                }
            }
        }
        console.log(target)
        return { targets: target, fields: fields }
    }


}
module.exports = Utils