import { useState, useEffect } from 'react'
import axios from 'axios'
import './modalCriar.css'

export default function ModalCriar({ isOpen, onClose, criarTarefa }) {
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    
    useEffect(() => {
        if (isOpen) {
            setTitulo('')
            setDescricao('')
        }
    }, [isOpen])

    async function criarNovaTarefa() {
        const token = localStorage.getItem('token')
        try {
            await axios.post(`https://api-de-tarefas-otqs.onrender.com/tarefas`, {
                titulo,
                descricao,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            criarTarefa()
            onClose()
        } catch (erro) {
            console.log("Erro ao criar", erro)
        }
    }

    if (!isOpen) return null

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Criar nova tarefa</h2>
                <input type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder='Titulo da tarefa' />

                <input type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder='Descrição da tarefa' />

                <div className="button-group">
                    <button onClick={onClose} className="btn-cancel">Cancelar</button>
                    <button onClick={criarNovaTarefa}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}
