'use strict';

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.get = (req, res, next) => {
    Produto.find({})
        .then(data => {
            res.status(201).send(data);
        }).catch(err => {
            res.status(400).send({
                message: 'Falha ao buscar produtos.', data: err
            });
        });

}
exports.post = (req, res, next) => {
    var produto = new Produto(req.body);
    produto.save()
        .then(data => {
            res.status(201).send({
                message: 'Cadastro realizado com sucesso.'
            });
        }).catch(err => {
            res.status(400).send(err);
        });

};
exports.put = (req, res, next) => {
    Produto.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            preco: req.body.preco
        }
    }).then(x => {
        res.status(200).send({ message: 'Atualizado com sucesso.' });
    }).catch(err => {
        res.status(400).send({ message: 'Falha ao atualizar.', data: err });
    })
}
exports.delete = (req, res, next) => {
    Produto.findOneAndRemove(req.params.id)
        .then(x => {
            res.status(200).send({ message: 'Deletado com sucesso.' });
        }).catch(err => {
            res.status(400).send({ message: 'Falha ao deletar.', data: err });
        })
}