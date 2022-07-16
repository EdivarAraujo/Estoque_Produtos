import { useState, useContext, useEffect } from 'react'
import logo from '../../assets/logoTijuca.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

function SingUp() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //chama a função de cadastro
  const { signUp } = useContext(AuthContext)

  function handleSubmit(e) {
    e.preventDefault() // para não atualiza a pagina

    if (nome !== '' && email !== '' && password !== '') {
      signUp(email, password, nome)
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Sistema Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Cadastro de usuarios</h1>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="email@tijucaalimentos.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="******"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </form>
        <Link to="/">Já tem uma conta? Entre</Link>
      </div>
    </div>
  )
}

export default SingUp
