import router from "./router.js";


firebase.auth().onAuthStateChanged(() => router.navigateTo("/"));
router.navigateTo(window.location.pathname, true);

window.onpopstate = function(event) {
  router.navigateTo(window.location.pathname, true);
};
// llamar manualmente al metodo onpopstate para que cargue la ruta actual
// window.onpopstate();
