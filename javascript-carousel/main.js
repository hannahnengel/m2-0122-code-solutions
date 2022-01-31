
var myInt = setInterval(carousel, 3000);
var counter = 0;

function carousel() {
  var slideNumber = (counter + 1);
  if (slideNumber > 1 && slideNumber < 5) {
    var activeSlideNumber = slideNumber.toString();
    var nextSlideNumber = (slideNumber + 1).toString();
    var previousSlideNumber = (slideNumber - 1).toString();
    counter++;
  } else if (slideNumber === 1) {
    activeSlideNumber = slideNumber.toString();
    nextSlideNumber = (slideNumber + 1).toString();
    previousSlideNumber = '5';
    counter++;
  } else if (slideNumber === 5) {
    activeSlideNumber = slideNumber.toString();
    nextSlideNumber = '1';
    previousSlideNumber = (slideNumber - 1).toString();
    counter = 0;
  }
  slideMover(activeSlideNumber, previousSlideNumber, nextSlideNumber);
}

function slideMover(activeSlideNumber, previousSlideNumber, nextSlideNumber) {
  if (document.querySelector('[data-view=previous-img]') !== null) {
    var $previousImg = document.querySelector('[data-view=previous-img]');
    $previousImg.setAttribute('data-view', 'hidden-img');
    $previousImg.classList.add('hidden');
  }

  var imgToActivate = document.querySelector('div[slide-number=' + '' + CSS.escape(activeSlideNumber) + '' + ']');

  imgToActivate.setAttribute('data-view', 'active-img');
  imgToActivate.classList.remove('hidden');

  var buttonToActivate = document.querySelector('i[slide-number=' + '' + CSS.escape(activeSlideNumber) + '' + ']');
  buttonToActivate.setAttribute('data-view', 'active');
  buttonToActivate.classList.add('fas');
  buttonToActivate.classList.remove('far');

  var imgToPrevious = document.querySelector('div[slide-number=' + '' + CSS.escape(previousSlideNumber) + '' + ']');
  imgToPrevious.setAttribute('data-view', 'previous-img');
  imgToPrevious.classList.add('hidden');

  var buttonToPrevious = document.querySelector('i[slide-number=' + '' + CSS.escape(previousSlideNumber) + '' + ']');
  buttonToPrevious.setAttribute('data-view', 'previous');
  buttonToPrevious.classList.remove('fas');
  buttonToPrevious.classList.add('far');

  var imgToNext = document.querySelector('div[slide-number=' + '' + CSS.escape(nextSlideNumber) + '' + ']');
  imgToNext.setAttribute('data-view', 'next-img');

  var buttonToNext = document.querySelector('i[slide-number=' + '' + CSS.escape(nextSlideNumber) + '' + ']');
  buttonToNext.setAttribute('data-view', 'next');

}

document.addEventListener('click', clickImage);

function clickImage(event) {
  clearInterval(myInt);
  myInt = setInterval(carousel, 3000);
  if (event.target.closest('i') && event.target.classList.contains('fa-circle')) {
    reset();
    var slideNumber = parseInt(event.target.getAttribute('slide-number'));
    counter = slideNumber - 1;
    carousel();
  }

  if (event.target.closest('i') && event.target.classList.contains('arrow')) {
    var $active = document.querySelector('[data-view=active]');
    slideNumber = parseInt($active.getAttribute('slide-number'));
    reset();
    if (event.target.classList.contains('fa-chevron-right')) {
      if (slideNumber < 5) {
        counter = slideNumber;
      } else if (slideNumber === 5) {
        counter = 0;
      }
    } else if (event.target.classList.contains('fa-chevron-left')) {
      if (slideNumber > 1 && slideNumber <= 5) {
        counter = slideNumber - 2;
      } else if (slideNumber === 1) {
        counter = 4;
      }
    }
    carousel();
  }
}

function reset() {
  var $active = document.querySelector('[data-view=active]');
  var $next = document.querySelector('[data-view=next]');
  var $previous = document.querySelector('[data-view=previous]');

  var $activeImg = document.querySelector('[data-view=active-img]');
  var $nextImg = document.querySelector('[data-view=next-img]');
  var $previousImg = document.querySelector('[data-view=previous-img]');

  $active.setAttribute('data-view', '');
  $active.classList.remove('fas');
  $active.classList.add('far');
  $activeImg.setAttribute('data-view', '');
  $activeImg.classList.add('hidden');

  $previous.setAttribute('data-view', '');
  $previousImg.setAttribute('data-view', '');
  $previousImg.classList.add('hidden');

  $next.setAttribute('data-view', '');
  $nextImg.setAttribute('data-view', '');
  $nextImg.classList.add('hidden');
}
