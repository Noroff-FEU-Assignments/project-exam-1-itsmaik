import Header from "./Header.js"

// IDs or slugs of your specific posts
const postIdentifiers = ['fw23-lookbook-carhartt', 'hinterland-lookbook-yoke', 'q23-lookbook-butter-goods'];

// Fetch and display each post
postIdentifiers.forEach((postIdentifier, index) => {
  fetch(`https://meninfashion.itsmaik.com/wp-json/wp/v2/posts?_embed&slug=${postIdentifier}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => {
      // Since we are fetching by slug, there should only be one post per fetch
      const post = posts[0];

      // Now assign the post details to the correct elements
      const imgElement = document.getElementById(`editorial-img-${index + 1}`);
      const anchorElement = document.getElementById(`editorial-link-${index + 1}`);

      if (imgElement && post._embedded['wp:featuredmedia']) {
        imgElement.src = post._embedded['wp:featuredmedia'][0].source_url;
      }

      if (anchorElement) {
        anchorElement.href = `./pages/editorial.html?slug=${post.slug}`;
        anchorElement.addEventListener('click', () => {
          // Here you can set the local storage or any other method to pass the slug to the editorial page
          localStorage.setItem('currentPostSlug', post.slug);
        });
      }
    })
    .catch(error => console.error('Fetch error:', error));
});
