//CONFIGURAÇÕES DO FIREBASE

import firebase from 'firebase/app'
// import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCxOGjdwudK_fuW3mYhUQZ05ObHHHgcK2c',
  authDomain: 'product-stock.firebaseapp.com',
  projectId: 'product-stock',
  storageBucket: 'stock-of-products.appspot.com',
  messagingSenderId: '1012302272095',
  appId: '1:1012302272095:web:4b49757af2bbc6bae3edea',
  measurementId: 'G-8317P4KL7H'
}

// // Initialize Firebase
// if (!firebase.apps.length) {
const app = firebase.initializeApp(firebaseConfig)

// }

export default firebase
