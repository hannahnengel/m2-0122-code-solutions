function updateHeading() {
  var $heading = document.querySelector('h1.message');
  $heading.textContent = 'Hello There';
}

setTimeout(updateHeading, 2000);
