import { useEffect, useState } from 'react'
import axios from 'axios'
import './lista.css'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import ModalEditar from '../components/Editar/modalEditar'
import ModalDeletar from '../components/Deletar/modalDeletar'
import ModalCriar from '../components/Criar/modalCriar'
export default function Lista() {
    const [tarefa, setTarefa] = useState([])
    const [openModalEditar, setOpenModalEditar] = useState(false)
    const [openModalCriar, setOpenModalCriar] = useState(false)
    const [openModalDeletar, setOpenModalDeletar] = useState(false)
    const [tarefaSelecionada, setTarefaSelecionada] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
    }, [tarefa])

    useEffect(() => {

        buscartarefa()
    }, []);

    async function buscartarefa() {
        const token = localStorage.getItem('token')
        if (!token) {
            alert("Erro no sistema")
        }
        try {
            const retorno = await axios.get('http://localhost:3000/tarefas', {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });
            setTarefa(retorno.data)
            console.log(tarefa)
        } catch (erro) {
            console.log("Erro ao buscar tarefa", erro);
            alert("Erro ao carregar tarefa");
        }

    }
    function fazerLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('nome');
        navigate('/');
    }
    function abrirModalEditar(tarefa) {
        setTarefaSelecionada(tarefa);
        setOpenModalEditar(true)
        console.log(tarefaSelecionada);
    }
    function abrirModalDeletar(tarefa) {
        setTarefaSelecionada(tarefa);
        setOpenModalDeletar(true);
        console.log(tarefaSelecionada)
    }
    function abrirModalCriar() {
        setTarefaSelecionada(tarefa);
        setOpenModalCriar(true)
        console.log(tarefaSelecionada);
    }

    return (
        <div className="lista-container">
            <h1>Tarefas do {localStorage.getItem('nome')}</h1>

            {tarefa.length === 0 ? (
                <h2>Nenhuma tarefa criada</h2>
            ) : (
                tarefa.map((tarefa) => (
                    <div className="tarefa-item" key={tarefa.id}>
                        <div className="tarefa-texto">
                            <h3>{tarefa.titulo}</h3>
                            <p>{tarefa.descricao}</p>
                            <span className={`badge ${tarefa.status === 'Feita' ? 'feita' : 'pendente'}`}>
                                {tarefa.status}
                            </span>
                        </div>
                        <div className="tarefa-acoes">
                            <FaEdit onClick={() => abrirModalEditar(tarefa)} />
                            <FaTrash onClick={() => abrirModalDeletar(tarefa)} />
                        </div>
                    </div>
                ))
            )}
            <div className="btn-container">
                <button
                    onClick={() => abrirModalCriar()}>Criar Tarefa
                </button>
            </div>

            <button 
                className="logout-btn"
                onClick={() => fazerLogout()}>Fazer Logout
            </button>



            <ModalCriar
                isOpen={openModalCriar}
                onClose={() => setOpenModalCriar(false)}
                criarTarefa={buscartarefa}
            />
            <ModalEditar
                isOpen={openModalEditar}
                onClose={() => setOpenModalEditar(false)}
                atualizarTarefas={buscartarefa}
                tarefa={tarefaSelecionada}

            />
            <ModalDeletar
                isOpen={openModalDeletar}
                onClose={() => setOpenModalDeletar(false)}
                tarefa={tarefaSelecionada}
                deletarTarefa={buscartarefa}
            />
        </div>
    )
}
