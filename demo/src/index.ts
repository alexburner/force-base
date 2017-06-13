import _ from 'underscore';

import data from 'demo/src/data';
import pixiTest from 'src/pixiTest';

const width = window.innerWidth;
const height = window.innerHeight;

const canvasEl = document.createElement('canvas');

canvasEl.width = width;
canvasEl.height = height;
canvasEl.style.display = 'block';

document.body.appendChild(canvasEl);
document.body.style.margin = '0';
document.body.style.padding = '0';

let edges = [];
for (let i = 0; i < 3; i++) {
    const factor = i + 1;
    edges = edges.concat(
        _.map(data.result.edges, edge => {
            return {
                ...edge,
                from: edge.from * factor,
                to: edge.to * factor,
            };
        }),
    );
}

pixiTest(canvasEl, width, height, edges);
