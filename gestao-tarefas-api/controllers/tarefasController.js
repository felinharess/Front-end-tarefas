import { Tarefa } from '../models/Tarefa.js'

export const listarTarefas = async (req, res) => {
    try {
        const tarefas = await Tarefa.findAll({ where: { usuario_id: req.usuarioId } })
        res.json(tarefas)
    } catch (erro) {
        console.log("erro", erro)
        res.status(500).send({ "mensagem": erro })
    }
}

export const criarTarefa = async (req, res) => {
    try {
    const { titulo, descricao } = req.body
    const nova = await Tarefa.create({ titulo, descricao, usuario_id: req.usuarioId })
    res.status(201).json(nova)
    } catch (erro) {    
        console.log("erro", erro)
        res.status(500).send({ "mensagem": erro })
    }
}

export const atualizarTarefa = async (req, res) => {
    try{
    const { id } = req.params
    const tarefa = await Tarefa.findOne({ where: { id, usuario_id: req.usuarioId } })
    if (!tarefa) return res.status(404).json({ mensagem: 'Tarefa não encontrada' })

    await tarefa.update(req.body)
    res.json(tarefa)
} catch (erro){
    console.log("erro", erro);
    res.status(500).send({"mensagem": erro})
}
}

export const removerTarefa = async (req, res) => {
    try{
    const { id } = req.params
    const tarefa = await Tarefa.findOne({ where: { id, usuario_id: req.usuarioId } })
    if (!tarefa) return res.status(404).json({ mensagem: 'Tarefa não encontrada' })

    await tarefa.destroy()
    res.status(204).send()
} catch (erro){
    console.log("erro", erro);
    res.status(500).send({"Mensagem": erro})
}
}