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

  //função para cadastrar usuario (CADASTRA USUARIO)
  async function signUp(email, password, nome) {
    setLoadingAuth(true) //quando alguem tiver tentando cadastrar
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password) //criar um usuario (await - espera a requisição para cadastro)
      .then(async value => {
        const uid = value.user.uid //captura o id do usuario cadastrado, nessa let
        //vai no banco fazer o cadastro de usuario (CADASTRA NO BANCO)
        await firebase
          .firestore()
          .collection('users')
          .doc(uid)
          .set({
            nome: nome,
            avatarUrl: null
          })
          //dados que são colocados para fazer o cadastro, disponibilizados para todos terem acesso
          .then(() => {
            const data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
              avatarUrl: null
            }
            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
          })
      })
      //capatura um erro, caso de algum problema
      .catch(error => {
        console.log(error)
        setLoadingAuth(false)
      })
  }
  //salvar um item no localStorage
  function storageUser(data) {
    localStorage.setItem('SistemaUser', JSON.stringify(data))
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
