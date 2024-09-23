const caruselContainer = document.querySelector(".slider-screen__carusel");
const caruselList = document.querySelector(".slider-screen__list");
const prev = document.querySelector("[data-prev]");
const next = document.querySelector("[data-next]");

let offset = 0;
let activeSlide = 0;
let slideWidth = caruselContainer.clientWidth;

const totalSlides = caruselList.children.length - 1;

let startX = 0;
let currentX = 0;
let isDragging = false;

const isActive = () => {
  prev.disabled = activeSlide <= 0;
  prev.disabled
    ? (prev.style.filter = "saturate(0.5)")
    : (prev.style.filter = "saturate(1)");
  next.disabled = activeSlide >= totalSlides;
  next.disabled
    ? (next.style.filter = "saturate(0.5)")
    : (next.style.filter = "saturate(1)");
};

window.addEventListener("resize", () => {
  slideWidth = caruselContainer.clientWidth;
  offset = -activeSlide * slideWidth;
  caruselList.style.transform = `translateX(${offset}px)`;
});

const handleClicker = (e) => {
  if (e.currentTarget === prev && activeSlide > 0) {
    offset += slideWidth;
    activeSlide -= 1;
  } else if (e.currentTarget === next && activeSlide < totalSlides) {
    offset -= slideWidth;
    activeSlide += 1;
  }
  isActive();
  caruselList.style.transform = `translateX(${offset}px)`;
};

const handleTouchStart = (e) => {
  startX = e.touches[0].clientX;
  currentX = startX;
  isDragging = true;
};

const handleTouchMove = (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  const deltaX = currentX - startX;
  caruselList.style.transform = `translateX(${offset + deltaX}px)`;
};

const handleTouchEnd = () => {
  if (!isDragging) return;
  isDragging = false;

  const deltaX = currentX - startX;

  if (Math.abs(deltaX) > 60) {
    if (deltaX < 0 && activeSlide < totalSlides) {
      offset -= slideWidth;
      activeSlide += 1;
    } else if (deltaX > 0 && activeSlide > 0) {
      offset += slideWidth;
      activeSlide -= 1;
    }
  }

  isActive();
  caruselList.style.transform = `translateX(${offset}px)`;
};

isActive();
caruselList.addEventListener("touchstart", handleTouchStart);
caruselList.addEventListener("touchmove", handleTouchMove);
caruselList.addEventListener("touchend", handleTouchEnd);
prev.addEventListener("click", handleClicker);
next.addEventListener("click", handleClicker);
