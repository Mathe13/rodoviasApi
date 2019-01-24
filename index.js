const
    express = require("express"),
    bodyParser = require('body-parser'),
    config = require("./config.js"),
    user_routes = require("./src/user/user_routes.js"),
    path_routes = require("./src/path/path_routes.js"),
    fs = require('fs');

var accessLogStream = fs.createWriteStream('./access', { flags: 'a' });
var errorLogStream = fs.createWriteStream('./error', { flags: 'a' });

const app = express();

// app.use(morgan("combined", {
//     skip: function (req, res) {
//         return res.statusCode < 400
//     }, stream: errorLogStream
// }));

// app.use(morgan("combined", {
//     skip: function (req, res) {
//         return res.statusCode >= 400
//     }, stream: accessLogStream
// }));

app.set('secret', config.secret)
var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
}

app.use(bodyParser.json({
    verify: rawBodySaver
}));

app.use(bodyParser.urlencoded({
    verify: rawBodySaver,
    extended: true
}));
app.use(bodyParser.raw({
    verify: rawBodySaver,
    type: '*/*'
}));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/user", user_routes)
app.use("/path", path_routes)

app.use("/", function (req, res) {
    res.send({
        status: "online",
        message: "the server is on, my friend"
    })
})




app.listen(process.env.PORT || config.port, function () {
    console.log('Example app listening on port ', (process.env.PORT || config.port));
});