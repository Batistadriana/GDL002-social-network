let newPostTemplate = function(type,post) {
  return String.raw`
      <form>
      <div id="new-post-group">
        <h2>${ post ? 'Estoy editando un post!' : ''}</h2>
        <label for="new-post-text">Crea tu post:</label>
        <br />
        <textarea id="new-post-text" name="new-post-text" cols="50" row="15">${post ? post.text : ''}</textarea>
      </div>
      <div id="news-url-group">
      <input id="post-type" type="hidden" value="${type}" />
      ${
        type === "news-type"
          ? String.raw`
      <label for="news-url">URL de Noticia:</label>
      <input type="text" name="news-url" id="news-url" value="${post ? post.url : ''}">
       `
          : ""
      }
      </div>
      <div id="button-group" class="share-button center-align">
      <input type="button" class="btn purple" id="share-button" value="Compartir" onclick="${post ?  `window.functions.saveChanges("${post.id}")` : "window.functions.savePost()"}">
      ${ post ? String.raw`<input type="button" value="Cancelar" onclick="window.function.navigateTo('/news-feed')">` : ""}
      </div>
      </form>
    `;
    document.getElementById("new-post-text").required;
  
};
export default newPostTemplate;
