var $countdown = document.querySelector('h1.countdown-display');
function countDown() {
  var number = parseInt($countdown.innerHTML);
  number--;
  if (number >= 1) {
    $countdown.textContent = number;
  } else if (number < 1) {
    $countdown.textContent = '~Earth Beeeelooowww Us~';
  }
}

setInterval(countDown, 2000);
clearInterval(2);
