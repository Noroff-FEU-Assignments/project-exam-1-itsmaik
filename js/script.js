import Header from "./Header.js"

// IDs or slugs of my specific posts
const postIdentifiers = ['fw23-lookbook-carhartt', 'hinterland-lookbook-yoke', 'q23-lookbook-butter-goods'];

// Fetching and displaying each post
postIdentifiers.forEach((postIdentifier, index) => {
  fetch(`https://meninfashion.itsmaik.com/wp-json/wp/v2/posts?_embed&slug=${postIdentifier}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => {
      
      const post = posts[0];

      const imgElement = document.getElementById(`editorial-img-${index + 1}`);
      const anchorElement = document.getElementById(`editorial-link-${index + 1}`);

      if (imgElement && post._embedded['wp:featuredmedia']) {
        imgElement.src = post._embedded['wp:featuredmedia'][0].source_url;
      }

      if (anchorElement) {
        anchorElement.href = `./pages/editorial.html?slug=${post.slug}`;
        anchorElement.addEventListener('click', () => {
         
          localStorage.setItem('currentPostSlug', post.slug);
        });
      }
    })
    .catch(error => console.error('Fetch error:', error));
});


// fetch 4 porst styles 

// fetch fashion pots   