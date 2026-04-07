document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.progress-counter__item-counter span');

  const animateCount = (el, target) => {
    const duration = 1500;
    const startTime = performance.now();

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * target);

      el.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseInt(el.getAttribute('data-counter'), 10);

        if (!el.classList.contains('counted')) {
          el.classList.add('counted');
          animateCount(el, targetValue);
        }
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => observer.observe(counter));
});
