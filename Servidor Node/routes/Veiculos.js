const express = require('express')
const veiculos = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

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
        dtDesativacao: req.body.dtDesativacao,
        timestampDesativacao: req.body.timestampDesativacao,
        modelo: req.body.modelo,
        cor: req.body.cor,
        consumoMedio: req.body.consumoMedio,
        numeroPassageiros: req.body.numeroPassageiros,
        idFuncionario: req.body.idFuncionario,
        nomeFuncionario: req.body.nomeFuncionario
    }

    Veiculos.create(veiculo)
        .then(veiculo => {
            /*let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            })
            res.json({ token: token })*/
            console.log(veiculo);
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = veiculos