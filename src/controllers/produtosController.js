'use strict';

const ValidationContract = require('../validators/fluentValidators');
const repository = require('../repositories/produtosRepositories');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send({ message: 'Falha ao buscar produtos.' });

    }

}

exports.post = async (req, res, next) => {

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
    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Cadastro com sucesso.' });
    } catch (error) {
        res.status(500).send({ message: `Falha salvar produto.${error}` });

    }
};
exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Atualizado com sucesso.' });
    } catch (error) {
        res.status(400).send({ message: 'Falha ao atualizar.', data: err });

    }
}
exports.delete = async (req, res, next) => {
    try {
        await repository.remove(req.params.id);
        res.status(200).send({ message: 'Deletado com sucesso.' });
    } catch (error) {
        res.status(400).send({ message: `Falha ao deletar.${error}` });
    }
}