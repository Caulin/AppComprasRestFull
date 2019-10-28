'use strict';

const ValidationContract = require('../validators/fluentValidators');
const repository = require('../repositories/clientesRepositories');


exports.getSignup = async (req, res, next) => {
    var messages = req.flash('error');
    res.status(200).render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
}
exports.getSignin = async (req, res, next) => {
    var messages = req.flash('error');
    res.status(200).render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });

}

exports.post = async (req, res, next) => {


    try {
        //await repository.create(req.body);
        res.redirect('/');
    } catch (error) {
        res.status(500).send({ message: `Falha salvar .${error}` });

    }
}