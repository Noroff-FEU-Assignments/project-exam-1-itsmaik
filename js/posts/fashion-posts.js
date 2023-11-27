
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
    console.log(posts);
    if(posts.length === 0) return

    const specificPost = posts[0];
    const postHeader = document.querySelector('.hero-title .hero-title-p');
    const postHeroImage = document.querySelector('.hero-fashion-figure img');
    const postHeroText = document.querySelector('.hero-text p');
    const postContent = document.querySelector('.fashion-grid-container');

    // Parse content.rendered from api response
    const postMainText = specificPost.content.rendered;
    const parser = new DOMParser();
    const doc = parser.parseFromString(postMainText, 'text/html');

    if (specificPost) {
      if (postHeader) {
        const postHeaderContent = doc.querySelector('.fashion-heading-title').textContent;


        if (postHeaderContent) {
          postHeader.textContent = postHeaderContent;
        }
      }


      if (postHeroImage) {
        const postHeroImageElement = doc.querySelector('.fashion-hero-image img');

        console.log(postHeroImageElement)
        if (postHeroImageElement && postHeroImageElement.src) {
          const postHeroImageSrc = postHeroImageElement.src;
      
          postHeroImage.src = postHeroImageSrc;
        }
      }


      if (postHeroText) {
        const postHeroTextElement = doc.querySelector('.fashion-hero-text').textContent;
        
        if(postHeroTextElement) {
          postHeroText.textContent = postHeroTextElement; 
        } 
      }


      if(postContent) { 


        for (let i = 1; i <= 2; i++) {
          console.log(i)

        const postTitleElement = doc.querySelector(`.fashion-text-tittle-${i}`).textContent;
        const postTextElement = doc.querySelector(`.fashion-text-${i}`).textContent;
        const postImageElement = doc.querySelector(`.fashion-content-img-${i} img`).src;

        document.querySelector(`.fashion-content-text-${i} .fashion-content-title`).textContent = postTitleElement;
        document.querySelector(`.fashion-content-text-${i} .fashion-content-text`).textContent = postTextElement;
        document.querySelector(`.fashion-content-image-${i} img`).src = postImageElement;
      }


      }
    

    }

  })