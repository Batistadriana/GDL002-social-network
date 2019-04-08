let postTemplate = function(post) {
  let user = firebase.auth().currentUser;
  let date = new Date(post.date);
  let formattedDate = `${date.getFullYear()}/${date.getMonth() +
    1}/${date.getDate()}`;
  let newsPostTemplate = String.raw`
    <article id=${post.id} class="post news-post">
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
    </div>
    <div class ="url"> 
      <a href="${
        post.url
      }" target="_blank" rel="noopener noreferrer">Enlace noticia</a>
      
          ${post.userId === user.uid ?
             String.raw`<br/>
             <input type="button" class="btn purple" doc-id="${post.id}"  class="btn-delete" value="Eliminar" >
             <input type="button" class="btn purple" class="btn-edit" value="Editar" >
             ` : ""}
             <br/>
             <br/>
      
            </div>
        </article>
  
    `;
  return newsPostTemplate;
};
export default postTemplate;
