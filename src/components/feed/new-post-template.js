let newPostTemplate = function(type) {
  return String.raw`
      <form>
      <div id="new-post-group">
        <label for="new-post-text">Crea tu post:</label>
        <br />
        <textarea id="new-post-text" name="new-post-text" cols="50" row="15"></textarea>
      </div>
      <div id="news-url-group">
      <input id="post-type" type="hidden" value="${type}" />
      ${
        type === "news-type"
          ? String.raw`
      <label for="news-url">URL de Noticia:</label>
      <input type="text" name="news-url" id="news-url">
       `
          : ""
      }
      </div>
      <div id="button-group">
      <input type="button" id="share-button" value="Compartir" onclick="window.functions.savePost()">
      </div>
      </form>
    `;
};
export default newPostTemplate;
