chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab && tab.url.includes("youtube.com/watch")) {
      try {
        chrome.scripting.executeScript({
          target: { tabId: activeInfo.tabId },
          files: ["content.js"]
        });
      } catch (error) {
        console.error('Error executing script on tab activation:', error);
      }
    }
  });
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].url.includes("youtube.com/watch")) {
        try {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: pauseVideo
          });
        } catch (error) {
          console.error('Error executing script on window blur:', error);
        }
      }
    });
  } else {
    chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
      if (tabs.length > 0 && tabs[0].url.includes("youtube.com/watch")) {
        try {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: resumeVideo
          });
        } catch (error) {
          console.error('Error executing script on window focus:', error);
        }
      }
    });
  }
});

function pauseVideo() {
  let video = document.querySelector('video');
  if (video) {
    video.pause();
  }
}

function resumeVideo() {
  let video = document.querySelector('video');
  if (video) {
    video.play();
  }
}
