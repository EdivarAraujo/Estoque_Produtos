import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCxOGjdwudK_fuW3mYhUQZ05ObHHHgcK2c',
  authDomain: 'estoque-de-produtos.firebaseapp.com',
  projectId: 'estoque-de-produtos',
  storageBucket: 'estoque-de-produtos.appspot.com',
  messagingSenderId: '1012302272095',
  appId: '1:1012302272095:web:4b49757af2bbc6bae3edea',
  measurementId: 'G-8317P4KL7H'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

export { app, db }
