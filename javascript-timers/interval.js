var $countdown = document.querySelector('h1.countdown-display');
var myInterval = setInterval(countDown, 2000);

function countDown() {
  var number = parseInt($countdown.innerHTML);
  number--;
  if (number >= 1) {
    $countdown.textContent = number;
  } else if (number === 0) {
    $countdown.textContent = '~Earth Beeeelooowww Us~';
  } else {
    clearInterval(myInterval);
  }
}
