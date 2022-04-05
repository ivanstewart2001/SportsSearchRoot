import * as firebase from 'firebase/compat'

const firebaseConfig = {
  apiKey: "AIzaSyAVSJsD7UaSCPD_xCqcVb_4VhfnYNzhn64",
  authDomain: "sports-search.firebaseapp.com",
  projectId: "sports-search",
  storageBucket: "sports-search.appspot.com",
  messagingSenderId: "561686994873",
  appId: "1:561686994873:web:8f4cccf7a1b53f23b82068"
};

// Initialize Firebase
let app:any
if (firebase.default.apps.length === 0) {
  app = firebase.default.initializeApp(firebaseConfig);
} else {
  app = firebase.default.app
}

const database = firebase.default.database()
const auth = firebase.default.auth()

export { app, firebase, database, auth }