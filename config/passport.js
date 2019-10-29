const passport = require('passport');
var User = require('../src/models/clientesModel');
const localStrategy = require('passport-local').Strategy;
const ValidationContract = require('../src/validators/fluentValidators');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local.signup', new localStrategy({
    usernameField: 'nome',
    passwordField: 'senha',
    passReqToCallback: true
}, (req, nome, senha, done) => {
    let contract = new ValidationContract();
    contract.isRequired(req.body.nome, 'Nome não deve ser vazio');
    contract.hasMinLen(req.body.nome, 3, 'Nome deve ter no minimo 3 caracteres.')
    contract.isRequired(req.body.senha, 'Senha requerida');
    contract.hasMinLen(req.body.senha, 3, 'Senha deve ter no minimo 3 caracteres.');

    if (!contract.isValid()) {
        var messages = contract.erros();
        return done(null, false, req.flash('error', messages))
    }

    User.findOne({ 'nome': nome }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, { message: 'nome já existe' })
        }
        var newUser = new User();
        newUser.nome = nome;
        newUser.senha = newUser.encryptPassord(senha);
        newUser.save((err, result) => {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));
passport.use('local.sigin', new localStrategy({
    usernameField: 'nome',
    passwordField: 'senha',
    passReqToCallback: true
}, (req, nome, senha, done) => {
    let contract = new ValidationContract();
    contract.isRequired(req.body.nome, 'Nome não deve ser vazio');
    contract.hasMinLen(req.body.nome, 3, 'Nome deve ter no minimo 3 caracteres.')
    contract.isRequired(req.body.senha, 'Senha requerida');
    contract.hasMinLen(req.body.senha, 3, 'Senha deve ter no minimo 3 caracteres.');

    if (!contract.isValid()) {
        var messages = contract.erros();
        return done(null, false, req.flash('error', messages))
    }
    User.findOne({ 'nome': nome }, (err, user) => {
        
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Usuario não encontrado.' })
        }
        if (!user.ValidPassword(senha,user)) {
            console.log('chamando valida');
             return done(null, false, { message: 'Senha errada.' })
         }
         return done(null, user);
    });
}));