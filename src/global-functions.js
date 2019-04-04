// Este archivo se usa para guardar funciones globales de manera ordenada
window.functions = {};

let globalFunctions = {
  // guarda una funcion en el objeto de functions
  addFunctions: function(name, fn) {
    window.functions[name] = fn;
  }
};

export default globalFunctions;
