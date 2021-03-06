const { query } = require('express');
const Pessoa = require('../model/TreinamentoPessoa');

let dadoPessoa = '';

class TreinamentoPessoaController {
    
    async adiciona(req, res) {
        dadoPessoa = await Pessoa.create(req.body);
        return res.status(200).json(dadoPessoa);
    }

    async buscaTodos(req, res) {
        dadoPessoa = await Pessoa.find({});
        return res.status(200).json(dadoPessoa);
    }

    async buscaNome(req, res) {
        // dadoPessoa = await Pessoa.findOne({ nome: new RegExp('^' + req.body.nome + '$', "i")}, function (err, doc) {
        dadoPessoa = await Pessoa.findOne({ nome: req.query.nome }).exec();
        return res.status(200).json(dadoPessoa);
    }

    async atualiza(req, res) {
        Pessoa.findOneAndUpdate({ idPessoa: req.params.idPessoa }, req.body, function(err, doc) {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.status(200).send('Atualizado');
        });
    }

    async removeId (req, res) {
            dadoPessoa = await Pessoa.deleteOne({ idPessoa: req.body.idPessoa })
            return res.status(201).json(dadoPessoa);       
    }
}

module.exports = new TreinamentoPessoaController();