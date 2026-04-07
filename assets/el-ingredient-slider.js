const swiperIngredient = new Swiper('.ingredient-slider__contents', {
  loop: true,
  slidesPerView: 1.15,
  spaceBetween: 12,
  pagination: {
      el: '.ingredient-slider__contents .swiper-pagination-col',
      clickable: true,
  },
  navigation: {
    nextEl: `.swiper-button-next-ingredient`,
    prevEl: `.swiper-button-prev-ingredient`,
    enabled: false,
  },
  breakpoints: {
    580: {
      slidesPerView: 2,
    },
    980: {
      loop: false,
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        enabled: true,
      },
    }
  }
});