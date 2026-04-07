document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.review-slider__item-grid');
  const button = document.querySelector('.review-slider__grid-button');

  let visibleCount = 0;

  function getInitialCount() {
    return window.innerWidth >= 981 ? 6 : 3;
  }

  function getStep() {
    return 3;
  }

  function updateItems() {
    items.forEach((item, index) => {
      if (index < visibleCount) {
        item.classList.add('is-visible');
      } else {
        item.classList.remove('is-visible');
      }
    });

    if (visibleCount >= items.length) {
      button.textContent = 'Read Less';
    } else {
      button.textContent = 'Read More Reviews';
    }
  }

  function init() {
    visibleCount = getInitialCount();
    updateItems();
  }

  button.addEventListener('click', function (e) {
    e.preventDefault();

    const initial = getInitialCount();

    if (visibleCount >= items.length) {
      visibleCount = initial;
    } else {
      visibleCount += getStep();

      if (visibleCount > items.length) {
        visibleCount = items.length;
      }
    }

    updateItems();
  });

  init();
});