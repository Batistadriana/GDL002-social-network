window.newsFeed = {};
window.newsFeed.showFeed = function() {
  let newsFeedTemplate = String.raw`
    <h1>Noticias</h1>
    <div id="news"></div>
    `;
  window.root.innerHTML = newsFeedTemplate;
};
