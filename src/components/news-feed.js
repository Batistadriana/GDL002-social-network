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
  window.newsFeed.createNewPost("news-type", "new-post");
  window.newsFeed.showNewsPosts();
};

window.newsFeed.createNewPost = function(type, elementId) {
  let newPostTemplate = String.raw`
    <form>
    <div id="new-post-group">
      <label for="new-post-text">Crea tu post:</label>
      <br />
      <textarea id="new-post-text" name="new-post-text" cols="50" row="15"></textarea>
    </div>
    <div id="news-url-group">
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
    <input type="button" id="share-button" value="Compartir">
    </div>
    </form>
  `;
  let element = getElementById(elementId);
  element.innerHTML = newPostTemplate;
  getElementById("share-button").addEventListener("click", function() {
    // insertar en la db

    // No guardar si el usuario no esta logueado
    let user = firebase.auth().currentUser;
    if (!user) {
      return;
    }

    let text = getElementById("new-post-text").value;
    let url = getElementById("news-url").value;
    let db = firebase.firestore();
    db.collection("posts")
      .add({
        text: text,
        url: url,
        type: type,
        userId: user.uid,
        displayName: user.displayName,
        date: new Date().toJSON()
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

    // reiniciar template de new post
    window.newsFeed.createNewPost(type, elementId);
    window.newsFeed.showNewsPosts();
  });
};

window.newsFeed.generateNewsPost = function(post) {
  let date = new Date(post.date);
  let formattedDate = `${date.getFullYear()}/${date.getMonth() +
    1}/${date.getDate()}`;
  let newsPostTemplate = String.raw`
  <article class="post news-post">
  <div class="meta-data">
  <span>
  ${formattedDate}
  </span>
  <span>
  ${post.displayName}
  </span>
  </div>
  <div class="content">
    ${post.text}
    <br/>
    <a href="${
      post.url
    }" target="_blank" rel="noopener noreferrer">Enlace noticia</a>
  </div>
  </article>
  `;

  return newsPostTemplate;
};

window.newsFeed.showNewsPosts = function() {
  let db = firebase.firestore();
  let element = getElementById("news");
  db.collection("posts")
    .where("type", "==", "news-type")
    .get()
    .then(function(querySnapshot) {
      let posts = [];
      querySnapshot.forEach(function(doc) { 
        posts.push(doc.data());
      });
      posts = posts
        .sort((a, b) => {
          let dateA = new Date(a.date);
          let dateB = new Date(b.date);
          if (dateA < dateB) {
            return -1;
          } else if (dateA > dateB) {
            return 1;
          } else {
            return 0;
          }
        }).reverse();
        posts = Array.from(posts);

      let htmlPosts = posts.map(post => window.newsFeed.generateNewsPost(post)).join(" ");

      element.innerHTML = htmlPosts;
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
};
