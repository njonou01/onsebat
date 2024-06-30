window.addEventListener('scroll', function () {
      const navbar = document.querySelector('.navbar-sticky');
      if (window.scrollY > 0) {
          navbar.classList.add('navbar-scrolled');
      } else {
          navbar.classList.remove('navbar-scrolled');
      }
  });