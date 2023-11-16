import Header from "./Header.js";

/** Fetching Editorial Container **/

fetch('https://meninfashion.itsmaik.com/wp-json/wp/v2/posts?_embed')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(posts => {
    console.log("posts", posts)
    posts.forEach((post, index) => {
      if (post._embedded && post._embedded['wp:featuredmedia']) {
        const featuredImage = post._embedded['wp:featuredmedia'][index].source_url;

        const imgElement = document.getElementById(`editorial-img-${index + 1}`);
        if (imgElement) {
          imgElement.src = featuredImage;
        }

        const anchorElement = document.querySelector(`.editorial-images-container #editorial-link-${index + 1}`);
        if (anchorElement) {
          anchorElement.href = `./pages/editorial.html#${post.slug}`;
        }
      }
    });
  })
  .catch(error => console.error('Fetch error:', error));


/** Fetching 4-styles Container **/



/** Fetching Fashion Container **/