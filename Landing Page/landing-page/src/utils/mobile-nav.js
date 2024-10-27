// ------------- Header Feature ------------- //

// Select the header element
const header = document.querySelector(".header");

// Add an event listener to the window object
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    // Change 50 to your preferred threshold
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// --------- Mobile Navbar ------------ //
const mobileNav = () => {
  const mobileNav = document.querySelector(".mobile-nav__bars");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav__links");

  let isMobileNavOpen = false;

  mobileNav.addEventListener("click", () => {
    if (!isMobileNavOpen) {
      isMobileNavOpen = true;
      mobileMenu.style.display = "flex";
      document.body.style.overflowY = "hidden";
    } else {
      isMobileNavOpen = false;
      mobileMenu.style.display = "none";
      document.body.style.overflowY = "auto";
    }
  });
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      isMobileNavOpen = false;
      mobileMenu.style.display = "none";
      document.body.style.overflowY = "auto";
    });
  });
};

export default mobileNav;
