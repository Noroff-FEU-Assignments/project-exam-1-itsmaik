import Header from "./Header.js"

let allPosts = [];
let currentCarouselIndex = 0;

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
        allPosts = posts;
        posts = posts.slice(0, 3);
      }
      console.log(posts)
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

const POSTS_PER_PAGE = 3;

function displayCarouselPost(posts, index, elementIdPrefix, basePath) {
  const carouselContainer = document.querySelector('.carousel-1');
  carouselContainer.innerHTML = '';

  const startIndex = currentCarouselIndex * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const postsToShow = posts.slice(startIndex, endIndex);
  
  postsToShow.forEach((post, index) => {
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
    title.textContent = 'TITLE';

    const paragraph = document.createElement('p');
    paragraph.className = 'carousel-p';
    paragraph.textContent = 'DESCRIPTION';

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

  
  const imgElement = document.getElementById(`${elementIdPrefix}-img-${index + 1}`);
  const anchorElement = document.getElementById(`${elementIdPrefix}-link-${index + 1}`);

  // if (imgElement && post._embedded['wp:featuredmedia']) {
  //   imgElement.src = post._embedded['wp:featuredmedia'][0].source_url;
  // }

  if (anchorElement) {
    anchorElement.href = `${basePath}?slug=${post.slug}`;
    
  }


}


const editorialElementIdPrefix = 'editorial';
const editorialBasePath = '../pages/editorial.html';
const fashionElementIdPrefix = 'fashion';
const fashionBasePath = '../pages/fashion-posts.html';
const carouselElementIdPrefix = 'carousel';
const carouselBasePath = '';

fetchAndDisplayPostsByCategory('13', 'editorial', 'asc', 'date', editorialElementIdPrefix, editorialBasePath);

fetchAndDisplayPostsByCategory('10', 'fashion', 'asc', 'date', fashionElementIdPrefix, fashionBasePath );

fetchAndDisplayPostsByCategory('5', 'carousel', 'desc', 'date', carouselElementIdPrefix, carouselBasePath );


function goBack() {
  if (currentCarouselIndex > 0) {
    currentCarouselIndex -= 1;
  } else {
    currentCarouselIndex = Math.ceil(allPosts.length / POSTS_PER_PAGE) - 1;
  }
  displayCarouselPost(allPosts, carouselElementIdPrefix, carouselBasePath);
}

function advanceCarousel() {
  if ((currentCarouselIndex + 1) * POSTS_PER_PAGE < allPosts.length) {
    currentCarouselIndex += 1;
  } else {
    currentCarouselIndex = 0;
  }
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