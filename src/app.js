'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

//Carrega as rotas
const indexRoutes =  require('./routers/indexRouter');
const produtoRoutes = require('./routers/produtoRouter');
//
//retira essas linhas para html bruto
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
///

app.use('/', indexRoutes);
app.use('/produtos', produtoRoutes);

module.exports = app;