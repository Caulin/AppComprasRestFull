'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidosController');

router.get('/lista', isLoggedIn,controller.get);
router.post('/comprar', isLoggedIn,controller.post);


module.exports = router;
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/clientes/signin');
}