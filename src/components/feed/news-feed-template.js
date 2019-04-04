import newPostTemplate from "./new-post-template.js";

let newsFeedTemplate = function() {
  return String.raw`
    <h1>Noticias</h1>
    <!-- new post es el espacio que reservamos para poner el template para crear un post -->
    <div id="new-post">
      ${newPostTemplate("news-type")}
    </div>
    <!-- news es el espacio que reservamos para mostra la lista de noticias -->
    <div id="news"></div>
    <input type="button" value="cerrar" onclick="window.functions.logOut()" />
    `;
};

export default newsFeedTemplate;
