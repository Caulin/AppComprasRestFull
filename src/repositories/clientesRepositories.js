'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.create = async (data) => {
    var cliente = new Cliente(data);
    return await cliente.save();
}
