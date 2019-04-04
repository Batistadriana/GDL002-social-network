let postTemplate = function(post) {
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
      <input type="button" doc-id="${post.id}"  class="btn-delete" value="eliminar" > 
    </div>
    </article>
    `;
  return newsPostTemplate;
};
export default postTemplate;
