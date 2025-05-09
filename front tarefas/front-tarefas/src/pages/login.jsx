import { useState } from 'react'
import axios from 'axios'
import './login.css'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const navigate = useNavigate();

  async function logar(event) {
    try {
      event.preventDefault()
      // console.log(nome, email, senha)
      const retorno = await axios.post('http://localhost:3000/login',{email, senha})
      console.log(retorno.data.token)
      if(!retorno.data.token){
        alert("Credenciais invalidas")
      }else{
        localStorage.setItem('token', retorno.data.token)
        localStorage.setItem('nome', retorno.data.nome)
        localStorage.setItem('email', retorno.data.email)
      navigate('/lista');
    }
    } catch (erro) {
      console.log("Erro na conexão com api: ", erro)
      alert("Credenciais invalidas")
    }
  }

  async function cadastrar(event) {
    event.preventDefault()
    try{
      // console.log(nome ,email, senha);
      const retorno = await axios.post('http://localhost:3000/usuarios',{nome, email, senha})
      console.log(retorno.data.token)
      if(!retorno.data.token){
        alert("Dados ja cadastrados") 
      }else{
        localStorage.setItem('token', retorno.data.token)
        localStorage.setItem('nome', retorno.data.nome)
        localStorage.setItem('email', retorno.data.email)
      navigate('/lista');
    }
    }catch(erro){
      console.log(erro)
      alert("Dados ja cadastrados")
    }
  }
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/128/2277/2277980.png" className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Gestão de tarefas</h1>
      {/* Login */}
      <div className='formularios'>
        <form>
          <h3>Login</h3>
          <label htmlFor="">Email</label>
          <input className="login"
            type="text"
            placeholder='Email'
            onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="">Digite a sua senha</label>
          <input className="login"
            type="password"
            placeholder='Senha'
            onChange={(event) => setSenha(event.target.value)} />
          <button
            onClick={(event) => logar(event)
            }>Logar
          </button>
        </form>

        <div className="barra"></div>

        {/* cadastrar */}
        <form action="">
          <h3>Não possui conta? Cadastre-se</h3>
          <label htmlFor="">Nome</label>
          <input className="cadastro"
            type="text"
            placeholder='Nome'
            onChange={(event) => setNome(event.target.value)} />
          <label htmlFor="">Email</label>
          <input className="cadastro"
            type="text"
            placeholder='email'
            onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="">Digite a sua senha</label>
          <input className="cadastro"
            type="password"
            placeholder='Senha'
            onChange={(event) => setSenha(event.target.value)} />
          <button
          onClick={(event)=> cadastrar(event)}>Cadastrar</button>
        </form>
      </div>
    </>
  )
}

export default Login
