'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientesController');
const csrf = require('csurf');
const csrfProtection = csrf();
const passport = require('passport');
router.use(csrfProtection);

router.get('/', controller.getSignup);
router.post('/', passport.authenticate('local.signup', {
    successRedirect: '/clientes/signin',
    failureRedirect: '/clientes',
    failureFlash: true
}));
router.get('/signin', controller.getSignin);
router.post('/signin', passport.authenticate('local.sigin', {
    successRedirect: '/',
    failureRedirect: '/clientes/signin',
    failureFlash: true
}));

module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/clientes/signin');
}