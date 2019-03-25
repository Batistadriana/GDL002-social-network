window.newsFeed = {};
window.newsFeed.showFeed = function() {
  let newsFeedTemplate = String.raw`
    <h1>Noticias</h1>
    <!-- new post es el espacio que reservamos para poner el template para crear un post -->
    <div id="new-post"></div>
    <!-- news es el espacio que reservamos para mostra la lista de noticias -->
    <div id="news"></div>
    <input type="button" value="cerrar" onclick="window.login.logOut()" />
    `;
  window.root.innerHTML = newsFeedTemplate;
  window.newsFeed.showNewPost("news-type", "new-post")
};

window.newsFeed.showNewPost = function(type, elementName) {

  let newPostTemplate = String.raw `
    <form>
    <div id="new-post-group">
      <label for="new-post-text">Crea tu post:</label>
      <br />
      <textarea id="new-post-text" name="new-post-text" cols="50" row="15"></textarea>
    </div>
    <div id="news-url-group">
    ${(type === "news-type") ? 
    String.raw`
    <label for="news-url">URL de Noticia:</label>
    <input type="text" name="news-url" id="news-url">
     ` : 
    ''}
    </div>
    <div id="button-group">
    <input type="button" id="share-button" value="Compartir">
    </div>
    </form>
  `
  let element = getElementById(elementName);
  element.innerHTML = newPostTemplate;
  getElementById("share-button").addEventListener("click",function() {
    // insertar en la db

    let text = getElementById("new-post-text").value;
    let url = getElementById("news-url").value;
    var db = firebase.firestore();
    db.collection("users").add({
      text: text,
      url: url,
      type: type
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });


    // reiniciar template de new post
    window.newsFeed.showNewPost(type, elementName);


  })
}
