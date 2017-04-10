import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCNSVSdfb0xfKuJHXNpHwtxJ6xZK8eeXc0',
  authDomain: 'wrestlermania-d7fba.firebaseapp.com',
  databaseURL: 'https://wrestlermania-d7fba.firebaseio.com',
  projectId: 'wrestlermania-d7fba',
  storageBucket: 'wrestlermania-d7fba.appspot.com',
  messagingSenderId: '365952828761'
};

firebase.initializeApp(config);

export default firebase;
