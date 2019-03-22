window.newsFeed = {};
window.newsFeed.showFeed = function() {
  let newsFeedTemplate = String.raw`
    <h1>Noticias</h1>
    <div id="news"></div>
    <input type="button" value="cerrar" onclick="window.login.logOut()" />
    `;
  window.root.innerHTML = newsFeedTemplate;
};
