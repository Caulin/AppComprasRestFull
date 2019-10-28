'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtosController');

router.get('/lista', isLoggedIn,controller.get);
router.put('/:id', controller.put);
router.get('/cadastro', isLoggedIn,controller.getCadastro);
router.post('/', isLoggedIn,controller.post);
router.delete('/:id', controller.delete);

module.exports = router;
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/clientes/signin');
}