const
    express = require("express"),
    bodyParser = require('body-parser'),
    config = require("./config.js"),
    user_routes = require("./src/user/user_routes.js"),
    path_routes = require("./src/path/path_routes.js"),
    sensor_routes = require("./src/sensor/sensor_routes.js"),
    nunjucks = require('nunjucks'),
    fs = require('fs');

var accessLogStream = fs.createWriteStream('./access', { flags: 'a' });
var errorLogStream = fs.createWriteStream('./error', { flags: 'a' });

const app = express();

//template engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('views', './views'); // <--Path to your views folder
app.set('view engine', 'njk')

// app.set('secret', config.secret)
var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
}

app.use(express.static('static'));


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
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use("/user", user_routes)
app.use("/path", path_routes)
app.use("/mapa", function (req, res) {
    res.render('map.html.njk')
})
app.use("/", sensor_routes)


app.use("/", function (req, res) {
    res.render('home.html.njk', { variavel: { name: "oi" } });
    // res.render("<body>ola<body>")
})


try {

    app.listen(process.env.PORT || config.port, function () {
        console.log('Example app listening on port ', (process.env.PORT || config.port));
    })
}
catch (e) {
    console.log(e)
}