const
    express = require("express"),
    path = require("./path.js"),
    utils = require("../../utils/misc_utils.js"),
    fecha = require('fecha')
router = express.Router()



router.get("/", function (req, res) {
    req_data = utils.process_req(req.query);
    console.log(req_data)
    path.select(req_data.fields, req_data.targets)
        .then((rows, fields) => {
            res.status(200).json(rows)
        })
        .catch(err => {
            res.status(500).json({ "error": String(err) })
        })
})

router.get("/tipo_veiculo", function (req, res) {
    path.select_veiculos()
        .then((rows, fields) => {
            res.status(200).json(rows)
        })
        .catch(err => {
            res.status(500).json({ "error": String(err) })
        })
})

router.get("/detalhes", function (req, res) {
    req_data = utils.process_req(req.query);
    console.log(req_data)
    path.full_select(req_data.targets)
        .then((rows, fields) => {
            res.status(200).json(rows)
        })
        .catch(err => {
            res.status(500).json({ "error": String(err) })
        })
})

router.get("/detalhes/:id", function (req, res) {
    let targets = [{ name: 'id', value: req.params.id }]
    path.full_select(targets)
        .then((rows, fields) => {
            res.status(200).json(rows)
        })
        .catch(err => {
            res.status(500).json({ "error": String(err) })
        })
})




router.post("/", function (req, res) {

    path.insert(req.body).then((rows, fields) => {
        console.log("cadastrou")
        res.status(200).json(rows)
    }).catch(err => {
        res.status(203).json({ "erro": String(err) })
    })
})

router.put("/", function (req, res) {
    path.update(req.body)
})

module.exports = router