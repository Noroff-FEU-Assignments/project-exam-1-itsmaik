
class Carousel {
  constructor(id, title, imagePath, description, readMoreBtn) {
      this.id = id;
      this.title = title;
      this.imagePath = imagePath;
      this.description = description;
      this.readMoreBtn = readMoreBtn
  }

  generateHTML() {
    return `
      <div class="carousel" id="card-${this.id}">
        <img src="${this.imagePath}" alt="${this.title}">
        <h2>${this.title}</h2>
        <p>${this.description}</p>
        <a href="${this.readMoreBtn}">READ MORE</a>
      </div>`;
  }
}

const carouselCards = document.querySelector("#carousel-card", "");

const card1 = new Carousel
(1, "5 WAYS TO STYLE:", "/images/front-page/tshirt.png", "A WHITE T-SHIRT", "");

const card2 = new Carousel
(2, "5 WAYS TO STYLE:", "/images/front-page/nike.png", "NIKE AIR-FORCE", "");

const card3 = new Carousel
(3, "STEAL THE STYLE FROM", "/images/front-page/newyork.png", "NEW YORK FASHION WEEK", "");

const card4 = new Carousel
(4, "STEAL THE STYLE FROM", "/images/front-page/newyork.png", "NEW YORK FASHION WEEK", "");

const card5 = new Carousel
(5, "STEAL THE STYLE FROM", "/images/front-page/newyork.png", "NEW YORK FASHION WEEK", "");

const card6 = new Carousel
(6, "STEAL THE STYLE FROM", "/images/front-page/newyork.png", "NEW YORK FASHION WEEK", "");

carouselCards.innerHTML = card1.generateHTML() + card2.generateHTML() + card3.generateHTML()
+ card3.generateHTML() + card4.generateHTML() + card5.generateHTML() + card6.generateHTML();



export default Carousel

