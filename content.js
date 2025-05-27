const styleId = "blur-style";
const blurCSS = `
  .x10l6tqk.xh8yej3.x1g42fcv {
    filter: blur(6px) !important;
    transition: filter 0.3s ease-in-out;
  }
  .x10l6tqk.xh8yej3.x1g42fcv:hover {
    filter: none !important;
  }
`;

function addBlurStyle() {
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = blurCSS;
    document.head.appendChild(style);
  }
}

function removeBlurStyle() {
  const existing = document.getElementById(styleId);
  if (existing) existing.remove();
}

function setBlur(enabled) {
  if (enabled) {
    addBlurStyle();
  } else {
    removeBlurStyle();
  }
}

// Observe for sidebar changes and re-apply blur if needed
let observer = null;
function observeSidebar(blurEnabled) {
  if (observer) observer.disconnect();
  observer = new MutationObserver(() => {
    if (blurEnabled) addBlurStyle();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Initial load
chrome.storage.sync.get("blurEnabled", (data) => {
  const enabled = data.blurEnabled ?? true;
  setBlur(enabled);
  observeSidebar(enabled);
});

// Listen for changes and apply/remove blur instantly
chrome.storage.onChanged.addListener((changes) => {
  if (changes.blurEnabled) {
    const enabled = changes.blurEnabled.newValue;
    setBlur(enabled);
    observeSidebar(enabled);
  }
});

console.log("WhatsApp Blur Contacts extension loaded.");
