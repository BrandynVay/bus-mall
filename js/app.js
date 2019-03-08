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
  'water-can',
  'wine-glass',
  'usb',];

var allImages = [];
var busMall = document.getElementById('images');
var viewedImage = [];
var pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
var numberOfClicks = document.getElementById('number-of-clicks');
var views = [];
var votes = [];
var totalClicks = 0;

function BusMall(name, ext) {
  this.name = name;
  this.path = `img/${name}.${ext}`;
  this.ext = ext;
  this.votes = 0;
  this.views = 0;
  allImages.push(this);
}

new BusMall('bag', 'jpg');
new BusMall('banana', 'jpg');
new BusMall('bathroom', 'jpg');
new BusMall('boots', 'jpg');
new BusMall('breakfast', 'jpg');
new BusMall('bubblegum', 'jpg');
new BusMall('chair', 'jpg');
new BusMall('cthulhu', 'jpg');
new BusMall('dog-duck', 'jpg');
new BusMall('dragon', 'jpg');
new BusMall('pen', 'jpg');
new BusMall('pet-sweep', 'jpg');
new BusMall('scissors', 'jpg');
new BusMall('shark', 'jpg');
new BusMall('sweep', 'jpg');
new BusMall('tauntaun', 'jpg');
new BusMall('unicorn', 'jpg');
new BusMall('water-can', 'jpg');
new BusMall('wine-glass', 'jpg');
new BusMall('usb', 'gif');

function randomImage() {
  return Math.floor(Math.random() * images.length);
}

function displayImages() {
  var currentImage = [];
  currentImage[0] = randomImage();
  while (viewedImage.indexOf(currentImage[0]) !== -1) {
    currentImage[0] = randomImage();
  }
  currentImage[1] = randomImage();
  while(currentImage[0] === currentImage[1] || viewedImage.indexOf(currentImage[1]) !== -1) {
    currentImage[1] = randomImage();
  }
  currentImage[2] = randomImage();
  while(currentImage[0] === currentImage[2] || currentImage[1] === currentImage[2] || viewedImage.indexOf(currentImage[2]) !== -1) {
    currentImage[2] = randomImage();
  }
  for(var i = 0; i < 3; i++) {
    pics[i].src = allImages[currentImage[i]].path;
    pics[i].id = allImages[currentImage[i]].name;
    allImages[currentImage[i]].views += 1;
    viewedImage[i] = currentImage[i];
  }
}

function handleClick(event) {
  console.log(totalClicks, 'total clicks');
  if(totalClicks >= 24) {
    busMall.removeEventListener('click', handleClick);
    clicks();
  }
  if (event.target.id === 'images') {
    return alert('Please click on a image!');
  }
  totalClicks += 1;
  for(var i = 0; i < images.length; i++) {
    if(event.target.id === allImages[i].name) {
      allImages[i].votes += 1;
      console.log(`${event.target.id}: ${allImages[i].votes} votes, ${allImages[i].views} views.`);
    }
  }
  displayImages();
}

function clicks() {
  for(var i = 0; i < allImages.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${allImages[i].name}: ${allImages[i].votes} votes, ${allImages[i].views} views.`;
    numberOfClicks.appendChild(liEl);
  }
  createChart();
}

busMall.addEventListener('click', handleClick);
displayImages();

function createChart() {
  for(var i = 0; i < images.length; i++) {
    votes.push(allImages[i].votes);
    views.push(allImages[i].views);
  }

  var imageNumbers = [
    'Blue',
    'Green',
    'yellow',
    'Orange',
    'Red',
    'Black',
    'Blue',
    'Green',
    'Yellow',
    'Orange',
    'Red',
    'Black',
    'Blue',
    'Green',
    'Yellow',
    'Orange',
    'Red',
    'Black',
    'Blue',
    'Green',
    'Yellow',
    'Orange',
    'Red',
    'Black',
  ];

  var ctx = document.getElementById('myChart').getContext('2d');
  ctx.canvas.width = 400;
  ctx.canvas.height = 275;

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: images,
      datasets: [{
        label: 'Number of Votes',
        data: votes,
        borderWidth: 2,
        backgroundColor: imageNumbers,
      }, {
        label: 'Number of Views',
        data: views,
        borderWidth: 2,
        backgroundColor: imageNumbers,

      }]
    
    },
    options: {
      legend: {
        labels: {
          fontColor: 'darkcyan',
          fontSize: 18
        }
      },
      scales: {
        yAxes: [{
          ticks: {
          }
        }]
      }
    }
  });
}

function localData() {
  if (localStorage.userResults) {
    var itemArray = JSON.parse(localStorage.userResults);
    for (var i = 0; i < itemArray.length; i++) {
      nameArray.push(itemArray[i].imageName);
    }
  }
  else {
    itemArray = [];
    createItem();
  }
}
