import newPostTemplate from "./new-post-template.js";

let newsFeedTemplate = function() {
  return String.raw`
    <div class="title">Noticias:</div>
    <!-- new post es el espacio que reservamos para poner el template para crear un post -->
    <div id="new-post">
      ${newPostTemplate("news-type")}
    </div>
    <br/>
    <br/>
    <br/>
    <!-- news es el espacio que reservamos para mostra la lista de noticias -->
    <div id="news"></div>
    <input type="button" class="btn purple" value="cerrar sesión" onclick="window.functions.logOut()" />
    `;
};

export default newsFeedTemplate;
