let video = document.querySelector('video');

function handleVisibilityChange() {
  console.log('Visibility changed:', document.hidden);
  if (document.hidden) {
    if (video && !video.paused) {
      video.pause();
      console.log('Video paused');
      localStorage.setItem('videoPaused', 'true');
    }
  } else {
    if (video && localStorage.getItem('videoPaused') === 'true') {
      video.play();
      console.log('Video resumed');
      localStorage.setItem('videoPaused', 'false');
    }
  }
}

if (video) {
  console.log('Video element found');
  document.addEventListener('visibilitychange', handleVisibilityChange, false);

  window.addEventListener('blur', () => {
    console.log('Window blurred');
    if (video && !video.paused) {
      video.pause();
      console.log('Video paused on blur');
      localStorage.setItem('videoPaused', 'true');
    }
  });

  window.addEventListener('focus', () => {
    console.log('Window focused');
    if (video && localStorage.getItem('videoPaused') === 'true') {
      video.play();
      console.log('Video resumed on focus');
      localStorage.setItem('videoPaused', 'false');
    }
  });
} else {
  console.log('No video element found');
}
