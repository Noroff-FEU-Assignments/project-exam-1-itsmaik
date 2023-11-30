document.addEventListener('DOMContentLoaded', () => {

  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("caption");
  const closeModal = document.getElementsByClassName("close")[0];

  document.querySelectorAll('.modal-img-style img').forEach(img => {
    img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    }
  });

  closeModal.onclick = function() { 
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
});