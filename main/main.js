document.getElementById('captureNow').addEventListener('click', () => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.captureVisibleTab(null, {format:"png"}, (dataUrl) => {
            // TODO : We can send a message to a background worker as well, but don't know atm what's the benifit
            // chrome.runtime.sendMessage({ action: 'saveImage', data: dataUrl });
            
            chrome.downloads.download({
                url: dataUrl,
                filename: 'screenshotA.png'
              });
        });
    });
  });
  
