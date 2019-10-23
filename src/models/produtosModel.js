'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    titulo: {
        type: String,
        required: [true, 'O titulo é obrigatorio'],
        trim: true
    },
    descricao: {
        type: String,
        required: [true, 'A descricao é obrigatorio'],
        trim: true
    },
    preco: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        index: true,
       
    },
    imgPath:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Produto', schema);