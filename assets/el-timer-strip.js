document.addEventListener("DOMContentLoaded", () => {
  const timers = document.querySelectorAll(".timer-strip__clock");

  if (!timers.length) return;

  timers.forEach(timer => {
    const timer_hours = parseInt(timer.dataset.hours, 10) || 0;
    const timer_minutes = parseInt(timer.dataset.minutes, 10) || 0;

    const totalSeconds = (timer_hours * 3600) + (timer_minutes * 60);

    const hoursEl = timer.querySelector("[data-hours]");
    const minutesEl = timer.querySelector("[data-minutes]");
    const secondsEl = timer.querySelector("[data-seconds]");

    if (!hoursEl || !minutesEl || !secondsEl) return;

    let remaining = totalSeconds;

    function updateDisplay(seconds) {
      let h = Math.floor(seconds / 3600);
      let m = Math.floor((seconds % 3600) / 60);
      let s = Math.floor(seconds % 60);

      hoursEl.textContent = String(h).padStart(2, "0");
      minutesEl.textContent = String(m).padStart(2, "0");
      secondsEl.textContent = String(s).padStart(2, "0");
    }

    function tick() {
      updateDisplay(remaining);

      if (remaining > 0) {
        remaining--;
      } else {
        // optional: restart loop
        remaining = totalSeconds;
      }
    }

    tick();
    setInterval(tick, 1000);
  });
});