document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle-blur");
  chrome.storage.sync.get("blurEnabled", (data) => {
    toggle.checked = data.blurEnabled ?? true;
  });
  toggle.addEventListener("change", () => {
    chrome.storage.sync.set({ blurEnabled: toggle.checked });
  });
});
