import { captureNow } from "../background.js";

chrome.storage.local.get("fileName", (result) => {
  const lastFilename = result.fileName;
  if (lastFilename) {
    const filenameInput = document.getElementById("fileNameInput");
    filenameInput.value = lastFilename;
  }
});

document.getElementById("captureNow").addEventListener("click", () => {
  const fileName = document.getElementById("fileNameInput").value;
  chrome.storage.local.set({ fileName });
  captureNow(fileName);
});

document.getElementById("settings").addEventListener("click", () => {
  var fileNameContainer = document.getElementById("fileNameContainer");
  if (fileNameContainer) {
    fileNameContainer.style.display = "block";
  }
});
