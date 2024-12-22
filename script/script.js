// ============ Slideshow Functions ============
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function animateSlideshow(slideshowElement, startDelay) {
  const slides = slideshowElement.getElementsByTagName('img');
  let currentSlide = 0;
  
  // Initially hide all slides except the first one
  for (let i = 1; i < slides.length; i++) {
    slides[i].style.opacity = '0';
  }
  slides[0].style.opacity = '1';

  function fadeOut(element, callback) {
    let opacity = 1;
    const timer = setInterval(() => {
      if (opacity <= 0) {
        clearInterval(timer);
        element.style.opacity = '0';
        if (callback) callback();
      }
      element.style.opacity = opacity;
      opacity -= 0.1;
    }, 50);
  }

  function fadeIn(element) {
    let opacity = 0;
    element.style.opacity = '0';
    const timer = setInterval(() => {
      if (opacity >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = opacity;
      opacity += 0.1;
    }, 50);
  }

  function showNextSlide() {
    const previousSlide = currentSlide;
    currentSlide = (currentSlide + 1) % slides.length;

    fadeOut(slides[previousSlide], () => {
      fadeIn(slides[currentSlide]);
    });
  }

  setTimeout(() => {
    setInterval(showNextSlide, 4000);
  }, startDelay);
}

function populateSlideshows() {
  const slideshowsConfig = {
    slideshow1: { folder: "single-strip", delay: 0 },
    slideshow2: { folder: "single-polaroid", delay: 500 },
    slideshow3: { folder: "single-strip", delay: 1000 }
  };

  fetch('../script/imageList.json')
    .then(response => response.json())
    .then(imageData => {
      Object.keys(slideshowsConfig).forEach(slideshowId => {
        const config = slideshowsConfig[slideshowId];
        const images = imageData[config.folder] || [];
        const shuffledImages = shuffleArray([...images]);
        
        const slideshowElement = document.getElementById(slideshowId);
        if (slideshowElement) {
          slideshowElement.innerHTML = '';
          
          shuffledImages.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = `images/${config.folder}/${image}`;
            imgElement.alt = `Image for ${slideshowId}`;
            imgElement.style.position = 'absolute';
            imgElement.style.top = '0';
            imgElement.style.left = '0';
            imgElement.style.width = '100%';
            imgElement.style.height = '100%';
            imgElement.style.transition = 'opacity 0.5s ease';
            slideshowElement.appendChild(imgElement);
          });

          animateSlideshow(slideshowElement, config.delay);
        }
      });
    })
    .catch(error => console.error('Error loading image list:', error));
}

// ============ Form Handling Functions ============
function formatWhatsAppMessage(formData) {
  const planPrices = {
    bronze: "RM899",
    silver: "RM1299",
    gold: "RM1499"
  };

  const eventDate = new Date(formData.eventDate);
  const formattedDate = eventDate.toLocaleDateString('en-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const message = `🎉 *New Booking Request*

  👤 *Customer Details*
  Name: ${formData.fullName}
  Email: ${formData.email}
  Phone: ${formData.phone}

  📸 *Event Details*
  Event Type: ${formData.eventType}
  Date: ${formattedDate}
  Selected Package: ${formData.plan.toUpperCase()} (${planPrices[formData.plan]})

  💬 *Additional Message*
  ${formData.message || "No additional message provided"}

  Thank you for choosing PolyChrome! We'll get back to you soon.`;

  return encodeURIComponent(message);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const dialog = document.getElementById('success-dialog');
  const redirectButton = document.getElementById('redirect-button');
  const formSection =  document.querySelector('.form-section');

  const formData = {
    fullName: document.getElementById('full-name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    plan: document.getElementById('plan').value,
    eventType: document.getElementById('event-type').value,
    eventDate: document.getElementById('event-date').value,
    message: document.getElementById('message').value
  };

  const whatsappMessage = formatWhatsAppMessage(formData);
  const phoneNumber = '+60136281382';
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
  
  window.open(whatsappURL, '_blank');

  // show success dialog
  dialog.classList.remove('hidden')

  // add blur and dim effect
  formSection.classList.add('dimmed');
  document.body.insertAdjacentHTML('beforeend', '<div class="dim-overlay active"></div>');

  redirectButton.addEventListener('click', () => {
    // remove blur and dim effect
    formSection.classList.remove('dimmed');
    const dimOverlay = document.querySelector('dim-overlay');
    if (dimOverlay) dimOverlay.remove();

    // redirect to homepage
    window.location.href = 'index.html'
  });
}

// ============ Navigation Functions ============
function redirectToForm(plan) {
  const formPageUrl = 'form.html';
  const queryString = `?plan=${encodeURIComponent(plan)}`;
  window.location.href = formPageUrl + queryString;
}

function preselectPlan() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedPlan = urlParams.get('plan');
  if (selectedPlan) {
    const planDropdown = document.getElementById('plan');
    if (planDropdown) {
      planDropdown.value = selectedPlan;
    }
  }
}

// ============ Initialize Everything ============
document.addEventListener('DOMContentLoaded', () => {
  // Initialize slideshows if we're on the main page
  const slideshowContainer = document.querySelector('.slideshow-container');
  if (slideshowContainer) {
    populateSlideshows();
  }

  // Initialize form handling if we're on the form page
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    preselectPlan();
    bookingForm.addEventListener('submit', handleFormSubmit);
  }


});