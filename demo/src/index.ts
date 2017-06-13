import data from 'demo/src/data';
import pixiTest from 'src/pixiTest';

const width = window.innerWidth;
const height = window.innerHeight;

const canvasEl = document.createElement('canvas');

canvasEl.width = width;
canvasEl.height = height;
canvasEl.style.display = 'block';

document.body.appendChild(canvasEl);
document.body.style.background = '#333';
document.body.style.margin = '0';
document.body.style.padding = '0';

pixiTest(canvasEl, width, height, data.edges);
