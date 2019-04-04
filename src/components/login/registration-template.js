let registrationTemplate = function() {
  return String.raw`
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
          <input type="button" value="Atras" onclick="window.functions.navigateTo('/login')" />
          <input type="button" value="Registrar" onclick="window.functions.registerUser()" />
        </div>
      </form>
    `;
};

export default registrationTemplate;
