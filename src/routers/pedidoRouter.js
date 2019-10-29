'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidosController');

router.get('/', controller.get);
router.post('/comprar', controller.post);


module.exports = router;