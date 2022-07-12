import { useState, createContext, useEffect } from 'react'
import firebase from '../services/firebaseConection'

export const AuthContext = createContext({})

//prover as informações que tem dentro do contexto

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true) //abrindo a aplicação a pagina começa carregando

  //verifica se tem algum usuario logado na aplicacao
  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem('SistemaUser')

      if (storageUser) {
        setUser(JSON.parse(storageUser))
        setLoading(false)
      }

      setLoading(false)
    }
    loadStorage()
  }, [])

  //função para cadastrar usuario
  async function signUp(email, password) {
    setLoadingAuth(true) //quando alguem tiver tentando cadastrar
    await firebase.auth().createUserWithEmailAndPassword(email, password) //criar um usuario (await - espera a requisição para cadastro)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
