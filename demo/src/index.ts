import _ from 'underscore';

import ActivityMap from 'src/ActivityMap';
import { Node, Link } from 'src/ActivityMap';

const width = window.innerWidth;
const height = window.innerHeight;

const halfWidth = width / 2;
const halfHeight = height / 2;

const hash = window.location.hash.length
    ? Number(window.location.hash.slice(1))
    : NaN
;

const count = isNaN(hash) ? 2000 : hash;

const nodes:Node[] = _.times(count, (index):Node => ({
    index,
    x: Math.random() * width - halfWidth,
    y: Math.random() * height - halfHeight,
}));

const links:Link[] = _.times(count - 1, ():Link => ({
    source: Math.floor(Math.random() * count),
    target: Math.floor(Math.random() * count),
}));

const canvasEl:HTMLCanvasElement = document.createElement('canvas');

canvasEl.width = width;
canvasEl.height = height;
canvasEl.style.display = 'block';

document.body.appendChild(canvasEl);
document.body.style.margin = '0';
document.body.style.padding = '0';

new ActivityMap(
    canvasEl,
    { nodes, links },
    { width, height },
);
