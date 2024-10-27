// ------------- MONACO EDITOR -------------- //
const monacoEditor = async function loadMonacoEditor() {
  if (typeof monaco !== "undefined") return; // Check if Monaco Editor is already loaded

  await new Promise((resolve) => {
    require.config({
      paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor/min/vs" },
    });
    require(["vs/editor/editor.main"], resolve);
  });

  const editor = monaco.editor.create(document.getElementById("editor"), {
    value: `# Type your code here...\n`,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
  });

  // Function to change the language in Monaco Editor
  function changeLanguage(language) {
    monaco.editor.setModelLanguage(editor.getModel(), language);
  }

  // Add event listener to the dropdown to change language
  document
    .getElementById("language-selector")
    .addEventListener("change", function (event) {
      const selectedLanguage = event.target.value;
      changeLanguage(selectedLanguage);
    });
};
 export default monacoEditor;