import Header from "./Header.js"


function fetchAndDisplayPostsByCategory(categoryId, structureType, order, orderby, elementIdPrefix, basePath) {
  fetch(`https://meninfashion.itsmaik.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}&order=${order}&orderby=${orderby}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => {
      posts.forEach((post, index) => {

        switch(structureType) {
          case 'editorial':
            displayEditorialPost(post, index, elementIdPrefix, basePath);
            break;
          case 'fashion':
            displayFashionPost(post, index, elementIdPrefix, basePath);
            break;
          case 'trending':
            displayTrendingPost(post, index, elementIdPrefix, basePath);
            break;
          case 'carousel':
            displayCarouselPost(post, index, elementIdPrefix, basePath);
            break;

          default:
            console.error('Unknown structure type');
          }
    });
  })
    .catch(error => console.error('Fetch error:', error));
}

function displayEditorialPost(post, index, elementIdPrefix, basePath) {
  const imgElement = document.getElementById(`${elementIdPrefix}-img-${index + 1}`);
  const anchorElement = document.getElementById(`${elementIdPrefix}-link-${index + 1}`);

  if (imgElement && post._embedded['wp:featuredmedia']) {
    imgElement.src = post._embedded['wp:featuredmedia'][0].source_url;
  }

  if (anchorElement) {
    anchorElement.href = `${basePath}?slug=${post.slug}`;
  }
}

function displayFashionPost(post, index, elementIdPrefix, basePath) {
  const imgElement = document.getElementById(`${elementIdPrefix}-img-${index + 1}`);
  const anchorElement = document.getElementById(`${elementIdPrefix}-link-${index + 1}`);

  if (imgElement && post._embedded['wp:featuredmedia']) {
    imgElement.src = post._embedded['wp:featuredmedia'][0].source_url;
  }

  if (anchorElement) {
    anchorElement.href = `${basePath}?slug=${post.slug}`;
  }
}

const editorialElementIdPrefix = 'editorial';
const editorialBasePath = '../pages/editorial.html';
const fashionElementIdPrefix = 'fashion';
const fashionBasePath = '../pages/fashion-posts.html';

fetchAndDisplayPostsByCategory('13', 'editorial', 'asc', 'date', editorialElementIdPrefix, editorialBasePath);

fetchAndDisplayPostsByCategory('10', 'fashion', 'asc', 'date', fashionElementIdPrefix, fashionBasePath );
