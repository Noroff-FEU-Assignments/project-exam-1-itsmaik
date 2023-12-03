
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
    const postHeaderTitle = document.querySelector('.header-title')
    const postHeader = document.querySelector('.hero-title-p');
    const postHeroText = document.querySelector('.hero-text p');
    const postContent = document.querySelector('.four-post-style-content');

    // Parse content.rendered from api response
    const postMainText = specificPost.content.rendered;
    const parser = new DOMParser();
    const doc = parser.parseFromString(postMainText, 'text/html');

    if (specificPost) {

      if (postHeaderTitle) {
        const postHeaderTitleElement = specificPost.title.rendered;
        document.querySelector('title').textContent = "Men-In-Fashion | " + specificPost.title.rendered

        if (postHeaderTitleElement) {
          postHeaderTitle.textContent = postHeaderTitleElement;
        }
      }


      if (postHeader) {
        const postHeaderContent = doc.querySelector('.four-post-header-title').textContent;
        document.querySelector('title').textContent = "Men-In-Fashion | " + specificPost.title.rendered


        if (postHeaderContent) {
          postHeader.textContent = postHeaderContent;
        }
      }


      if (postHeroText) {
        const postHeroTextElement = doc.querySelector('.four-post-hero-text').textContent;
        
        if(postHeroTextElement) {
          postHeroText.textContent = postHeroTextElement; 
        } 
      }


      if(postContent) { 
        const numberOfElements = (`${specificPost.content.rendered}`).length;

        for (let i = 1; i <= numberOfElements; i++) {
          console.log(i)

        const postTitleElement = doc.querySelector(`.four-post-text-title-${i}`).textContent;
        const postTextElement = doc.querySelector(`.four-post-text-${i}`).textContent;
        const postImageElement = doc.querySelector(`.four-post-image-${i} img`).src;

        document.querySelector(`.container-content-${i} .style-content-title`).textContent = postTitleElement;
        document.querySelector(`.container-content-${i} .style-content-text`).textContent = postTextElement;
        document.querySelector(`.style-content-image-${i} img`).src = postImageElement;
      }

      console.log(postContent)
      }
    

    }

  })
  .catch(error => {
    throw new Error('Fetch Error:' + error)
  }) 
  .finally(() => {
    document.querySelector('#loader-container').remove()
  });