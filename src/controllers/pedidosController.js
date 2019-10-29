'use strict';

const ValidationContract = require('../validators/fluentValidators');
const repository = require('../repositories/pedidosRepositories');
const guid = require('guid');

exports.post = async (req, res, next) => {
   
    try {
         await repository.create({
            produto:req.body.id
         });
        res.status(201).render('index',{ message: 'Pedido com sucesso.' });
    } catch (error) {
        res.status(500).render('index',{ message: `Falha no pedido.${error}` });

    }
}

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        console.log(data);
        res.status(200).render('pedido/pedidoList', {data});
    }
    catch (error) {
        res.status(500).send({ message: 'Falha ao buscar pedidos.' });

    }

}