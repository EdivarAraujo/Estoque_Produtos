import { useState, createContext, useEffect } from 'react'
import { db, app } from '../services/firebaseConection'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutService
} from 'firebase/auth'
import { useHistory } from 'react-router-dom'

export const AuthContext = createContext({})

// ------------- prover as informações que tem dentro do contexto -----------------

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true) //abrindo a aplicação a pagina começa carregando
  const navigate = useHistory()

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

  // ------------------- função para logar usuario --------------------------

  async function signIn(email, password) {
    setLoadingAuth(true)
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        // Signed in
        const user = userCredential.user
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const userProfile = docSnap.data()
          let data = {
            uid: user.uid,
            nome: userProfile.nome,
            avatarUrl: userProfile.avatarUrl,
            email: user.email
          }
          //fez o login(está logado)
          setUser(data)
          //salva no storageUser
          storageUser(data)
          //muda pra falso após o login
          setLoadingAuth(false)
          // Redirecionando
          navigate.push('/dashboard')
        } else {
          // doc.data() will be undefined in this case
          console.log('Nenhum documento encontrado!')
        }
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(`${errorCode} ${errorMessage}`)
      })
  }

  //---------------------- função para cadastrar usuario (CADASTRA USUARIO) ---------------

  async function signUp(email, password, nome) {
    //quando alguem tiver tentando cadastrar
    setLoadingAuth(true)
    const auth = getAuth()
    //criar um usuario (await - espera a requisição para cadastro)
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async value => {
        //captura o id do usuario cadastrado, e coloca dentro variavel uid
        let uid = value.user.uid
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
  // --------------------- armazena um usuario no localStorage -------------------------
  function storageUser(data) {
    localStorage.setItem('SistemaUser', JSON.stringify(data))
  }

  // --------- função íra deslogar usuario e lipar o local storage, e voltar o usuario para nulo ---------------

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
        signOut,
        signIn,
        loadingAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
