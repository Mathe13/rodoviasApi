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
        return {
            chaves: chaves,
            valores: valores
        }
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

    /**
     * 
     * @param {lat:string,lng:string} firstLocation  contem latitude e longitude da primeira localização
     * @param {lat: string,lng: string} secondLocation contem latitude e longitude da primeira localização
     * @returns a distancia em km entre as duas localizações
     * 
     */
    static getHaversineDistance(firstLocation, secondLocation) {
        const earthRadius = 6371; // km 

        const diffLat = (secondLocation.lat - firstLocation.lat) * Math.PI / 180;
        const diffLng = (secondLocation.lng - firstLocation.lng) * Math.PI / 180;

        const arc = Math.cos(
                firstLocation.lat * Math.PI / 180) * Math.cos(secondLocation.lat * Math.PI / 180) *
            Math.sin(diffLng / 2) * Math.sin(diffLng / 2) +
            Math.sin(diffLat / 2) * Math.sin(diffLat / 2);
        const line = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc));

        const distance = earthRadius * line;

        return distance;
    }

    /**
     * Processa o obejeto de requisição e retornar um obejeto com doi vetores formatados
     * @param {Object} req o objeto de requisição padrão do express
     * @returns {Object} objetor que contem o vetor fields e o vetor targets, serve para ser usado nas funções do sql_utils
     * 
     */
    static process_req(req) {
        var fields = null;
        var target = null;
        console.log("recebi 2", req)
        if (fields) {
            fields = req.fields;
        }
        if (req.target && req.target_value) {
            // console.log("entrei if target")
            target = []
            if (req.target.length == req.target_value.length) {
                for (var i = 0; i < (req.target).length; i++) {
                    var tmp = {}
                    // console.log('trajeto', req.target_operator[i])
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
        return {
            targets: target,
            fields: fields
        }
    }


}
module.exports = Utils