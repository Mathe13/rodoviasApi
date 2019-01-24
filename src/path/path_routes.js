const
    express = require("express"),
    path = require("./path.js"),
    utils = require("../../utils/misc_utils.js")
router = express.Router()



router.get("/", function (req, res) {
    req_data = utils.process_req(req.query);
    console.log(req_data)
    path.select(req_data.targets, req_data.fields)
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


router.post("/", function (req, res) {
    path.insert(req.body).then((rows, fields) => {
        console.log("cadastrou")
        res.status(200).json(rows)
    }).catch(err => {
        res.status(203).json({ "erro": String(err) })
    })
})

module.exports = router