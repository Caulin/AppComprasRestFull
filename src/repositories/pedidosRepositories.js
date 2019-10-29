'use strict';

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');

exports.get = async () => {
    return await Pedido.find();
}

exports.create = async (data) => {
    console.log(data);
    var pedido = new Pedido(data);
    return await pedido.save();
}