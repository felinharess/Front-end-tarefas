import { DataTypes } from 'sequelize'
import { database } from '../database/index.js'

export const Usuario = database.define('Usuario', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING
})
