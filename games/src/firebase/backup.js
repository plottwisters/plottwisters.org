//usage instructions
//npm i -g  firestore-export-import
//node backup.js
const serviceAccount = require('./plot-twisters-firebase-adminsdk-8xln0-972c49733b.json');
const firestoreService = require('firestore-export-import');
const fs = require('fs');
// Initiate Firebase App

firestoreService.initializeApp(serviceAccount, "https://plot-twisters.firebaseio.com");

// Start exporting your data
firestoreService
  .backup('tasks')
  .then(data => {


    fs.writeFile("newbackup_"+ new Date().getTime() + ".json", JSON.stringify(data), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

  })
