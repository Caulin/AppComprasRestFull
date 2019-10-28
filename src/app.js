'use strict';
const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const expressHbs = require('express-handlebars');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
//const MongoStore = require('connect-mongo')(session);
//conecta ao banco
mongoose.connect('mongodb://web2:web123456@ds035787.mlab.com:35787/web2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
require('../config/passport');
mongoose.set('useCreateIndex', true)

//carrega os models
const produtoModel = require('./models/produtosModel');
const clienteModel = require('./models/clientesModel');
const pedidoModel = require('./models/pedidosModel');

//carrega as rotas
const clienteRouters = require('./routers/clienteRouter');
const indexRoutes = require('./routers/indexRouter');
const produtoRoutes = require('./routers/produtoRouter');
const pedidoRouters = require('./routers/pedidoRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    // cookie: { maxAge: 5 * 60 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'views'));
//app.engine('.hbs', expressHbs({defaultLayout:'layouts',extname:'.hbs'}));
app.set('view engine', '.hbs');
// app.use((req,res,next)=>{
//     res.locals.login  = req.isAuthenticated();
//     res.locals.session = req.session;
//     next();
// });
app.use('/', indexRoutes);
app.use('/produtos', produtoRoutes);
app.use('/clientes', clienteRouters);
app.use('/pedidos', pedidoRouters);

module.exports = app;