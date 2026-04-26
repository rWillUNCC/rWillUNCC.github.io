let display = document.getElementById('display');
let drumPads = document.querySelectorAll('.drum-pad');

function playAudio(dPad) {

  let audio = dPad.firstElementChild;
  let desc = dPad.id.replace(/-/g, ' ');
  
  audio.currentTime = 0;
  audio.play();
  
  display.innerText = desc;
  
  dPad.classList.add('active');
  setTimeout(() => dPad.classList.remove('active'), 100);
}

drumPads.forEach((dPad) => {
  dPad.addEventListener('click', () => playAudio(dPad));
});


document.addEventListener('keydown', (e) => {
  let key = e.key.toUpperCase();
  let feed = document.getElementById(key);
  
  if (feed) {
    let parentDPad = feed.parentElement;
    playAudio(parentDPad);
  }
});