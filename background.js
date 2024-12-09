// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === 'saveImage') {
//       chrome.downloads.download({
//         url: request.data,
//         filename: 'screenshot.png'
//       });
//     }
//   });