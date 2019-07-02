import firebase from 'firebase/app';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui'


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

export const logIn = () => {
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          document.cookie = "uid="+authResult['user']['uid']+"; expires=Thu, 22 Dec 2022 12:00:00 UTC; path=/";
        return true;
      },
      uiShown: function() {
        document.getElementById('root').style.display = 'none';
      }
    },
    signInSuccessUrl: 'http://localhost:1234/two-birds-one-stone',
    signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      forceSameDevice: false,
      emailLinkSignIn: function() {
          return {
  //           url: 'http://localhost:1234?url',
            handleCodeInApp: true          
          };
        }
    }
    ]
    
  };
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);
};
