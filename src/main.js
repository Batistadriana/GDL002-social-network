// // The Firebase SDK is initialized and available here!
//
// firebase.auth().onAuthStateChanged(user => { });
// firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
//

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

window.onpopstate = function(event) {
  console.log(window.location.pathname)
  if(window.location.pathname === '/create-user'){
    window.login.showRegistration();
  } else if(window.location.pathname === '/') {
    let user = firebase.auth().currentUser;
    checkLogin(user);
  }
};