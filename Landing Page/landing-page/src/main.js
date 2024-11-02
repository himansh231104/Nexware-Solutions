import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/header.css";
import "../styles/components/hero.css";
import "../styles/components/about.css";
import "../styles/components/explore.css";
import "../styles/components/developer.css";
import "../styles/components/footer.css";
import "../styles/utils.css";

// import { monacoEditor } from "./utils/monaco-editor";

function monacoEditor() {
  require.config({
    paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor/min/vs" },
  });
  require(["vs/editor/editor.main"], function () {
    // Initialize Monaco Editor
    const editor = monaco.editor.create(document.getElementById("editor"), {
      value: "## Write your code here...",
      language: "python", // Default language
      theme: "vs-dark",
      automaticLayout: true,
    });

    // Map Judge0 API language IDs to Monaco Editor languages
    const languageMap = {
      63: "javascript",
      74: "typescript",
      71: "python",
      76: "cpp",
      51: "csharp",
      62: "java",
      80: "html",
      83: "css",
      68: "php",
      82: "sql",
      72: "ruby",
      60: "go",
      77: "swift",
      78: "kotlin",
      46: "shell",
      79: "objective-c",
      80: "r",
      73: "rust",
      54: "perl",
      81: "xml",
      66: "yaml",
      58: "dockerfile",
      57: "powershell",
      64: "lua",
      55: "coffeescript",
      47: "fsharp",
      84: "vb",
      92: "graphql",
      48: "bat",
      43: "plaintext",
    };

    // Function to handle code execution
    document.getElementById("run-code").addEventListener("click", function () {
      const code = editor.getValue();
      const selectedLanguageId =
        document.getElementById("language-selector").value;

      // Set editor language based on selection
      const editorLanguage = languageMap[selectedLanguageId];
      monaco.editor.setModelLanguage(editor.getModel(), editorLanguage);

      // Call Judge0 API to execute code
      executeCode(selectedLanguageId, code);
    });

    // Function to send code to Judge0 API
    function executeCode(languageId, sourceCode) {
      const apiUrl =
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
      const payload = {
        language_id: parseInt(languageId),
        source_code: sourceCode,
      };

      // Call Judge0 API
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com", // Replace with your RapidAPI host
          "X-RapidAPI-Key":
            "b93f7a75a3msh13d0ea028853106p162884jsn28843abab7ea", // Replace with your RapidAPI key
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          // Display output in the output section
          const outputElement = document.getElementById("execution-result");
          if (data.stdout) {
            outputElement.textContent = data.stdout;
          } else if (data.stderr) {
            outputElement.textContent = `Error: ${data.stderr}`;
          } else {
            outputElement.textContent = "No output";
          }
        })
        .catch((error) => {
          console.error("Error executing code:", error);
        });
    }
  });
}

// ------------- Header Scroll ------------- //

function headerScroll() {
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
}

// --------- Mobile Navbar ------------ //
function mobileNav() {
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
}

function darkMode() {
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
}

headerScroll();
mobileNav();
darkMode();
monacoEditor();
