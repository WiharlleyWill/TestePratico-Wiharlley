const express = require('express')
const veiculos = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const Veiculos = require('../models/Veiculos')
veiculos.use(cors())

process.env.SECRET_KEY = 'secret'

veiculos.post('/registrarVeiculo', (req, res) => {
    const today = new Date()
    const veiculo = {
        placa: req.body.placa,
        ativo: req.body.ativo,
        anoFabricacao: req.body.anoFabricacao,
        anoModelo: req.body.anoModelo,
        chassi: req.body.chassi,
        dtCadastro: req.body.dtCadastro,
        timestampCadastro: req.body.timestampCadastro,
        dtAtivacao: req.body.dtAtivacao,
        timestampAtivacao: req.body.timestampAtivacao,
        dtDesativacao: req.body.dtDesativacao,
        timestampDesativacao: req.body.timestampDesativacao,
        modelo: req.body.modelo,
        cor: req.body.cor,
        consumoMedio: req.body.consumoMedio,
        numeroPassageiros: req.body.numeroPassageiros,
        cpfFuncionario: req.body.cpfFuncionario,
        nomeFuncionario: req.body.nomeFuncionario
    }

    Veiculos.create(veiculo)
        .then(veiculo => {
            /*let token = jwt.sign(veiculo.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            })
            res.json({ token: token })*/
            if (veiculo) {
                res.json(veiculo)
            } else {
                res.send(false);
            }
            console.log(veiculo);
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

veiculos.get('/buscaPlaca', (req, res) => {
    console.log('Dados: ' + JSON.stringify(req.headers.search))
    Veiculos.findOne({
        where: {
            placa: req.headers.search
        }
    })
        .then(veiculos => {
            if (veiculos) {
                res.json(veiculos)
            } else {
                res.send(false);
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

veiculos.get('/buscaModelo', (req, res) => {
    console.log('Dados: ' + JSON.stringify(req.headers.search))
    Veiculos.findAll({
        where: {
            modelo: req.headers.search
        }
    })
        .then(veiculos => {
            if (veiculos) {
                res.json(veiculos)
            } else {
                res.send(false);
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

veiculos.get('/buscaAtivados', (req, res) => {
    console.log('Dados: ' + JSON.stringify(req.headers.search))
    console.log('Dados2: ' + JSON.stringify(req.headers.search2))

    var date1 = new Date(req.headers.search);

    var date2 = new Date(req.headers.search2);

    Veiculos.findAll({
        where: Sequelize.and(
            {
                timestampAtivacao: {
                    [Op.gte]: date1,
                    [Op.lte]: date2
                }
            }
        )
    }).then(veiculos => {
        if (veiculos) {
            res.json(veiculos)
        } else {
            res.send(false);
        }
    })
        .catch(err => {
            res.send('error: ' + err)
        })
})

veiculos.get('/buscaChassi', (req, res) => {
    console.log('Dados: ' + JSON.stringify(req.headers.search))
    Veiculos.findOne({
        where: {
            chassi: req.headers.search
        }
    })
        .then(veiculos => {
            if (veiculos) {
                res.json(veiculos)
            } else {
                res.send(false);
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

veiculos.post('/updateVeiculo', (req, res) => {
    console.log("Chamou update");
    console.log(req.body);
    Veiculos.update(
        req.body, {
            where: {
                placa: req.body.placa
            }
        })
        .then(veiculo => {
            if (veiculo) {
                res.json(veiculo)
            } else {
                res.send(false);
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = veiculos
