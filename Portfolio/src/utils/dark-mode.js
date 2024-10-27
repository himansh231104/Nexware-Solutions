const darkMode = () => {
  const themeToggleBtns = document.querySelectorAll("#theme-toggle");

  //   State variable
  const theme = localStorage.getItem("theme");

  //   On mount --> What happens when the page finishes its initial load or reloads.
  theme && document.body.classList.add(theme);

  //   Handler
  const handleThemeToggle = () => {
    document.body.classList.toggle("light-mode");
    // Condition that checks whether a specific class exists or not inside the element.

    if (document.body.classList.contains("light-mode")) {
      // Maintain state when page is reloaded...
      localStorage.setItem("theme", "light-mode");
    } else {
      // Maintain state when page is reloaded... (remove key:value for light mode form local storage).
      localStorage.removeItem("theme");
      document.body.removeAttribute("class");
    }
  };

  //   Events
  themeToggleBtns.forEach((btn) =>
    btn.addEventListener("click", handleThemeToggle)
  );
};

export default darkMode;
