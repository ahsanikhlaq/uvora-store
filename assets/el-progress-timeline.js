document.addEventListener('DOMContentLoaded', () => {
  const journeyItems = document.querySelectorAll('.progress-timeline__item');
  let lastScrollY = window.scrollY;
  let queue = [];
  let processing = false;

  const processQueue = () => {
    if (processing || queue.length === 0) return;

    processing = true;
    const item = queue.shift();

    item.classList.add('active');

    setTimeout(() => {
      processing = false;
      processQueue();
    }, 800); // delay between activations
  };

  const observer = new IntersectionObserver((entries) => {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY;

    entries.forEach(entry => {
      const target = entry.target;

      if (entry.isIntersecting) {
        if (!target.classList.contains('active') && !queue.includes(target)) {
          queue.push(target);
          processQueue();
        }
      } else {
        if (!isScrollingDown) {
          target.classList.remove('active');
        }
      }
    });

    lastScrollY = currentScrollY;
  }, { threshold: 1 });

  journeyItems.forEach(item => observer.observe(item));
});