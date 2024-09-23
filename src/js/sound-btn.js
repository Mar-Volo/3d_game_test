const iconBtnSound = document.querySelector(".icon-btn__sound");

const toggleSound = () => {
  iconBtnSound.classList.toggle("--is-active");
};

iconBtnSound.addEventListener("click", toggleSound);
