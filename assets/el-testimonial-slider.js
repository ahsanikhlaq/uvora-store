const swiperReview = new Swiper('.testimonial-slider__contents', {
  loop: true,
  slidesPerView: 1.07,
  spaceBetween: 8,
  pagination: {
      el: '.testimonial-slider__contents .swiper-pagination-col',
      clickable: true,
  },
  navigation: {
    nextEl: `.swiper-button-next-testimonial`,
    prevEl: `.swiper-button-prev-testimonial`,
    enabled: false,
  },
  breakpoints: {
    580: {
      slidesPerView: 2,
    },
    980: {
      spaceBetween: 20,
      loop: false,
      slidesPerView: 3,
      navigation: {
        enabled: true,
      },
    }
  }
});