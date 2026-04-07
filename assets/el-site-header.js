const menuBtn = document.querySelector(".el-site-header__menu-nav");
const overlay = document.querySelector(".el-site-header__overlay");
const drawer = document.querySelector(".el-site-header__drawer");
const closeBtn = document.querySelector(".el-site-header__menu-close");
const body = document.body;

menuBtn.onclick = openDrawer;
overlay.onclick = closeDrawer;
closeBtn.onclick = closeDrawer;

function openDrawer() {
  drawer.classList.add("open");
  overlay.classList.add("show");
  body.classList.add("no-scroll");
}

function closeDrawer() {
  drawer.classList.remove("open");
  overlay.classList.remove("show");
  body.classList.remove("no-scroll");
}

const header = document.querySelector('.el-site-header');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('sticky');
    document.body.style.paddingTop = `${headerHeight}px`;
  } else {
    header.classList.remove('sticky');
    document.body.style.paddingTop = '';
  }
});
