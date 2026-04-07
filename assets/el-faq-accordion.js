function initFaqAccordion(container) {
  const items = container.querySelectorAll('.faq-accordion__item');

  items.forEach(item => {
    const trigger = item.querySelector('.faq-accordion__item-title');
    const content = item.querySelector('.faq-accordion__item-description');

    if (item.dataset.initialized) return;
    item.dataset.initialized = "true";

    content.style.height = '0px';
    content.style.overflow = 'hidden';
    content.style.paddingBottom = '0px';

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.faq-accordion__item-description');
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          otherContent.style.height = '0px';
          otherContent.style.paddingBottom = '0px';
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        content.style.height = '0px';
        content.style.paddingBottom = '0px';
      } else {
        item.classList.add('is-open');

        content.style.height = 'auto';
        const fullHeight = content.scrollHeight + 'px';
        content.style.height = '0px';

        requestAnimationFrame(() => {
          content.style.height = fullHeight;
          content.style.paddingBottom = '20px';
        });
      }
    });
  });
}

document.querySelectorAll('.faq-accordion').forEach(section => {
  initFaqAccordion(section);
});

document.addEventListener('shopify:section:load', function (event) {
  const section = event.target;
  if (section.classList.contains('faq-accordion')) {
    initFaqAccordion(section);
  }
});
