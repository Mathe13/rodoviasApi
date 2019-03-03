/**
 * Declaração das constantes, em sua maior parte são modulos que serão utilizados
 */
const
    express = require("express"),
    bodyParser = require('body-parser'),
    config = require("./config.js"),
    user_routes = require("./src/user/user_routes.js"),
    path_routes = require("./src/path/path_routes.js"),
    sensor_routes = require("./src/sensor/sensor_routes.js"),
    nunjucks = require('nunjucks'),
    fs = require('fs');



//Define onde o log de acesso será salvo
var accessLogStream = fs.createWriteStream('./access', {
    flags: 'a'
});

//Define onde o log de erro será salvo
var errorLogStream = fs.createWriteStream('./error', {
    flags: 'a'
});

//cria o objeto app, que gerencia todo o servidor
const app = express();
app.disable('x-powered-by');

//configura a template engine nunjucks, que será usada nos arquivos da view
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

//seta a pasta onde as views estão
app.set('views', './views'); // <--Path to your views folder

//define qual view engine o app irá utilizar
app.set('view engine', 'njk')

//seta o encode padrão pata utf8
var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
}

//define a pasta onde os arquivos estaticos estão
app.use(express.static('static'));

//definimos o node_modules como estatico para poder importa os modulos a partir das views
app.use(express.static('./node_modules/'));

//define a decodificação padrão para json, usado em post,put,delete
app.use(bodyParser.json({
    verify: rawBodySaver
}));

//define a decodificação padrão para urlencode, usado em get
app.use(bodyParser.urlencoded({
    verify: rawBodySaver,
    extended: true
}));

//define a decodificação para os demais casos
app.use(bodyParser.raw({
    verify: rawBodySaver,
    type: '*/*'
}));


//habilita requisições do tipo cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

//monta as rotas do modulo user em /user
app.use("/user", user_routes)

//monta as rotas do modulo path em /path
app.use("/path", path_routes)

//define a rota do mapa
app.use("/mapa", function (req, res) {
    res.render('map.html.njk')
})

//monta as rotas do modulo sensores em /
app.use("/", sensor_routes)


//monta a rota para a pagina inicial
app.use("/", function (req, res) {
    res.render('home.html.njk', {
        variavel: {
            name: "oi"
        }
    });
    // res.render("<body>ola<body>")
})


//inicia o servidor
try {
    app.listen(process.env.PORT || config.port, function () {
        console.log('Example app listening on port ', (process.env.PORT || config.port));
    })
} catch (e) {
    console.log(e)
}