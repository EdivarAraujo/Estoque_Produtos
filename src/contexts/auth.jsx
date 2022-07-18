import { useState, createContext, useEffect } from 'react'
import { db, app } from '../services/firebaseConection'
import { setDoc, doc } from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut as signOutService
} from 'firebase/auth'

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
    const auth = getAuth()
    await createUserWithEmailAndPassword(auth, email, password) //criar um usuario (await - espera a requisição para cadastro)
      .then(async value => {
        let uid = value.user.uid //captura o id do usuario cadastrado, nessa let
        //vai no banco fazer o cadastro de usuario (CADASTRA NO BANCO)

        try {
          const docRef = await setDoc(doc(db, 'users', String(uid)), {
            nome: nome,
            avatarUrl: null
          }).then(() => {
            //dados que são colocados para fazer o cadastro, disponibilizados para todos terem acesso
            let data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
              avatarUrl: null
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            console.log(error)
          })
          console.log('Documento inserido ID: ', docRef.id)
        } catch (e) {
          console.error('Erro ao adicionar documento: ', e)
        }
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

  // função ára deslogar usuario e lipar o local storage, e voltar o usuario para nulo

  async function signOut() {
    // alert('')
    const auth = getAuth()
    signOutService(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
      })
    localStorage.removeItem('SistemaUser')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
