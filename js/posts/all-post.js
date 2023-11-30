function fetchAndDisplayPostsByCategory(categoryId, order, orderby, elementIdPrefix, basePath) {
  fetch(`https://meninfashion.itsmaik.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}&order=${order}&orderby=${orderby}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => {
      console.log(posts);
      if (posts.length === 0) return
  
      const allPostContainer = document.querySelector('.all-post-grid');
      const postsToShow = posts
  
      postsToShow.forEach((post, index) => {
        try {
        console.log(postsToShow)
  
        const parser = new DOMParser();
        const doc = parser.parseFromString(post.content.rendered, 'text/html');
        let paragraphElement = doc.querySelector('.description').textContent;
  
        const card = document.createElement('div');
        card.className = 'post-card';
        card.id = `${elementIdPrefix}-${index + 1}`;
  
        const image = document.createElement('img');
        image.className = 'post-img';
        image.id = `${elementIdPrefix}-img-${index + 1}`;
        image.src = post._embedded['wp:featuredmedia'][0].source_url;
        image.alt = post.title.rendered;
  
        
        const title = document.createElement('h3');
        title.className = 'post-h3';
        title.textContent = post.title.rendered;
  
        const paragraph = document.createElement('p');
        paragraph.className = 'description';
        paragraph.textContent = `${paragraphElement}`;
  
        const readMoreLink = document.createElement('a');
        readMoreLink.className = 'btn-read-more';
        readMoreLink.href = `${basePath}?slug=${post.slug}`;
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
  
    })
  
  }
  
  const allPostsElementIdPrefix = 'post';
  const allPostsBasePath = '';
  
  fetchAndDisplayPostsByCategory('5', 'desc', 'date', allPostsElementIdPrefix, allPostsBasePath );  