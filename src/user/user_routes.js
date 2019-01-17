const user = require("./user.js"),
    express = require('express'),
    utils = require('../../utils/misc_utils'),
    router = express.Router();


router.get("/", function (req, res) {
    // console.log(req.query)
    req_data = utils.process_req(req.query);
    console.log(req_data)
    user.select(req_data.targets, req_data.fields)
        .then((rows, fields) => {
            res.status(200).json(rows)
        })
        .catch(err => {
            res.status(500).json({ "error": String(err) })
        })
})

router.post("/", function (req, res) {
    user.insert(req.body).then((rows, fields) => {
        console.log("cadastrou")
        res.status(200).json(rows)
    }).catch(err => {
        res.status(500).json({ "erro": String(err) })
    })
})

router.put("/", function (req, res) {
    user.update(req.body).then((rows, fields) => {
        console.log("atualizou")
        res.status(200).json(rows)
    }).catch(err => {
        res.status(500).json({ "erro": String(err) })
    })
})

router.use("/login", function (req, res) {
    user.login(req.query.celular, req.query.senha).then((rows, fields) => {
        console.log(rows[0]);
        if ((rows[0].senha) == (req.query.senha)) {
            res.status(201).json(rows[0])
        } else {
            res.status(203).json({
                erro: "credencias nao bateram"
            })
        }

    }).catch((error) => {
        //console.log("catch", error)
        res.status(500).send({
            erro: "usuario inexistente" + String(error)
        })
    })
})

module.exports = router;