const express = require('express')
const funcionarios = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Funcionarios = require('../models/Funcionarios')
funcionarios.use(cors())

process.env.SECRET_KEY = 'secret'

funcionarios.post('/registrarFuncionario', (req, res) => {
    const today = new Date()
    const funcionario = {
        cpf: req.body.cpf,
        nome: req.body.nome,
        dtNasc: req.body.dtNasc,
        login: req.body.login,
        senha: req.body.senha,
        dtCadastro: req.body.dtCadastro,
        timestampCadastro: req.body.timestampCadastro,
        cpfResponsavelCadastro: req.body.cpfResponsavelCadastro
    }

    Funcionarios.create(funcionario)
        .then(funcionario => {
            /*let token = jwt.sign(funcionario.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            })
            res.json({ token: token })*/
            console.log(funcionario);
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

funcionarios.post('/login', (req, res) => {
    Funcionarios.findOne({
        where: {
            login: req.body.login,
            senha: req.body.senha
        }
    })
        .then(funcionario => {
            if (funcionario) {
                let token = jwt.sign(funcionario.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token })
            } else {
                res.send('Funcionario não existe')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = funcionarios
