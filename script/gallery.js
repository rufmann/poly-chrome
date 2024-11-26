const galleryItems = document.querySelectorAll('.gallery-item img');
const galleryStrip = document.querySelector('.gallery-strip');
const zoomModal = document.querySelector('.zoom-modal');
const zoomedImage = document.querySelector('.zoomed-img');
const closeBtn = document.querySelector('.close-btn');

// Pause the animation and zoom the image
galleryItems.forEach(item => {
  item.addEventListener('click', (event) => {
    // Pause the carousel animation
    galleryStrip.style.animationPlayState = 'paused';

    // Open the zoom modal and show the clicked image
    zoomModal.style.display = 'flex';
    zoomedImage.src = event.target.src;
  });
});

// Close the zoom modal and resume the animation
closeBtn.addEventListener('click', () => {
  zoomModal.style.display = 'none';

  // Resume the carousel animation
  galleryStrip.style.animationPlayState = 'running';
});

// Allow closing the modal by clicking anywhere outside the image
zoomModal.addEventListener('click', (event) => {
  if (event.target === zoomModal) {
    zoomModal.style.display = 'none';

    // Resume the carousel animation
    galleryStrip.style.animationPlayState = 'running';
  }
});
