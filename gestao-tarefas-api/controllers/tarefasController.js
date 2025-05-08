import { Tarefa } from '../models/Tarefa.js'

export const listarTarefas = async (req, res) => {
    const tarefas = await Tarefa.findAll({ where: { usuario_id: req.usuarioId } })
    res.json(tarefas)
}

export const criarTarefa = async (req, res) => {
    const { titulo, descricao } = req.body
    const nova = await Tarefa.create({ titulo, descricao, usuario_id: req.usuarioId })
    res.status(201).json(nova)
}

export const atualizarTarefa = async (req, res) => {
    const { id } = req.params
    const tarefa = await Tarefa.findOne({ where: { id, usuario_id: req.usuarioId } })
    if (!tarefa) return res.status(404).json({ mensagem: 'Tarefa não encontrada' })

    await tarefa.update(req.body)
    res.json(tarefa)
}

export const removerTarefa = async (req, res) => {
    const { id } = req.params
    const tarefa = await Tarefa.findOne({ where: { id, usuario_id: req.usuarioId } })
    if (!tarefa) return res.status(404).json({ mensagem: 'Tarefa não encontrada' })

    await tarefa.destroy()
    res.status(204).send()
}