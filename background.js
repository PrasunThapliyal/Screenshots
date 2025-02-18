// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === 'saveImage') {
//       chrome.downloads.download({
//         url: request.data,
//         filename: 'screenshot.png'
//       });
//     }
//   });

chrome.commands.onCommand.addListener((shortcut) => {
  if (shortcut === "captureNow") {
    chrome.storage.local.get("fileName", (result) => {
      const lastFilename = result.fileName;
      captureNow(lastFilename);
    });
  }
});

export function captureNow(filename) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      // TODO : We can send a message to a background worker as well, but don't know atm what's the benifit
      // chrome.runtime.sendMessage({ action: 'saveImage', data: dataUrl });
      chrome.downloads.download({
        url: dataUrl,
        filename: filename + ".png" || "screenshotB.png",
      });
    });
  });
}
