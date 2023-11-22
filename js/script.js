import Header from "./Header.js"


function fetchAndDisplayPostsByCategory(categoryId, elementIdPrefix, basePath, order = 'desc', orderby = 'date') {
  fetch(`https://meninfashion.itsmaik.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}&order=${order}&orderby=${orderby}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => {
      posts.forEach((post, index) => {

        const imgElement = document.getElementById(`${elementIdPrefix}-img-${index + 1}`);
        const anchorElement = document.getElementById(`${elementIdPrefix}-link-${index + 1}`);

        if (imgElement && post._embedded['wp:featuredmedia']) {
          imgElement.src = post._embedded['wp:featuredmedia'][0].source_url;
        }

        if (anchorElement) {
          anchorElement.href = `${basePath}?slug=${post.slug}`;
        }})
    })
    .catch(error => console.error('Fetch error:', error));
}

fetchAndDisplayPostsByCategory('13', 'editorial', '../pages/editorial.html', 'asc', 'date');

fetchAndDisplayPostsByCategory('10', 'fashion', '../pages/fashion-posts.html', 'asc', 'date');