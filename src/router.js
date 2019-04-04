import login from "./components/login/login.js";
import newsFeed from "./components/feed/news-feed.js";
import globalFunctions from "./global-functions.js";

let routes = {
  "/": checkLogin,
  "/login": login.loginTemplate,
  "/registration": login.registrationTemplate,
  "/news-feed": newsFeed.generateNewsFeed
};

let contentRoot = document.getElementById("root");

let router = {
  routes: routes,

  navigateTo: function(pathName, skipPush) {
    if (!skipPush && pathName !== "/") {
      window.history.pushState({}, pathName, window.location.origin + name);
    }
    console.log(pathName);
    let html = routes[pathName]();

    contentRoot.innerHTML = html;
  }
};

function checkLogin() {
  let user = firebase.auth().currentUser;
  if (user) {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/registration"
    ) {
      return routes["/news-feed"]();
    } else {
      return routes[window.location.pathname]();
    }
  } else {
    if (window.location.pathname !== "/registration") {
      return routes["/login"]();
    } else {
      return routes["/registration"]();
    }
  }
}

router.checkLogin = checkLogin;

globalFunctions.addFunctions("navigateTo", router.navigateTo);

export default router;
