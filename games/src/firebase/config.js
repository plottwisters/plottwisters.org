const firebase = require('firebase');
import 'firebase/firestore';
import {generateInitialUser, generateInitialTasks} from './init_generators';

let firebaseConfig = {
  apiKey: "AIzaSyBWj5sop-VPiIXKpF2ZTK6S4KSsyBRP2Bs",
  authDomain: "plot-twisters.firebaseapp.com"
  projectId: "plot-twisters"
};
firebase.initializeApp(firebaseConfig);

firebase.firestore().enablePersistence().catch(function(err) {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});





export const uiConfig = {
  signInSuccessUrl: 'http://plottwisters.org/games/dist/two-birds-one-stone',
  callbacks: {
    uiShown: function() {
      document.getElementById('second-wrap').style.display = 'none';
    }
  },
  signInOptions: [{

    signInSuccessUrl: 'http://plottwisters.org/games/dist/two-birds-one-stone',
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    forceSameDevice: false,
    emailLinkSignIn: function() {
      return {
        handleCodeInApp: true
      };
    }
  }]
};






export const db = firebase.firestore();
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.cookie = "userid=" + user.uid+"; expires=Thu, 18 Dec 2022 12:00:00 UTC";
    db.collection('users').doc(user.uid).get().then((doc)=>{
      if (!doc.exists) {
          db.collection("users").doc(user.uid).set(generateInitialUser());
          db.collection("tasks").doc("idroot_"+user.uid).set(generateInitialTasks(user.uid));
      }
    });
  }
});
export const auth = firebase.auth();
