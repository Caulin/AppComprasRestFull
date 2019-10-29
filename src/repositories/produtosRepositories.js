'use strict';

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.get = async () => {
    return await Produto.find({});
}
exports.update = async (id, data) => {
    return await Produto.findByIdAndUpdate(id, {
        $set: {
            titulo: data.titulo,
            descricao: data.descricao,
            preco: data.preco
        }
    });
}
exports.create = async (data) => {
    var produto = new Produto(data);
    return await produto.save();
}
exports.remove = async (id) => {
    return await Produto.findOneAndRemove(id);
}
exports.getByName = async (titulo) => {
    try {
        
        var teste = await Produto.find({
            titulo: { $regex: new RegExp(titulo), $options: 'i' }
        });
        
        return teste;
    } catch (error) {

    }


}