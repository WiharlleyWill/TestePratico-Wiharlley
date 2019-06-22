const express = require('express')
const funcionarios = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Funcionarios = require('../models/Funcionarios')
funcionarios.use(cors())

process.env.SECRET_KEY = 'secret'

funcionarios.post('/registrarFuncionario', (req, res) => {
    const funcionario = {
        cpf: req.body.cpf,
        nome: req.body.nome,
        dtNasc: req.body.dtNasc,
        login: req.body.login,
        senha: req.body.senha,
        dtCadastro: req.body.dtCadastro,
        timestampCadastro: req.body.timestampCadastro,
        cpfResponsavelCadastro: req.body.cpfResponsavelCadastro,
        mesAniversario: req.body.mesAniversario
    }

    Funcionarios.create(funcionario)
        .then(funcionario => {
            /*let token = jwt.sign(funcionario.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            })
            res.json({ token: token })*/
            if (funcionario) {
                res.json(funcionario)
            } else {
                res.send(false);
            }
            console.log(funcionario);
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

funcionarios.post('/login', (req, res) => {
    console.log('Dados: ' + JSON.stringify(req.body))
    Funcionarios.findOne({
        where: {
            login: req.body.login,
            senha: req.body.senha
        }
    })
        .then(funcionario => {
            if (funcionario) {
                console.log("Login realizado");
                let token = jwt.sign(funcionario.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token, cpf: funcionario.dataValues.cpf })
            } else {
                res.send(false)
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

funcionarios.get('/buscaCPF', (req, res) => {
    console.log('Dados: ' + JSON.stringify(req.headers.search))
    Funcionarios.findOne({
        where: {
            cpf: req.headers.search
        }
    })
        .then(funcionario => {
            if (funcionario) {
                res.json(funcionario)
            } else {
                res.send(false);
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

funcionarios.get('/buscaNome', (req, res) => {
    console.log('Dados: ' + JSON.stringify(req.headers.search))
    Funcionarios.findAll({
        where: {
            nome: req.headers.search
        }
    })
        .then(funcionario => {
            if (funcionario) {
                res.json(funcionario)
            } else {
                res.send(false);
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

funcionarios.post('/updateFuncionario', (req, res) => {
    console.log("Chamou update");
    console.log(req.body);
    Funcionarios.update(
        req.body, {
            where: {
                cpf: req.body.cpf
            }
        })
        .then(funcionario => {
            if (funcionario) {
                res.json(funcionario)
            } else {
                res.send(false);
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

funcionarios.get('/buscaAniversariantes', (req, res) => {
    console.log('Dados: ' + JSON.stringify(req.headers.search))
    Funcionarios.findAll({
        where: {
            mesAniversario: req.headers.search
        }
    })
        .then(funcionario => {
            if (funcionario) {
                console.log(funcionario)
                res.json(funcionario)
            } else {
                console.log('falso')
                res.send(false);
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

funcionarios.get('/buscaLogin', (req, res) => {
    console.log('Dados: ' + JSON.stringify(req.headers.search))
    Funcionarios.findOne({
        where: {
            login: req.headers.search
        }
    })
        .then(funcionario => {
            if (funcionario) {
                res.json(funcionario)
            } else {
                res.send(false);
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


module.exports = funcionarios
