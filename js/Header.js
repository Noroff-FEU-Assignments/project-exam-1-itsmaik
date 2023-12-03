
class Header {
  constructor(navItems, logoText, heroImagePath) {
      this.navItems = navItems;
      this.logoText = logoText;
      this.heroImagePath = heroImagePath;
  }

  generateHeader() {
    const heroImage = document.querySelector("#hero-image");
    const navItemsHTML = this.navItems.map(item => `<li><a href="${item.link}">${item.text}</a></li>`).join('');
    document.querySelector("#nav-bar").innerHTML = `<nav><ul>${navItemsHTML}</ul></nav>`;

    if (heroImage) {
      heroImage.src = this.heroImagePath;
    }

    document.querySelector("#logo").innerHTML = `<h1>${this.logoText}</h1>`;
  
    const menuIcon = document.createElement('div');
    menuIcon.id = 'menu-icon';
    menuIcon.innerHTML = '&#9776;';
    
    const closeIcon = document.createElement('div');
    closeIcon.id = 'close-icon';
    closeIcon.innerHTML = 'x';

    const header = document.querySelector("header");
    const navBar = document.querySelector("#nav-bar");
    header.appendChild(menuIcon);
    header.insertBefore(closeIcon, navBar);

    menuIcon.addEventListener("click", () => {
      const navBar = document.querySelector("#nav-bar");
      navBar.classList.toggle("active");
      menuIcon.style.display = 'none';
      closeIcon.style.display = 'flex';
    });

    closeIcon.addEventListener("click", () => {
      const navBar = document.querySelector("#nav-bar");
      navBar.classList.remove("active");
      closeIcon.style.display = 'none';
      menuIcon.style.display = 'flex';
    });
  }
}

const navItems = [
  { link: "../pages/about.html", text: "ABOUT" },
  { link: "../pages/contact.html", text: "CONTACT" },
  { link: "../pages/all-post.html", text: "ALL POSTS" }
];

const logoText = "MEN-IN-FASHION";
const heroImagePath = "/images/front-page/hero-img.png";
const header = new Header(navItems, logoText, heroImagePath);
header.generateHeader();


export default Header

