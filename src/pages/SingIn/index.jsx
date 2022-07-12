import { useState } from 'react'
import './signin.css'
import logo from '../../assets/logoTijuca.png'
import { Link } from 'react-router-dom'

function SingIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault() // para não atualiza a pagina
    alert('Please enter')
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Sistema Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="email@tijucaalimentos.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Acessar</button>
        </form>
        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  )
}

export default SingIn
