import firebase from 'firebase/app';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui'

let firebaseConfig = {
    apiKey: "AIzaSyBWj5sop-VPiIXKpF2ZTK6S4KSsyBRP2Bs",
    authDomain: "plot-twisters.firebaseapp.com",
    projectId: "plot-twisters"
  };
// let firebaseConfig = {
//   apiKey: "AIzaSyAimh03rTXmCeYeS8FNDqD57-uin8b1pCQ",
//   authDomain: "tbos-baad5.firebaseapp.com",
//   databaseURL: "https://tbos-baad5.firebaseio.com",
//   projectId: "tbos-baad5",
//   storageBucket: "tbos-baad5.appspot.com",
//   messagingSenderId: "1078395152590",
//   appId: "1:1078395152590:web:8faa2fc48425850f"
// };
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
export const db = firebase.firestore();

export const logIn = () => {
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        alert("hello");
        console.log('logggggg');
        
        console.log(authResult);
        console.log(redirectUrl);
        
        
        document.cookie = "uid="+authResult['user']['uid']+"; expires=Thu, 22 Dec 2022 12:00:00 UTC; path=/";
        return true;
      },
      signInFailure: function(error) {
        console.log('errrr');
        console.log(error);
        alert("hello");
        return handleUIError(error)
      },
      uiShown: function() {
        document.getElementById('root').style.display = 'none';
      }
    },
    signInSuccessUrl: 'http://localhost:1234/games/dist/cookie-trailF',
    signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      forceSameDevice: false,
      emailLinkSignIn: function() {
          return {
            // url: 'http://localhost:1234/games/dist/login',
            handleCodeInApp: true          
          };
        }
    }
    ]
    
};
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);

  // firebase.auth().onAuthStateChanged(function(user) {
  //   console.log("Inside onAuthStateChanged Function");
  //   if (user) {
  //     // User is signed in.
  //     var email = user.email;
  //     var uid = user.uid;
  //     console.log(email);
  //     console.log(uid);
  //   } else {
  //     console.log("Use is not si");
  //   }
  // });
};