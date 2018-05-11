import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
 
  constructor() {
    var config = {
      apiKey: "AIzaSyATRWwJlGnzDnQXIq-WILGuQm7RKK5ZdRw",
      authDomain: "dondesang-c7810.firebaseapp.com",
      databaseURL: "https://dondesang-c7810.firebaseio.com",
      projectId: "dondesang-c7810",
      storageBucket: "dondesang-c7810.appspot.com",
      messagingSenderId: "596485316554"
    };
    firebase.initializeApp(config);
  }
}

