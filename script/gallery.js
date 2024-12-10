const galleryStrip = document.querySelector('.gallery-strip');
const zoomModal = document.querySelector('.zoom-modal');
const zoomedImage = document.querySelector('.zoomed-img');
const closeBtn = document.querySelector('.close-btn');

// Images URLs
const images = [
  'images/gallery-strip-images/1.png',
  'images/gallery-strip-images/2.png',
  'images/gallery-strip-images/3.png',
  'images/gallery-strip-images/4.png',
  'images/gallery-strip-images/1.png',
  'images/gallery-strip-images/2.png',
  'images/gallery-strip-images/3.png',
  'images/gallery-strip-images/4.png',
  'images/gallery-strip-images/1.png',
  'images/gallery-strip-images/2.png',
  'images/gallery-strip-images/3.png',
  'images/gallery-strip-images/4.png',
]


let interval;

// Function to dynamically load images into the gallery and duplicate the content
function loadImages() {
  images.forEach(src => {
    const galleryItem = createGalleryItem(src);
    galleryStrip.appendChild(galleryItem);
  });

  // Duplicate the content for seamless looping
  images.forEach(src => {
    const galleryItem = createGalleryItem(src);
    galleryStrip.appendChild(galleryItem);
  });
}

// Helper function to create a gallery item
function createGalleryItem(src) {
  const galleryItem = document.createElement('div');
  galleryItem.classList.add('gallery-item');
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Gallery Image';
  galleryItem.appendChild(img);

  // Add zoom functionality
  img.addEventListener('click', () => {
    stopCarousel();
    zoomModal.style.display = 'flex';
    zoomedImage.src = src;
  });

  return galleryItem;
}

// Function to start the continuous loop
function startCarousel() {
  const itemWidth = galleryStrip.firstChild.offsetWidth + 10; // Single gallery item's width + gap
  let translateX = 0;

  interval = setInterval(() => {
    translateX -= itemWidth; // Move left by one item
    galleryStrip.style.transform = `translateX(${translateX}px)`;
    galleryStrip.style.transition = 'transform 0.5s ease-out';

    // Reset position when the first set is fully out of view
    if (Math.abs(translateX) >= itemWidth * images.length) {
      setTimeout(() => {
        galleryStrip.style.transition = 'none'; // Disable transition for reset
        translateX = 0; // Reset to the beginning
        galleryStrip.style.transform = `translateX(${translateX}px)`;
      }, 500); // Match the transition duration
    }
  }, 3000); // Change image every 3 seconds
}

// Function to stop the carousel
function stopCarousel() {
  clearInterval(interval);
}

// Close modal and resume carousel
closeBtn.addEventListener('click', () => {
  zoomModal.style.display = 'none';
  startCarousel();
});

// Close modal when clicking outside of the image
zoomModal.addEventListener('click', (event) => {
  if (event.target === zoomModal) {
    zoomModal.style.display = 'none';
    startCarousel();
  }
});

// Load images and start the carousel
loadImages();
startCarousel();