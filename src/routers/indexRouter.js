'use strict';
const express = require('express');
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).render('index',{title:'Express'});
});

module.exports = router;