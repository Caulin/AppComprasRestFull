'use strict';

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');
const ValidationContract = require('../validators/fluentValidators');

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
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.titulo, 3, 'Titulo deve conter mais que 3 caracteres');
    contract.hasMinLen(req.body.descricao, 5, 'Descrição deve conter mais que 5 caracteres');
    contract.isRequired(req.body.preco, 'Preço não pode ser vazio');
    contract.isRequired(req.body.slug, 'Slug não deve ser vazio');
    contract.isRequired(req.body.imgPath, 'Imagem requerida');

    if (!contract.isValid()) {
        res.status(400).send(contract.erros()).end();
        return;
    }

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