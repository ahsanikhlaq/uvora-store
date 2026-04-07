const swiperReview = new Swiper('.review-slider__contents', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
      el: '.review-slider__contents .swiper-pagination-col',
      clickable: true,
  },
  navigation: {
    nextEl: `.swiper-button-next-review`,
    prevEl: `.swiper-button-prev-review`,
    enabled: false,
  },
  breakpoints: {
    580: {
      slidesPerView: 2,
    },
    980: {
      slidesPerView: 3,
    },
    1400: {
      loop: false,
      slidesPerView: 4,
      navigation: {
        enabled: true,
      },
    }
  }
});