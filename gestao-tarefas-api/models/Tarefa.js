import { DataTypes } from 'sequelize'
import { database } from '../database/index.js'
import { Usuario } from './Usuario.js'

export const Tarefa = database.define('Tarefa', {
    titulo: {
        type: DataTypes.STRING,
    },
    descricao: {
       type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pendente'
    }
})

Tarefa.belongsTo(Usuario, { foreignKey: 'usuario_id' })
Usuario.hasMany(Tarefa, { foreignKey: 'usuario_id' })
