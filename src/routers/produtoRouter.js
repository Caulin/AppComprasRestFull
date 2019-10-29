'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtosController');

router.get('/lista',isLoggedIn,controller.get);
router.put('/:id',isLoggedIn,controller.put);
router.get('/cadastro', isLoggedIn,controller.getCadastro);
router.post('/', isLoggedIn,controller.post);
router.delete('/:id', isLoggedIn,controller.delete);
router.get('/pesquisa',isLoggedIn,controller.getByName);
router.get('/pesquisar',isLoggedIn,controller.getPesquisar)
module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/clientes/signin');
}