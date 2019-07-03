import firebase from 'firebase/app';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyBWj5sop-VPiIXKpF2ZTK6S4KSsyBRP2Bs",
    authDomain: "plot-twisters.firebaseapp.com",
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
export const db = firebase.firestore();
