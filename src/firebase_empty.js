import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  //enter your own config
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
