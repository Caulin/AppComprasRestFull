'use strict';

const ValidationContract = require('../validators/fluentValidators');
const repository = require('../repositories/clientesRepositories');

exports.post = async (req, res, next) => {

    let contract = new ValidationContract();
    contract.isRequired(req.body.nome, 'Nome não deve ser vazio');
    contract.isRequired(req.body.senha, 'Senha requerida');

    if (!contract.isValid()) {
        res.status(400).send(contract.erros()).end();
        return;
    }
    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Cadastro com sucesso.' });
    } catch (error) {
        res.status(500).send({ message: `Falha salvar .${error}` });

    }
}