// // The Firebase SDK is initialized and available here!
//
// firebase.auth().onAuthStateChanged(user => { });
// firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
//
let app = firebase.app();

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD7n36Cd32hsK3baXRuEDk0YaYBqs5f55s",
  authDomain: "social-network-4b3ef.firebaseapp.com",
  databaseURL: "https://social-network-4b3ef.firebaseio.com",
  projectId: "social-network-4b3ef",
  storageBucket: "social-network-4b3ef.appspot.com",
  messagingSenderId: "685213404699"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

// guardamos el elemento root en una variable para que pueda ser utilizado por los componentes
window.root = document.getElementById('root');
window.getElementById = document.getElementById.bind(document);

// funcion que checa si el usuario hizo login y decide que pantalla mostrar
let checkLogin = function(user) {
    if (user) {
      window.newsFeed.showFeed();
      
    } else {
      window.login.showLogin();
    }
  };

firebase.auth().onAuthStateChanged(checkLogin)