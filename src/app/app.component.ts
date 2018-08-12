import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    constructor(db: AngularFirestore) {
  
    }

  ngOnInit() {
    firebase.initializeApp({
      // For other projects use different keys
      apiKey: "AIzaSyB_1iOhRSdRmEqWVEl8XtVZLSEM2r_cazY",
      authDomain: "electronapp-d2cb6.firebaseapp.com",
      databaseURL: "https://electronapp-d2cb6.firebaseio.com",
      projectId: "electronapp-d2cb6",
      storageBucket: "electronapp-d2cb6.appspot.com",
      messagingSenderId: "352468646900"
    });

    // See users, messages and keep in touch in console log

    // const preUsers = document.getElementById('users');
    // const dbRefUsers = firebase.database().ref().child('users');
    // dbRefUsers.on('value', snap => console.log(snap.val()));

    // const preMessages = document.getElementById('messages');
    // const dbRefMessages = firebase.database().ref().child('messages');
    // dbRefMessages.on('value', snap => console.log(snap.val()));

    // const preTouch = document.getElementById('touch');
    // const dbRefTouch = firebase.database().ref().child('touch');
    // dbRefTouch.on('value', snap => console.log(snap.val()));
  }
}
