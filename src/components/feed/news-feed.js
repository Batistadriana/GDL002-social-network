import newPostTemplate from "./new-post-template.js";
import newsFeedTemplate from "./news-feed-template.js";
import postTemplate from "./postTemplate.js";
import router from "../../router.js";
import globalFunctions from "../../global-functions.js";

let newsFeed = {
  newPostTemplate: newPostTemplate,
  newsFeedTemplate: newsFeedTemplate,
  postTemplate: postTemplate
};

newsFeed.savePost = function() {
  // No guardar si el usuario no esta logueado
  let user = firebase.auth().currentUser;
  if (!user) {
    return;
  }

  let text = document.getElementById("new-post-text").value;
  let url = document.getElementById("news-url").value;
  let db = firebase.firestore();
  let type = document.getElementById("post-type").value;
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
      router.navigateTo("/news-feed");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};

newsFeed.serchForEvent = function() {
  let buttons = Array.from(document.querySelectorAll(".btn-delete"));
  buttons.forEach(function(button) {
    let docId = button.getAttribute('doc-id');
    button.addEventListener("click",() => newsFeed.deletePost(docId));
  });
};

newsFeed.deletePost = function(id) {
  let db = firebase.firestore();
  console.log("borrando");
  db.collection("posts")
    .doc(id)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
      router.navigateTo('/news-feed')
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
};

newsFeed.showNewsPosts = function() {
  let db = firebase.firestore();
  let promise = db
    .collection("posts")
    .where("type", "==", "news-type")
    .get()
    .then(function(querySnapshot) {
      let posts = [];
      querySnapshot.forEach(function(doc) {
        let post = doc.data();
        post.id = doc.id;
        posts.push(post);
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
        })
        .reverse();
      posts = Array.from(posts);

      let htmlPosts = posts.map(post => newsFeed.postTemplate(post)).join(" ");
      setTimeout(() => newsFeed.serchForEvent(), 0);
      return htmlPosts;
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  return promise;
};

newsFeed.generateNewsFeed = function() {
  setTimeout(function() {
    newsFeed.showNewsPosts().then(function(htmlPosts) {
      let newsElement = document.getElementById("news");
      if(newsElement) {
        newsElement.innerHTML = htmlPosts;
      }
    });
  }, 50);
  return newsFeed.newsFeedTemplate();
};

globalFunctions.addFunctions("savePost", newsFeed.savePost);
export default newsFeed;
