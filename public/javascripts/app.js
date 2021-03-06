const circles = document.getElementById('circles');

const socket = io();

// listen to the server for the 'add-circle' event/message
socket.on('add-circle', function(data) {
  addCircle(data);
});

socket.on('clear-page', function() {
  circles.innerHTML = '';
});

let initials = '';

// Listen for clicks anywhere in the "section"
circles.addEventListener('click', function(evt) {
  socket.emit('add-circle', {
    initials,
    x: evt.clientX,
    y: evt.clientY,
    dia: randomBetween(20, 150),
    rgba: getRandomRGBA()
  });
});

document.querySelector('button').addEventListener('click', function() {
  socket.emit('clear-page');
});

do {
  initials = getInitials();
} while (initials.length < 2 || initials.length > 3);

function getInitials() {
  const input = prompt("Please enter your initials");
  return input ? input.toUpperCase() : '';
}

function addCircle({initials, x, y, dia, rgba}) {
  const el = document.createElement('div');
  el.style.left = x - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.top = y - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.width = el.style.height = dia + 'px';
  el.style.backgroundColor = rgba;
  el.style.fontSize = Math.floor(dia / 3) + 'px';
  el.style.color = 'white';
  el.style.textAlign = 'center';
  el.style.lineHeight = dia + 'px';
  el.innerHTML = initials;
  circles.appendChild(el);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRGBA() {
  return `rgba(${randomBetween(0, 255)}, ${randomBetween(0, 255)}, ${randomBetween(0, 255)}, ${randomBetween(2, 10) / 10})`;
}
