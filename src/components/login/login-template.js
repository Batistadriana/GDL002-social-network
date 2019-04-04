let loginTemplate = function() {
  return String.raw`
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
          <input type="button" value="Iniciar sesión" onclick="window.functions.loginUser()" />
          <input type="button" value="Registrar" onclick="window.functions.navigateTo('/registration')" />
        </div>
      </form>
    `;
};

export default loginTemplate;
