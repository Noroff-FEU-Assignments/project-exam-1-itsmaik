const params = new URLSearchParams(window.location.search);
const postSlug = params.get('slug');

fetch(`https://meninfashion.itsmaik.com/wp-json/wp/v2/posts?_embed&slug=${postSlug}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(posts => {
    const specificPost = posts[0];

    const postTitle = document.querySelector('.editorial-title .h1-editorial');
    const featuredHeroImage = document.querySelector('.featured-image img');
    const featuredImageText = document.querySelector('.featured-image #featured-image-text');
    const editorialText = document.querySelector('.editorial-text');
    const editorialItems = document.querySelector(".editorial-items img")


    /* Parse content.rendered from api response */
    const postMainText = specificPost.content.rendered;
    const parser = new DOMParser();
    const doc = parser.parseFromString(postMainText, 'text/html');
  

    if (specificPost) {
      if (postTitle) {
        postTitle.textContent = specificPost.title.rendered;
      }

      if (featuredHeroImage) {
        const editorialHeroImageElement = doc.querySelector('.editorial-hero-image img');

        if (editorialHeroImageElement && editorialHeroImageElement.src) {
          const featuredHeroImageSrc = editorialHeroImageElement.src;
      
          featuredHeroImage.src = featuredHeroImageSrc;
        }
    }

      
      if (featuredImageText) {

        const featuredImageTextElement = doc.querySelector('.wp-element-caption').textContent;

        if(featuredImageTextElement) {
          featuredImageText.textContent = featuredImageTextElement; 
        } 
      }

      if (editorialText) {
        const mainPostTextElement = doc.querySelector('.main-post-text').textContent;

        if(mainPostTextElement) {
          editorialText.textContent = mainPostTextElement; 
        } 
      }
    } else {
      console.error('Post not found or missing content');
    }


  })
  .catch(error => console.error('Fetch error:', error));