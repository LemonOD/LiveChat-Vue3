import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDoXYUG0VNz9HUavKwTRSKDmebETtnWG8",
    authDomain: "odblogs.firebaseapp.com",
    projectId: "odblogs",
    storageBucket: "odblogs.appspot.com",
    messagingSenderId: "818621396645",
    appId: "1:818621396645:web:0c6958873a1891144bbf4c",
    measurementId: "G-SXTYN9W6JH"
};
//init firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()

const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectAuth,projectFirestore,timestamp}
