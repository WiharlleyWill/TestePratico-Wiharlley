const Sequelize = require('sequelize')
const db = require('../database/db.js')
db
module.exports = db.sequelize.define(
    'veiculos',
    {
        placa: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        ativo: {
            type: Sequelize.BOOLEAN
        },
        anoFabricacao: {
            type: Sequelize.STRING
        },
        anoModelo: {
            type: Sequelize.STRING
        },
        chassi: {
            type: Sequelize.STRING
        },
        dtCadastro: {
            type: Sequelize.STRING
        },
        timestampCadastro: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        dtAtivacao: {
            type: Sequelize.STRING
        },
        timestampAtivacao: {
            type: Sequelize.DATE,
            defaultValue: ''
        },
        dtDesativacao: {
            type: Sequelize.STRING
        },
        timestampDesativacao: {
            type: Sequelize.DATE,
            defaultValue: ''
        },
        modelo: {
            type: Sequelize.STRING
        },
        cor: {
            type: Sequelize.STRING
        },
        consumoMedio: {
            type: Sequelize.DECIMAL
        },
        numeroPassageiros: {
            type: Sequelize.INTEGER
        },
        cpfFuncionario: {
            type: Sequelize.STRING
        },
        nomeFuncionario: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)
