'use strict';
var images = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass'];

var allImages = [];
var busMall = document.getElementById('images');
var justViewed = [];
var pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
var numberOfClicks = document.getElementById('tally');
var totalClicks = 0;

function Product(name) {
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  allImages.push(this);
}
for(var i = 0; i < images.length; i++) {
  new Product(images[i]);
}

function randomImage() {
  return Math.floor(Math.random() * images.length);
}

function displayImages() {
  var currentImage = [];
  currentImage[0] = randomImage();
  while (justViewed.indexOf(currentImage[0]) !== -1) {
    currentImage[0] = randomImage();
  }
  currentImage[1] = randomImage();
  while(currentImage[0] === currentImage[1] || justViewed.indexOf(currentImage[1]) !== -1) {
    currentImage[1] = randomImage();
  }
  currentImage[2] = randomImage();
  while(currentImage[0] === currentImage[2] || currentImage[1] === currentImage[2] || justViewed.indexOf(currentImage[2]) !== -1) {
    currentImage[2] = randomImage();
  }
  for(var i = 0; i < 3; i++) {
    pics[i].src = allImages[currentImage[i]].path;
    pics[i].id = allImages[currentImage[i]].name;
    allImages[currentImage[i]].views += 1;
    justViewed[i] = currentImage[i];
  }
}

function handleClick(event) {
  console.log(totalClicks, 'total clicks');
  if(totalClicks >= 24) {
    images.removeEventListener('click', handleClick);
    clicks();
  }
  if (event.target.id === 'images') {
    return alert('Nope, you need to click on an image.');
  }
  totalClicks += 1;
  for(var i = 0; i < images.length; i++) {
    if(event.target.id === allImages[i].name) {
      allImages[i].votes += 1;
      console.log(event.target.id + ' has ' + allImages[i].votes + ' votes in ' + allImages[i].views + ' views');
    }
  }
  displayImages();
}

function clicks() {
  for(var i = 0; i < allImages.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = allImages[i].name + ' has ' + allImages[i].votes + ' votes in ' + allImages[i].views + ' views';
    numberOfClicks.appendChild(liEl);
  }
}

busMall.addEventListener('click', handleClick);
displayImages();
