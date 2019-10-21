'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

//retira essas linhas para html bruto
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
///

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Shopping", version: "0.0.1"
    });
});
const put = router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({ id: id, item: req.body });
});

const create = router.post('/', (req, res, next) => {
    res.status(201).send(req.body);
});
const del = router.delete('/', (req, res, next) => {
    res.status(201).send(req.body);
});


app.use('/', route);
app.use('/produtos', create);
app.use('/produtos', put);
app.use('/produtos', del);




module.exports = app;