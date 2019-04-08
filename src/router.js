import login from "./components/login/login.js";
import newsFeed from "./components/feed/news-feed.js";
import globalFunctions from "./global-functions.js";

let pathPrefix = window.location.origin.indexOf(":5000") === -1 ? "/social-network" : "";

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
      window.history.pushState({}, pathName, window.location.origin + pathPrefix + pathName);
    }
    console.log(pathName);
    let html = routes[pathName]();

    contentRoot.innerHTML = html;
  }
};

function checkLogin() {
  let user = firebase.auth().currentUser;
  let pathName = window.location.pathname.replace(pathPrefix, "");
  if (user) {
    if (
      pathName === "/" ||
      pathName === "/login" ||
      pathName === "/registration"
    ) {
      return routes["/news-feed"]();
    } else {
      return routes[pathName]();
    }
  } else {
    if (pathName !== "/registration") {
      return routes["/login"]();
    } else {
      return routes["/registration"]();
    }
  }
}

router.checkLogin = checkLogin;

globalFunctions.addFunctions("navigateTo", router.navigateTo);

export default router;
