function moveCarousel() {
      const carouselInner = document.querySelector('.carousel-inner');
      const carouselCards = document.querySelectorAll('.carousel-card');
      const cardWidth = carouselCards[0].offsetWidth + parseFloat(getComputedStyle(carouselCards[0]).marginRight);

      carouselInner.appendChild(carouselCards[0]);

      carouselInner.style.transform = `translateX(-${cardWidth}px)`;

      setTimeout(() => {
          carouselInner.style.transition = 'none';
          carouselInner.style.transform = 'translateX(0)';
          setTimeout(() => {
              carouselInner.style.transition = 'transform 0.5s ease';
          }, 50);
      }, 500);
  }
  setInterval(moveCarousel, 2000);