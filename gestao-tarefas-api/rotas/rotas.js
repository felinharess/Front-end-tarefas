import express from 'express'
import { login, cadastrarUsuario } from '../controllers/authController.js'
import { listarTarefas, criarTarefa, atualizarTarefa, removerTarefa } from '../controllers/tarefasController.js'
import { autenticar } from '../middlewares/authMiddleware.js'

export const router = express.Router()

router.post('/login', login)
router.post('/usuarios', cadastrarUsuario)

router.use(autenticar)

router.get('/tarefas', listarTarefas)
router.post('/tarefas', criarTarefa)
router.put('/tarefas/:id', atualizarTarefa)
router.delete('/tarefas/:id', removerTarefa)
