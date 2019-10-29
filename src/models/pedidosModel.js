'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    dataPedido: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    items: [{
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto'
        }
    }]
});

module.exports = mongoose.model('Pedido', schema);