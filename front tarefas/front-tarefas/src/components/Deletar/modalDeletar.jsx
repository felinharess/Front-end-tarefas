import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './modalDeletar.css'

export default function ModalDeletar({ isOpen, onClose, tarefa, deletarTarefa }) {
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

  async function apagarTarefa() {
    const token = localStorage.getItem('token')
    try {
      await axios.delete(`http://localhost:3000/tarefas/${tarefa.id}`,{
        headers: { Authorization: `Bearer ${token}` }
      })
      deletarTarefa()
      onClose()
    } catch (erro) {
      console.log("Erro ao apagar", erro)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Deletar Tarefa</h2>
        
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

        <button onClick={apagarTarefa}>Excluir</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  )
}
