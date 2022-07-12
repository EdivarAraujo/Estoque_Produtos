import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/auth'
import Routes from './routes'

//prover para todos as informaçoẽs dentro dessa rota, consegue o controle de tudo que esta dentro
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
