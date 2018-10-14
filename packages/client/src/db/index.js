import firebase from "firebase/app"
import "firebase/firestore"

firebase.initializeApp({
  apiKey: "AIzaSyDfh9zG59gZdoFpVtPN_aBEOq89L_ciqzk",
  projectId: "letgo-space",
  authDomain: "letgo-space.firebaseapp.com",
})

const db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true,
})

export default db
