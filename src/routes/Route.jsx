//COMPONENTE
import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed, loading } = useContext(AuthContext)

  if (loading) {
    return <div></div>
  }
  //se tentar acessar uma rota privada não tiver logado retorna para a tela de login
  if (!signed && isPrivate) {
    return <Redirect to="/" />
  }
  // se ele tiver logado e tela que tentou acessa não é privada vai direcionar para o deshboard
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />
  }
  //componente a ser renderizado
  return <Route {...rest} render={props => <Component {...props} />} />
}
