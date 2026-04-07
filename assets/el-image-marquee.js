var swiperMarquee = new Swiper(".image-marquee__contents", {
  spaceBetween: 8,
  centeredSlides: true,
  speed: 4000,
  autoplay: {
    delay: 1,
  },
  loop: true,
  slidesPerView:'auto',
  allowTouchMove: false,
  disableOnInteraction: true,
  breakpoints: {
    980: {
      spaceBetween: 24,
    }
  }
});