import { useState, useEffect } from 'react'
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
      setStatus(tarefa.status === "Feita")}
  }, [tarefa])

  async function apagarTarefa() {
    const token = localStorage.getItem('token')
    try {
      await axios.delete(`https://api-de-tarefas-otqs.onrender.com/tarefas/${tarefa.id}`, {
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
        <h2>Você tem certeza que deseja apagar essa tarefa?</h2>
        <h3>Se você confirmar, não terá como restaurar a Tarefa</h3>
        <div className="button-group">
          <button onClick={onClose} className="btn-cancel">Cancelar</button>
          <button onClick={apagarTarefa}>Confirmar</button>
        </div>
      </div>
    </div>
  )
}
