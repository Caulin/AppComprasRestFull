'use strict';

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');

exports.get = async () => {
    return await Pedido.find({}).populate('cliente').populate('items.produto');
}

exports.create = async (data) => {
    var pedido = new Pedido(data);
    return await pedido.save();
}