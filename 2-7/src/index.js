require('./index.scss')
const happy = require('./happy.jpg')
const myLogo = require('./logo.png')

console.log('hello webpack!')

function component() {
  var element = document.createElement('div');
  
  var fontDiv = document.createElement('div');
  fontDiv.innerText = 'This line of text uses fonts.';
  fontDiv.classList.add('font-div');
  element.appendChild(fontDiv);

  var tempDiv = document.createElement('div');
  tempDiv.innerText = 'Use Webpack to handle images.';
  element.appendChild(tempDiv);

  var img = new Image();
  img.src = happy;
  element.appendChild(img);

  var logoImg = new Image();
  logoImg.src = myLogo;
  element.appendChild(logoImg);
  return element;
}

document.body.appendChild(component());