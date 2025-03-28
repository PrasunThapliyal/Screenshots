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

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("insertTextBox")
    .addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            console.log("inside main.js: injectElement");

            var aboveTheFoldElement = document.getElementById("above-the-fold");
            if (aboveTheFoldElement) {
              console.log("inside main.js: aboveTheFoldElement found");

              var h1UnderTitle = aboveTheFoldElement.children[0]; // aboveTheFoldElement.children[0].children[1];
              if (h1UnderTitle) {
                console.log("h1 under title found");
                const inputElement = document.createElement("input");
                inputElement.type = "text";

                // Apply styles
                const styles = {
                  margin: "10px 0px",
                  border: "1px solid darkgray",
                  outline: "none",
                  borderRadius: "5px",
                  backgroundColor: "antiquewhite",
                  textAlign: "center",
                  padding: "5px",
                  width: "500px",
                  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
                };

                for (const property in styles) {
                  inputElement.style[property] = styles[property];
                  // Alternatively, set like so
                  // inputElement.style.width = '200px';
                }

                // Insert the input element after the parent element
                var parentElement = h1UnderTitle; // aboveTheFoldElement; // h1UnderTitle;
                parentElement.appendChild(inputElement);
              }
            }
          },
        });
      });
    });
});
