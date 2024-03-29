import firebase from "firebase/app"
import "firebase/database"
import "firebase/auth"
// import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyA6ylUT594moll8XBh4UNxNn6onKlxWUVA",
  authDomain: "react-shop-project-fe8ba.firebaseapp.com",
  databaseURL: "https://react-shop-project-fe8ba-default-rtdb.firebaseio.com/",
  projectId: "react-shop-project-fe8ba",
  storageBucket: "react-shop-project-fe8ba.appspot.com",
  messagingSenderId: "400586946202",
  appId: "1:400586946202:web:335faaf6c32254d95a1123"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { database as default, googleAuthProvider, firebase }

// // set ile yapılma
// database.ref().set({
//   title: "blog title"
// }).then(res=> {
//   console.log("yes")
//     database.ref("tags")
//     .set(["angular","firebase"]).then(() => {
//       console.log("eklendi")
//     }).catch(err => console.log("firebase hata", err))
// }) 
// .catch(e => {
//   console.log("firebase hata: ", e)
// })





// // push ile ekleme
// database.ref("users").push({
//   title: "new uuid title"
// })

// // remove ile silme
// database.ref("tags").remove()


// // update ile güncelleme
// database.ref().update({
//   name: "Ada",
//   surname: "Turan",
//   author: {
//     name: "Ada",
//   },
//   "author/name": "Ada6"
// })

// database.ref("author").update({
//   name: "Ada"
// })


// // once ve on ile gtirme
// once = güncelleme olduğunda gtirmez
// on = güncelleme olduğunda gtirir

// database.ref("author/name")
// .once("value")
// .then((snapshot) => {
//   const blog = snapshot.val()
//   console.log(blog)
// })
// .catch(err => console.log("hata: ", err))

// database.ref()
//   .on("value", (snapshot) => {
//     const blog = snapshot.val()
//     console.log(blog)
//   })
  
// off ile bağlantıyı sonlandırma
// database.ref().off();

// database.ref("users").on("value", (snapshot) => {
//   const users = [];
  
//   snapshot.forEach(user => {
//     users.push({
//       id: user.key,
//       ...user.val()
//     })
//   })

//   return users;
// })





// // examples
// const blogs = [
//   { id: "1", title: "Blog title 1" },
//   { id: "2", title: "Blog title 2" },
//   { id: "3", title: "Blog title 3" }
// ]

// const blogs = {
//   101: { id: "1", title: "Blog title 1" },
//   102: { id: "2", title: "Blog title 2" }
// }

// database.ref().set({
//   blogs: blogs
// })

























