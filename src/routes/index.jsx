//CONFIGURAÇÃO DE TODAS ROTAS DE NAVEGAÇÃO
import { Switch } from 'react-router-dom'
import Route from './Route'

import SingIn from '../pages/SingIn'
import SingUp from '../pages/SingUp'
import Home from '../pages/Home'
import Colaboradores from '../pages/Colaboradores'
import Produtos from '../pages/Produtos'
import Setores from '../pages/Setores'
import Dashboard from '../pages/Dashboard'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SingIn} />
      <Route exact path="/register" component={SingUp} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/collaborators" component={Colaboradores} />
      <Route exact path="/products" component={Produtos} />
      <Route exact path="/sectors" component={Setores} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  )
}
