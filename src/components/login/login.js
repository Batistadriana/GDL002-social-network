import loginTemplate from "./login-template.js";
import registrationTemplate from "./registration-template.js";
import globalFunctions from "../../global-functions.js";

let login = {
  loginTemplate: loginTemplate,
  registrationTemplate: registrationTemplate
};

//registro usuarios nuevos
login.registerUser = function() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let curp = document.getElementById("curp").value;
  let password = document.getElementById("password").value;
  console.log(`${name} ${email} ${curp} ${password}`);
  let gender = 10;
  let genderM = curp.charAt(gender);
  if (genderM === "M") {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(response) {
        // guardar nombre usuario
        // para el curp necesitamos crear otra tabla
        response.user.updateProfile({
          displayName: name
        });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  } else {
    console.log("fail");
  }
};

login.loginUser = function() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
};

login.logOut = function() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
      console.log(error);
    });
};

globalFunctions.addFunctions("logOut", login.logOut);
globalFunctions.addFunctions("loginUser", login.loginUser);
globalFunctions.addFunctions("registerUser", login.registerUser);
export default login;
