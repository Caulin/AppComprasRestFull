'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtosController');

router.put('/:id', controller.put);
router.post('/', controller.post);
router.delete('/', controller.delete);

module.exports = router;