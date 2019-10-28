'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const schema = new Schema({
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    } 
});

schema.methods.encryptPassord = (senha) => {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync(5), null);
};

schema.methods.ValidPassword = (senha, user) => {
    
    return bcrypt.compareSync(senha, user.senha);
};
module.exports = mongoose.model('Cliente', schema);