import jwt from 'jsonwebtoken'
import { Usuario } from '../models/Usuario.js'
import { response } from 'express'

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body
        const usuario = await Usuario.findOne({ where: { email } })

        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' })
        }

        const token = jwt.sign({ id: usuario.id }, process.env.SEGREDO_JWT, { expiresIn: '1h' })
        res.json({ token, 
            nome: usuario.nome,
            email: usuario.email
         })
    }
    catch (erro) {
        console.log("erro", erro)
        res.status(500).send({ "mensagem": erro })
    }
}

export const cadastrarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body
        const existe = await Usuario.findOne({ where: { email } })
        if (existe) return res.status(400).json({ mensagem: 'Usuário já existe' })

        const novo = await Usuario.create({ nome, email, senha })
        const token = jwt.sign({ id: novo.id }, process.env.SEGREDO_JWT, { expiresIn: '1h' })
        res.json({ token,
            nome: novo.nome,
            nome: novo.email
         })
    }
    catch (erro) {
        console.log("erro", erro)
        res.status(500).send({ "mensagem": erro })
    }
}
