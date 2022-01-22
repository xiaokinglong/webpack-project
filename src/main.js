

import imgsrc from './assets/img/WechatIMG18.png';

import axios from 'axios';
import './style/index.css';

console.log(axios)
const img = document.createElement('img');
let div = document.createElement('img');
div.innerText = '=> ha';
img.src = imgsrc;
document.body.appendChild(img);
document.body.appendChild(div);
console.log('hello world');
async function demo() {
  const result = await axios.get('www.baidu.com');
  console.log({
    result
  })
}
demo();
