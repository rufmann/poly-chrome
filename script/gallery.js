document.addEventListener("DOMContentLoaded", () => {
  const verticalSliders = document.querySelectorAll('.slider-wrapper:not(.horizontal-slider) .slider');
  const horizontalSliders = document.querySelectorAll('.horizontal-slider .slider');
  
  const verticalTopArrows = document.querySelectorAll('.slider-wrapper:not(.horizontal-slider) .top-arrow');
  const verticalBottomArrows = document.querySelectorAll('.slider-wrapper:not(.horizontal-slider) .bottom-arrow');
  
  const horizontalLeftArrows = document.querySelectorAll('.horizontal-slider .left-arrow');
  const horizontalRightArrows = document.querySelectorAll('.horizontal-slider .right-arrow');

  verticalTopArrows.forEach((arrow, index) => {
    arrow.addEventListener('click', () => moveSlide(verticalSliders[index], 'vertical', 'up'));
  });

  verticalBottomArrows.forEach((arrow, index) => {
    arrow.addEventListener('click', () => moveSlide(verticalSliders[index], 'vertical', 'down'));
  });

  horizontalLeftArrows.forEach((arrow, index) => {
    arrow.addEventListener('click', () => moveSlide(horizontalSliders[index], 'horizontal', 'left'));
  });

  horizontalRightArrows.forEach((arrow, index) => {
    arrow.addEventListener('click', () => moveSlide(horizontalSliders[index], 'horizontal', 'right'));
  });

  function moveSlide(slider, direction, arrow) {
    const slides = slider.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const currentTransform = parseInt(slider.style.transform.split('(')[1]?.split('px')[0] || '0', 10) || 0;
    const slideSize = direction === 'vertical' ? slides[0].offsetHeight : slides[0].offsetWidth;
    const maxTransform = direction === 'vertical' ? (totalSlides - 1) * slideSize : (totalSlides - 1) * slideSize;

    let newTransform = 0;

    if (arrow === 'up') {
      newTransform = currentTransform === 0 ? -maxTransform : currentTransform + slideSize;
    } else if (arrow === 'down') {
      newTransform = currentTransform === -maxTransform ? 0 : currentTransform - slideSize;
    } else if (arrow === 'left') {
      newTransform = currentTransform === 0 ? -maxTransform : currentTransform + (direction === 'vertical' ? slideSize : -slideSize);
    } else if (arrow === 'right') {
      newTransform = currentTransform === -maxTransform ? 0 : currentTransform - (direction === 'vertical' ? slideSize : -slideSize);
    }

    slider.style.transform = direction === 'vertical' ? `translateY(${newTransform}px)` : `translateX(${newTransform}px)`;
  }
});
