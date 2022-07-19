import { firebase, googleAuthProvider } from "../../firebase/firebaseConfig"

export const login = () => {
  return firebase.auth().signInWithPopup(googleAuthProvider)
    .then(res => console.log(res.user.uid))
}

export const logout = () => {
  return firebase.auth().signOut()
}