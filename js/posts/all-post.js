const postsPerPageInitial = 9;
const postsPerPageMore = 3;
let totalPostsLoaded = 0;

function fetchAndDisplayPostsByCategory(categoryId, order, orderby, elementIdPrefix, basePath, perPage) { 
  fetch(`https://meninfashion.itsmaik.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}&order=${order}&orderby=${orderby}&per_page=${perPage}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => {
      
      if (posts.length === 0) return
  
      const allPostContainer = document.querySelector('.all-post-grid');
      const startIdx = totalPostsLoaded;
      const endIdx = totalPostsLoaded + Math.min(postsPerPageInitial, posts.length);

      const postsToShow = posts.slice(startIdx, endIdx);
      console.log("posts", posts)

      const specialIds = [60, 86, 91, 93, 28, 23];
  
      postsToShow.forEach((post, index) => {
        try {
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
          let paragraphElement = doc.querySelector('.description') && doc.querySelector('.description').textContent || '';
    
          const card = document.createElement('div');
          card.className = 'post-card';
          card.id = `${elementIdPrefix}-${index + 1}`;
    
          const image = document.createElement('img');
          image.className = 'post-img';
          image.id = `${elementIdPrefix}-img-${index + 1}`;
          image.src = post._embedded['wp:featuredmedia'][0].source_url;
          if (specialIds.includes(post.id)) {
            image.src = secondImage;
          } else {
            image.src = post._embedded['wp:featuredmedia'][0].source_url;
          }
          image.alt = post.title.rendered;
    
          
          const title = document.createElement('h3');
          title.className = 'post-h3';
          title.textContent = post.title.rendered;
    
          const paragraph = document.createElement('p');
          paragraph.className = 'description';
          paragraph.textContent = `${paragraphElement}`;
    
          const readMoreLink = document.createElement('a');
          readMoreLink.className = 'btn-read-more';
          readMoreLink.href = `${currentPath}?slug=${post.slug}`;
          readMoreLink.textContent = 'READ MORE';
    
          card.appendChild(image);
          card.appendChild(title);
          card.appendChild(paragraph);
          card.appendChild(readMoreLink);
    
          allPostContainer.appendChild(card);
      } catch (error) {
        console.error("Error processing post:", post, error);
      }
      });

      totalPostsLoaded += posts.length;

      if (totalPostsLoaded >= 12) {
        const viewMoreBtn = document.getElementById('view-more-posts');
        viewMoreBtn.style.display = 'none';
      }
    })
    .catch(error => {
      throw new Error('Fetch Error:' + error)
    }) 
    .finally(() => {
      const loaderContainer = document.querySelector('#loader-container');
      loaderContainer && loaderContainer.remove();
    });
  
}
  
const allPostsElementIdPrefix = 'post';
const allPostsBasePath = '';

fetchAndDisplayPostsByCategory('5', 'desc', 'date', allPostsElementIdPrefix, allPostsBasePath, postsPerPageInitial);  

const viewMoreBtn = document.getElementById('view-more-posts');

viewMoreBtn.addEventListener('click', () => {
  const updatedPerPageMore = postsPerPageInitial + 3;
  fetchAndDisplayPostsByCategory('5', 'desc', 'date', allPostsElementIdPrefix, allPostsBasePath, updatedPerPageMore);
});