import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './modalEditar.css'

export default function ModalEditar({ isOpen, onClose, tarefa, atualizarTarefas }) {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo)
      setDescricao(tarefa.descricao)
      setStatus(tarefa.status === "Feita")
    }
  }, [tarefa])

  async function editarTarefa() {
    const token = localStorage.getItem('token')
    try {
      await axios.put(`https://api-de-tarefas-otqs.onrender.com/tarefas/${tarefa.id}`, {
        titulo,
        descricao,
        status: status ? "Feita" : "Pendente"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      atualizarTarefas()
      onClose()
    } catch (erro) {
      console.log("Erro ao editar", erro)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Tarefa</h2>

        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
        />

        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
        />

        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={status}
            onChange={() => setStatus(!status)}
          />
          <label>Marcar como feita</label>
        </div>
        <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
          <button onClick={onClose} className="btn-cancel">Cancelar</button>
          <button onClick={editarTarefa} >Salvar</button>
        </div>
      </div>
    </div>
  )
}
