let loginTemplate = function() {
  return String.raw`
    <div class="row login">
      <form>
        <div>
          <label for="email">Email</label>
          <input type="text" class="form-control" name="email" id="email" />
        </div>
        <div>
          <label for="password">Contraseña</label>
          <input type="password" class="form-control" name="password" id="password" />
        </div>
        <div class="login-buttons center-align">
          <input type="button" class="btn purple" value="Iniciar sesión" onclick="window.functions.loginUser()" />
          <input type="button" class="btn purple" value="Registrar" onclick="window.functions.navigateTo('/registration')" />
        </div>
      </form>
    </div>
    `;
};

export default loginTemplate;
