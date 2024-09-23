const carouselContainer = document.querySelector(".slider-screen__carusel");
const carouselList = document.querySelector(".slider-screen__list");
const prev = document.querySelector("[data-prev]");
const next = document.querySelector("[data-next]");

let activeSlide = 0;

const totalSlides = carouselList.children.length - 1;

let startX = 0;
let currentX = 0;
let isDragging = false;

const getOffset = () => {
  return -activeSlide * carouselContainer.clientWidth;
};

const recalculateOffset = () => {
  carouselList.style.transform = `translateX(${getOffset()}px)`;
};

const nextSlide = () => {
  if (activeSlide < carouselList.children.length) {
    activeSlide++;
    recalculateOffset();
  }
};

const prevSlide = () => {
  if (activeSlide > 0) {
    activeSlide--;
    recalculateOffset();
  }
};

const btnDisabledToggler = () => {
  prev.disabled = activeSlide <= 0;
  prev.disabled
    ? (prev.style.filter = "saturate(0.5)")
    : (prev.style.filter = "saturate(1)");
  next.disabled = activeSlide >= totalSlides;
  next.disabled
    ? (next.style.filter = "saturate(0.5)")
    : (next.style.filter = "saturate(1)");
};

window.addEventListener("resize", recalculateOffset);

const handleClicker = (e) => {
  if (e.currentTarget === prev) {
    prevSlide();
  } else {
    nextSlide();
  }
  btnDisabledToggler();
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
  carouselList.style.transform = `translateX(${getOffset() + deltaX}px)`;
};

const handleTouchEnd = () => {
  if (!isDragging) return;
  isDragging = false;

  const deltaX = currentX - startX;

  if (Math.abs(deltaX) > 60) {
    if (deltaX < 0 && activeSlide < totalSlides) {
      nextSlide();
    } else if (deltaX > 0 && activeSlide > 0) {
      prevSlide();
    }
  }
  btnDisabledToggler();
  recalculateOffset();
};

btnDisabledToggler();
carouselList.addEventListener("touchstart", handleTouchStart);
carouselList.addEventListener("touchmove", handleTouchMove);
carouselList.addEventListener("touchend", handleTouchEnd);
prev.addEventListener("click", handleClicker);
next.addEventListener("click", handleClicker);
