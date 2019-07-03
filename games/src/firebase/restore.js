//usage instructions
//npm i -g  firestore-export-import
//node backup.js
let path = "/Users/adityaaggarwal/Documents/2018/CodingProjects/plottwisters-firestore-backup"
const serviceAccount = require(path + '/plot-twisters-firebase-adminsdk-8xln0-972c49733b.json');
const firestoreService = require('firestore-export-import');
const fs = require('fs');
// Initiate Firebase App
firestoreService.initializeApp(serviceAccount, "https://plot-twisters.firebaseio.com");

// Start exporting your data
firestoreService.restore(path + '/newbackup_1561942418406.json');
