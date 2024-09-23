const screenBox = document.querySelector(".screens-box");
const continueScreen = document.querySelector("[data-continueScreen]");
const nextScreen = document.querySelector("[data-nextScreen]");

let screenCount = 0;

const handleNextScreen = () => {
  screenCount += 1;
  screenBox.style.transform = `translateX(${-100 * screenCount}%)`;
};

continueScreen.addEventListener("click", handleNextScreen);
nextScreen.addEventListener("click", handleNextScreen);
