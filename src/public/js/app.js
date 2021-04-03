const sectionMenuLateral = document.querySelector(".section__menu-lateral");
const section = document.querySelector(".section");
const btnMenu = document.getElementById("menu");

btnMenu.addEventListener("click", (e) => {
  e.preventDefault();
  section.classList.toggle("activate");
  sectionMenuLateral.classList.toggle("activate");
});
