
let allPosts = [];
let currentCarouselIndex = 0;
// let carouselBasePath;

let carouselBasePath = {
  '13': '../pages/editorial.html',
  '10': '../pages/fashion-posts.html',
  '16': '../pages/four-post-style.html',
};

function fetchAndDisplayPostsByCategory(categoryId, structureType, order, orderby, elementIdPrefix, basePath) {
  fetch(`https://meninfashion.itsmaik.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}&order=${order}&orderby=${orderby}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => {

      if (structureType === 'carousel') {
        // carouselBasePath = categoryBasePaths[categoryId] || '../pages/all-post.html';
        allPosts = posts;
        posts = posts.slice(0, 3);
      }

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
            displayCarouselPost(posts, index, elementIdPrefix, basePath);
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


function displayTrendingPost(post, index, elementIdPrefix, basePath) {
  const imgElement = document.getElementById(`${elementIdPrefix}-img-${index + 1}`);
  const anchorElement = document.getElementById(`${elementIdPrefix}-link-${index + 1}`);
  const titleElement = document.getElementById(`${elementIdPrefix}-title-${index + 1}`);
  const textElement = document.getElementById(`${elementIdPrefix}-text-${index + 1}`);

  if (imgElement && post._embedded['wp:featuredmedia']) {
    imgElement.src = post._embedded['wp:featuredmedia'][0].source_url;
  }

  if (titleElement) {
    titleElement.textContent = post.title.rendered;
  }

  if (textElement) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content.rendered, 'text/html');
    const heroTextElement = doc.querySelector('.four-post-hero-text');

    if (heroTextElement) {
     textElement.textContent = heroTextElement.textContent;
    }
  }

  if (anchorElement) {
    anchorElement.href = `${basePath}?slug=${post.slug}`;
  }
}


//--------------------------------CAROUSEL-POSTS----------------------------------
const POSTS_PER_PAGE = 3;


function displayCarouselPost(posts, index, elementIdPrefix, basePath) {
  console.log(basePath)
  const carouselContainer = document.querySelector('.carousel-1');
  carouselContainer.innerHTML = '';
  
  const startIndex = currentCarouselIndex * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const postsToShow = posts.slice(startIndex, endIndex);
 

  postsToShow.forEach((post, index) => {

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content.rendered, 'text/html');
    let paragraphElement = doc.querySelector('.description').textContent;

    const card = document.createElement('div');
    card.className = 'carousel-card';
    card.id = `${elementIdPrefix}-card-${index + 1}`;

    const image = document.createElement('img');
    image.className = 'carousel-img';
    image.id = `${elementIdPrefix}-img-${index + 1}`;
    image.src = post._embedded['wp:featuredmedia'][0].source_url;
    image.alt = post.title.rendered;

    
    const title = document.createElement('h3');
    title.className = 'carousel-h3';
    title.textContent = post.title.rendered;

    const paragraph = document.createElement('p');
    paragraph.className = 'carousel-p';
    paragraph.textContent = `${paragraphElement}`;

    const readMoreLink = document.createElement('a');
    readMoreLink.className = 'btn-read-more';
    readMoreLink.href = `${basePath}?slug=${post.slug}`;
    readMoreLink.textContent = 'READ MORE';

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(paragraph);
    card.appendChild(readMoreLink);

    carouselContainer.appendChild(card);

  });

  
  // const imgElement = document.getElementById(`${elementIdPrefix}-img-${index + 1}`);
  const anchorElement = document.getElementById(`${elementIdPrefix}-link-${index + 1}`);

  // if (imgElement && post._embedded['wp:featuredmedia']) {
  //   imgElement.src = post._embedded['wp:featuredmedia'][0].source_url;
  // }

  if (anchorElement) {
    anchorElement.href = `${basePath}?slug=${posts.slug}`;
    
  }

}


const editorialElementIdPrefix = 'editorial';
const editorialBasePath = '../pages/editorial.html';
const fashionElementIdPrefix = 'fashion';
const fashionBasePath = '../pages/fashion-posts.html';
const trendingElementIdPrefix = 'trending';
const trendingBasePath = '../pages/four-post-style.html';
const carouselElementIdPrefix = 'carousel';

fetchAndDisplayPostsByCategory('13', 'editorial', 'asc', 'date', editorialElementIdPrefix, editorialBasePath);

fetchAndDisplayPostsByCategory('10', 'fashion', 'asc', 'date', fashionElementIdPrefix, fashionBasePath );

fetchAndDisplayPostsByCategory('16', 'trending', 'asc', 'date', trendingElementIdPrefix, trendingBasePath);

fetchAndDisplayPostsByCategory('5', 'carousel', 'desc', 'date', carouselElementIdPrefix, carouselBasePath );



// CAROUSEL
function goBack() {
  if (currentCarouselIndex > 0) {
    currentCarouselIndex -= 1;
  } else  return;

  
  displayCarouselPost(allPosts, carouselElementIdPrefix, carouselBasePath);
}

function advanceCarousel() {
  if ((currentCarouselIndex + 1) * POSTS_PER_PAGE < allPosts.length) {
    currentCarouselIndex += 1;
  } else return;
  
  displayCarouselPost(allPosts, carouselElementIdPrefix, carouselBasePath);
}

document.addEventListener('DOMContentLoaded', () => {
  
  const backButton = document.getElementById('prev-btn');
  const nextButton = document.getElementById('next-btn');

  backButton.addEventListener('click', () => {
    goBack();
  });

  nextButton.addEventListener('click', () => {
    advanceCarousel();
  });
});