document.addEventListener("DOMContentLoaded", function () {
  const sliderThumbnail = new Swiper('.product-offer__nav-slider', {
    slidesPerView: 6,
    spaceBetween: 7,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      581: {
        slidesPerView: 5.5,
        spaceBetween: 16,
      }
    }
  });

  const sliderProdMain = new Swiper('.product-offer__main-slider', {
    spaceBetween: 12,
    slidesPerView: 1.15,
    loop: true,
    thumbs: {
      swiper: sliderThumbnail
    },
    navigation: {
      nextEl: '.swiper-button-next-button',
      prevEl: '.swiper-button-prev-button',
    },
    breakpoints: {
      581: {
        loop: false,
        slidesPerView: 1,
      }
    }
  });
});

// product offer
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".product-offer__variant-item");
  const btnPrice = document.querySelector(".btn-price");
  const btnCompare = document.querySelector(".btn-compare");
  const subscriptionCheckbox = document.getElementById("offer-subscription");

  let isSub = subscriptionCheckbox?.checked || false;

  function updateButton(item) {
    btnPrice.textContent = isSub ? item.dataset.subscriptionPrice : item.dataset.price;
    btnCompare.textContent = item.dataset.comparePrice;
  }

  function updateAllItemsPrice() {
    items.forEach((item) => {
      const priceElem = item.querySelector(".price-reg");
      priceElem.textContent = isSub ? item.dataset.subscriptionPrice : item.dataset.price;
    });
    const selected = document.querySelector(".product-offer__variant-item.selected");
    if (selected) updateButton(selected);
  }

  if (subscriptionCheckbox) {
    subscriptionCheckbox.addEventListener("change", function () {
      isSub = subscriptionCheckbox.checked;
      updateAllItemsPrice();
    });
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      items.forEach((i) => i.classList.remove("selected"));
      item.classList.add("selected");
      updateButton(item);
    });

    if (index === 1) {
      item.classList.add("selected");
      updateButton(item);
    }
  });

  document.getElementById("buy-now").addEventListener("click", function (e) {
    e.preventDefault();

    const btn = this;
    btn.classList.add("loading");

    const selected = document.querySelector(".product-offer__variant-item.selected");
    if (!selected) {
      btn.classList.remove("loading");
      return;
    }

    const variantId = selected.dataset.id;
    const quantity = parseInt(selected.dataset.quantity);

    const payload = { id: variantId, quantity: quantity };

    if (subscriptionCheckbox?.checked && subscriptionCheckbox.dataset.sellingPlanId) {
      payload.selling_plan = subscriptionCheckbox.dataset.sellingPlanId;
    }

    const freeItems = selected.querySelectorAll("[data-free-id]");
    const freeProductsPayload = Array.from(freeItems).map(li => ({
      id: li.dataset.freeId,
      quantity: 1
    }));

    const itemsToAdd = [
      {
        id: variantId,
        quantity: quantity,
        ...(subscriptionCheckbox?.checked && subscriptionCheckbox.dataset.sellingPlanId
          ? { selling_plan: subscriptionCheckbox.dataset.sellingPlanId }
          : {})
      },
      ...freeProductsPayload
    ];

    fetch("/cart/clear.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
    .then(() => fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: itemsToAdd })
    }))
    .then(() => {
      document.dispatchEvent(new CustomEvent("cart:refresh"));

      if (window.UpCart?.openCart) {
        window.UpCart.openCart();
      } else {
        document.dispatchEvent(new CustomEvent("upcart:open"));
      }
    })
    .catch(err => console.error(err))
    .finally(() => {
      btn.classList.remove("loading");
    });
  });
});

window.addEventListener('pageshow', () => {
  const btn = document.getElementById('buy-now');
  if (!btn) return;

  btn.classList.remove('loading');
  btn.disabled = false;
});

// faq
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.product-offer__acc-item');

  items.forEach(item => {
    const trigger = item.querySelector('.product-offer__acc-item-title');
    const content = item.querySelector('.product-offer__acc-item-description');

    content.style.height = '0px';
    content.style.overflow = 'hidden';
    content.style.paddingBottom = '0px';

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.product-offer__acc-item-description');
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          otherContent.style.height = '0px';
          otherContent.style.paddingBottom = '0px';
        }
      });

      if (isOpen) {
        content.style.height = '0px';
        content.style.paddingBottom = '0px';
        item.classList.remove('is-open');
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
});

// sticky button
document.addEventListener('DOMContentLoaded', function () {
  const sticky = document.querySelector('.product-offer__sticky');
  const wrapper = document.querySelector('.product-offer__container');
  const footer = document.querySelector('.site-footer');

  if (!sticky) return;

  let passedWrapper = false;

  if (wrapper) {
    const wrapperObserver = new IntersectionObserver(
      ([entry]) => {
        passedWrapper = !entry.isIntersecting;

        if (passedWrapper) {
          sticky.classList.add('fixed');
        } else {
          sticky.classList.remove('fixed');
        }
      },
      { threshold: 0 }
    );

    wrapperObserver.observe(wrapper);
  }

  if (footer) {
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sticky.classList.remove('fixed');
        } else {
          if (passedWrapper) {
            sticky.classList.add('fixed');
          }
        }
      },
      { threshold: 0 }
    );

    footerObserver.observe(footer);
  }
});

// kaching button price updates
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".product-offer__btn-kaching");
  if (!btn) return;

  const btnCompare = btn.querySelector(".btn-compare");

  function updateComparePrice() {
    const selectedBar = document.querySelector(".kaching-bundles__bar--selected");
    if (!selectedBar) return;

    const compareEl = selectedBar.querySelector(".kaching-bundles__bar-full-price");
    if (!compareEl) return;

    btnCompare.textContent = compareEl.textContent.trim();
  }

  updateComparePrice();

  document.addEventListener("click", function (e) {
    if (e.target.closest(".kaching-bundles__bar")) {
      setTimeout(updateComparePrice, 50);
    }
  });

  const observer = new MutationObserver(() => {
    updateComparePrice();
  });

  document.querySelectorAll(".kaching-bundles__bar").forEach(bar => {
    observer.observe(bar, {
      attributes: true,
      attributeFilter: ["class"]
    });
  });
});