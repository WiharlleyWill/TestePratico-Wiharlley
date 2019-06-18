const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'funcionarios',
    {
        cpf: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING
        },
        dtNasc: {
            type: Sequelize.STRING
        },
        login: {
            type: Sequelize.STRING
        },
        senha: {
            type: Sequelize.STRING
        },
        dtCadastro: {
            type: Sequelize.STRING
        },
        timestampCadastro: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        cpfResponsavelCadastro: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)
