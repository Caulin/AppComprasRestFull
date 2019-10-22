'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
//conecta ao banco
mongoose.connect('mongodb://web2:web123456@ds035787.mlab.com:35787/web2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//carrega as rotas
const indexRoutes = require('./routers/indexRouter');
const produtoRoutes = require('./routers/produtoRouter');

//retira essas linhas para html bruto
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
///

app.use('/', indexRoutes);
app.use('/produtos', produtoRoutes);

module.exports = app;