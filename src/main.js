

import imgsrc from './assets/img/WechatIMG18.png';

import './style/index.css';

const img = document.createElement('img');
let div = document.createElement('img');
div.innerText = '=> ha';
img.src = imgsrc;
document.body.appendChild(img);
document.body.appendChild(div);
console.log('hello world');