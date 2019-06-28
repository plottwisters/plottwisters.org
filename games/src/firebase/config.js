import firebase from 'firebase/app';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyAimh03rTXmCeYeS8FNDqD57-uin8b1pCQ",
    authDomain: "tbos-baad5.firebaseapp.com",
    databaseURL: "https://tbos-baad5.firebaseio.com",
    projectId: "tbos-baad5",
    storageBucket: "tbos-baad5.appspot.com",
    messagingSenderId: "1078395152590",
    appId: "1:1078395152590:web:8faa2fc48425850f"
  };
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(); 
