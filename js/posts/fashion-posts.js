
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
    const postHeroText = document.querySelector('.hero-text');
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
        const postHeroImageElement = doc.querySelector('.fashion-hero-image img').textContent;

        if (postHeroImageElement && postHeroImageElement.src) {
          const postHeroImageSrc = postHeroImageElement.src;
      
          postHeroImage.src = postHeroImageSrc;
        }
      }

      if (postHeroText) {
        const postHeroTextElement = doc.querySelector('.main-post-text').textContent;

        if(postHeroTextElement) {
          postHeroText.textContent = postHeroTextElement; 
        } 
      }

      if(postContent) {
        const postTitleElement = document.querySelector('.fashion-text-tittle-1').textContent;
        const postTextElement = document.querySelector('.fashion-text-1').textContent;
        const postImageElement = document.querySelector('.fashion-content-img-1').textContent;

        const postContentElement = `
          <figure class="fashion-content-image-2">
            <img src="${postImageElement}" alt="">
          </figure>
          <div class="fashion-content-text-2 fashion-content-image">
            <p>${postTitleElement}</p>
            <p>${postTextElement}</p>
          </div>
        `;

        if (postContent && postContentElement) {
          postContent.innerHTML = postContentElement;
        }


      }

    }

  })