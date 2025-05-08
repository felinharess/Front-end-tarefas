import { useEffect, useState } from 'react'
import axios from 'axios'
import './login.css'
import { Navigate } from 'react-router-dom'

export default function Lista() {
    const [tarefas, setTarefas]= useState([])   
    
    useEffect(() => {
      }, [tarefas])

    useEffect(()=>{
      
        buscarTarefas()
    },[]);

    async function buscarTarefas() {
        const token = localStorage.getItem('token')
        if(!token){
            alert("Erro no sistema")
        }
        try{
            const retorno = await axios.get('http://localhost:3000/tarefas',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
                
            });
            if(retorno.data.length == 0){
                return  alert("Nenhuma tarefa criada")
            }
            setTarefas(retorno.data)
            console.log(tarefas)
        }catch(erro){
            console.log("Erro ao buscar tarefa", erro);
            alert("Erro ao carregar tarefas");
        }

    }
    return (
        <>
            <h1>Tarefas do {localStorage.getItem('nome')}</h1>
            <ul>
                {tarefas.map((tarefas)=>(
                    <li key = {tarefas.id}> {tarefas.titulo} - {tarefas.descricao}</li>
                ))}
            </ul>
        </>
    )
}
