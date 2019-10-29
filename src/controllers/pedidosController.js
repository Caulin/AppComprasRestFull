'use strict';

const ValidationContract = require('../validators/fluentValidators');
const repository = require('../repositories/pedidosRepositories');
const guid = require('guid');

exports.post = async (req, res, next) => {
   
    try {
         await repository.create({
             cliente: req.body.cliente,
             items:req.body
         });
        console.log(req.body);
        res.status(201).send({ message: 'Pedido com sucesso.' });
    } catch (error) {
        res.status(500).send({ message: `Falha no pedido.${error}` });

    }
}

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send({ message: 'Falha ao buscar pedidos.' });

    }

}