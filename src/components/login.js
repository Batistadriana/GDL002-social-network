window.login = {};
window.login.showLogin = function() {
  history.pushState(null, 'Inicio', '/')
  let loginTemplate = String.raw`
    <form>
      <div>
        <label for="email">Email</label>
        <input type="text" class="form-control" name="email" id="email" />
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input type="password" class="form-control" name="password" id="password" />
      </div>
      <div>
        <input type="button" value="Iniciar sesión" onclick="window.login.loginUser()" />
        <input type="button" value="Registrar" onclick="window.login.showRegistration()" />
      </div>
    </form>
  `;
  
};

window.login.showRegistration = function() {
  history.pushState(null,"register","create-user")
  let registrationTemplate = String.raw`
      <form>
        <div>
          <label for="name">Nombre</label>
          <input type="text" class="form-control" name="name" id="name" />
        </div>
      <div>
        <label for="email">Email</label>
        <input type="text" class="form-control" name="email" id="email" />
      </div>
      <div>
        <label for="curp">CURP</label>
        <input type="text" class="form-control" name="curp" id="curp" />
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input type="password" class="form-control" name="password" id="password" />
      </div>
      <div>
        <input type="button" value="Atras" onclick="window.login.showLogin()" />
        <input type="button" value="Registrar" onclick="window.login.registerUser()" />
      </div>
    </form>
  `;
  window.root.innerHTML = registrationTemplate;
};

//registro usuarios nuevos
window.login.registerUser = function(){
  let name = getElementById('name').value;
  let email = getElementById('email').value;
  let curp = getElementById('curp').value;
  let password = getElementById('password').value;
  console.log(`${name} ${email} ${curp} ${password}`)
  let gender = 10;
  let genderM = curp.charAt(gender);
  if (genderM === 'M') {
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(response){


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
  }
  else{
    console.log("fail");
  }

  
};

window.login.loginUser = function () {
  let email = getElementById('email').value;
  let password = getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  
};

window.login.logOut = function () {
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      console.log(error)
    });
}
