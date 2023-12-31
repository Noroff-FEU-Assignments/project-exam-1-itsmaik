
let allPosts = [];
let currentCarouselIndex = 0;



function fetchAndDisplayPostsByCategory(categoryId, structureType, order, orderby, elementIdPrefix, basePath) {
  fetch(`https://meninfashion.itsmaik.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}&order=${order}&orderby=${orderby}&per_page=${12}`)
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
  .catch(error => {
    throw new Error('Fetch Error:' + error)
  }) 
  .finally(() => {
    
    let loaderContainer = document.querySelector('#loader-container');
    if  (loaderContainer) {
    loaderContainer.remove();
    }

  });
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
let POSTS_PER_PAGE = 3;


function displayCarouselPost(posts, index, elementIdPrefix, basePath) {
  const carouselContainer = document.querySelector('.carousel-1');
  carouselContainer.innerHTML = '';

  
  const startIndex = currentCarouselIndex * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const postsToShow = posts.slice(startIndex, endIndex);
  const specialIds = [60, 86, 91, 93, 28, 23];


  postsToShow.forEach((post, index) => {
    let currentPath;
    const categoryId = post.categories.find(category => category !== 5);
    
    switch(categoryId) {
      case 13:
        currentPath = '../pages/editorial.html';
        break;
      case 10:
        currentPath = '../pages/fashion-posts.html';
        break;
      case 16:
        currentPath = '../pages/four-post-style.html';
        break;
      default:
        console.error('Unknown structure type');
      }

    const secondImage = post.acf.second_featured_image;

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
    if (specialIds.includes(post.id)) {
      image.src = secondImage;
    } else {
      image.src = post._embedded['wp:featuredmedia'][0].source_url;
    }
    image.alt = post.title.rendered;

 
    const title = document.createElement('h3');
    title.className = 'carousel-h3';
    title.textContent = post.title.rendered;

    const paragraph = document.createElement('p');
    paragraph.className = 'carousel-p';
    paragraph.textContent = `${paragraphElement}`;

    const readMoreLink = document.createElement('a');
    readMoreLink.className = 'btn-read-more';
    readMoreLink.href = `${currentPath}?slug=${post.slug}`;
    readMoreLink.textContent = 'READ MORE';

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(paragraph);
    card.appendChild(readMoreLink);

    carouselContainer.appendChild(card);

  });

}


const editorialElementIdPrefix = 'editorial';
const editorialBasePath = '../pages/editorial.html';
const fashionElementIdPrefix = 'fashion';
const fashionBasePath = '../pages/fashion-posts.html';
const trendingElementIdPrefix = 'trending';
const trendingBasePath = '../pages/four-post-style.html';
const carouselElementIdPrefix = 'carousel';
const carouselBasePath = '';

fetchAndDisplayPostsByCategory('13', 'editorial', 'asc', 'date', editorialElementIdPrefix, editorialBasePath);

fetchAndDisplayPostsByCategory('10', 'fashion', 'asc', 'date', fashionElementIdPrefix, fashionBasePath );

fetchAndDisplayPostsByCategory('16', 'trending', 'asc', 'date', trendingElementIdPrefix, trendingBasePath);

fetchAndDisplayPostsByCategory('5', 'carousel', 'desc', 'date', carouselElementIdPrefix, carouselBasePath);


// CAROUSEL SLIDE BTNS 

function goBack() {
  if (currentCarouselIndex > 0) {
    currentCarouselIndex -= 1;
  } else  return;

  
  displayCarouselPost(allPosts, currentCarouselIndex, carouselElementIdPrefix, carouselBasePath);
}

function advanceCarousel() {
  if ((currentCarouselIndex + 1) * POSTS_PER_PAGE < allPosts.length) {
    currentCarouselIndex += 1;
  } else return;
  
  displayCarouselPost(allPosts, currentCarouselIndex, carouselElementIdPrefix, carouselBasePath);
}

document.addEventListener('DOMContentLoaded', () => {
  updatePostsPerPage();
  
  const backButton = document.getElementById('prev-btn');
  const nextButton = document.getElementById('next-btn');

  backButton.addEventListener('click', () => {
    goBack();
  });

  nextButton.addEventListener('click', () => {
    advanceCarousel();
  });

  function updatePostsPerPage() {
    if (window.innerWidth < 980) {
      POSTS_PER_PAGE = 2;
    if (window.innerWidth < 600) {
      POSTS_PER_PAGE = 1;
    }  
    } else {
      POSTS_PER_PAGE = 3;
    }
  }

  window.addEventListener('resize', () => {
    updatePostsPerPage();
    displayCarouselPost(allPosts, currentCarouselIndex, carouselElementIdPrefix, carouselBasePath);
  });

});