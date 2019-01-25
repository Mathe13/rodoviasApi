const
    express = require("express"),
    sensor = require("./sensor.js"),
    utils = require("../../utils/misc_utils.js")
router = express.Router()

router.get("/:sensor", function (req, res) {
    // let sensor = "acelerometro"
    if (["acelerometro", "giroscopio", "gps"].includes(req.params.sensor)) {

        req_data = utils.process_req(req.query);
        console.log(req_data)
        sensor.select(req.params.sensor, req_data.targets, req_data.fields)
            .then((rows, fields) => {
                res.status(200).json(rows)
            })
            .catch(err => {
                res.status(500).json({ "error": String(err) })
            })
    } else {
        res.status(400).send({
            "erro": "você está procurando um sensor inexistente",
            "dica": "use acelerometro, giroscopio ou gps"
        })
    }
})


router.post("/:sensor", function (req, res) {
    // let sensor = "acelerometro"
    if (["acelerometro", "giroscopio", "gps"].includes(req.params.sensor)) {
        sensor.insert(req.params.sensor, req.body)
            .then((rows, fields) => {
                res.status(200).json(rows)
            })
            .catch(err => {
                res.status(500).json({ "error": String(err) })
            })
    } else {
        res.status(400).send({
            "erro": "você está procurando um sensor inexistente",
            "dica": "use acelerometro, giroscopio ou gps"
        })
    }
})


module.exports = router