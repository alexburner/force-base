import _ from 'underscore';
import * as d3_scale from 'd3-scale';
import * as PIXI from 'pixi.js';

import WorkerLoader from 'worker-loader!src/PixiMap/worker';
import { Edge, Node, Link } from 'src/PixiMap/interfaces';

const nodeWidth = 22;
const nodeHeight = nodeWidth;
const nodeRadius = nodeWidth / 2 - 4;
const linkWidth = 7;
const linkHeight = 7;
const linkThickness = 1;

const colorToHex = (color: string): string => {
    if (!color || !color.length) return '0xFFFFFF';
    if (color.indexOf('#') === 0) return '0x' + color.split('#')[1];
    const a = color.split('(')[1].split(')')[0].split(',');
    const b = a.map(x => {
        x = parseInt(x).toString(16);
        return x.length === 1 ? '0' + x : x;
    });
    return '0x' + b.join('');
};

const getCanvas = (
    width,
    height,
): {
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
} => {
    const element = document.createElement('canvas');
    const context = element.getContext('2d');
    element.width = width;
    element.height = height;
    return { element, context };
};

const getNodeCanvas = (): HTMLCanvasElement => {
    const x = nodeWidth / 2;
    const y = nodeHeight / 2;
    const canvas = getCanvas(nodeWidth, nodeHeight);
    const context = canvas.context;
    context.beginPath();
    context.moveTo(x + 4, y);
    context.arc(x, y, nodeRadius, 0, 2 * Math.PI);
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    context.fill();
    context.strokeStyle = 'rgba(255, 255, 255, 1)';
    context.stroke();
    return canvas.element;
};

const getLinkCanvas = (): HTMLCanvasElement => {
    const x1 = 0;
    const x2 = linkWidth;
    const y1 = linkHeight / 2 - linkThickness / 2;
    const y2 = linkHeight / 2 - linkThickness / 2;
    const canvas = getCanvas(linkWidth, linkHeight);
    const context = canvas.context;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = linkThickness;
    context.lineTo(x2, y2);
    context.strokeStyle = 'rgba(255, 255, 255, 1)';
    context.stroke();
    return canvas.element;
};

const setSpritePosition = (sprite, node1, node2): void => {
    const x1 = node1.x;
    const y1 = node1.y;
    const x2 = node2.x;
    const y2 = node2.y;
    // calculate new length & angle
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    const length = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    let radians = Math.acos(yDiff / length);
    if (x2 > x1) radians *= -1;
    // set new position
    sprite.x = x1;
    sprite.y = y1;
    sprite.scale.x = length / linkWidth;
    sprite.pivot.x = 0;
    sprite.pivot.y = linkHeight / 2;
    sprite.rotation = radians + Math.PI / 2;
};

const nodeTexture = PIXI.Texture.fromCanvas(getNodeCanvas());
const linkTexture = PIXI.Texture.fromCanvas(getLinkCanvas());

export default (
    canvasEl: HTMLCanvasElement,
    width: number,
    height: number,
    edges: Edge[],
) => {
    const nodeMap: { [oid: number]: Node } = {};
    const nodes: Node[] = [];
    const links: Link[] = [];

    _.each(edges, (edge: Edge) => {
        if (!edge.weight) return;

        let nodeFrom: Node = nodeMap[edge.from];
        if (!nodeFrom) {
            nodeFrom = {
                oid: edge.from,
                weight: 0,
                x: edge.from % width - width / 2,
                y: edge.from % height - height / 2,
            };
            nodeMap[edge.from] = nodeFrom;
            nodes.push(nodeFrom);
        }

        let nodeTo: Node = nodeMap[edge.to];
        if (!nodeTo) {
            nodeTo = {
                oid: edge.to,
                weight: 0,
                x: edge.to % width - width / 2,
                y: edge.to % height - height / 2,
            };
            nodeMap[edge.to] = nodeTo;
            nodes.push(nodeTo);
        }

        // weight nodes by edges
        nodeFrom.weight += edge.weight;
        nodeTo.weight += edge.weight;

        const link: Link = {
            source: edge.from,
            target: edge.to,
            weight: edge.weight,
        };
        links.push(link);
    });

    let maxNodeWeight = -Infinity;
    let minNodeWeight = Infinity;
    _.each(nodes, node => {
        maxNodeWeight = Math.max(maxNodeWeight, node.weight);
        minNodeWeight = Math.min(minNodeWeight, node.weight);
    });

    let maxLinkWeight = -Infinity;
    let minLinkWeight = Infinity;
    _.each(links, link => {
        maxLinkWeight = Math.max(maxLinkWeight, link.weight);
        minLinkWeight = Math.min(minLinkWeight, link.weight);
    });

    const nodeScale = d3_scale
        .scaleLog()
        .domain([minNodeWeight, maxNodeWeight])
        .range([1 / 5, 1]);

    const linkScale = d3_scale
        .scaleLog()
        .domain([minLinkWeight, maxLinkWeight])
        .range([1 / 5, 1]);

    const colorScale = d3_scale
        .scaleSequential(d3_scale.interpolateViridis)
        .domain([0, 1]);

    const app = new PIXI.Application({
        width,
        height,
        backgroundColor: 0x333333,
        view: canvasEl,
    });

    const container = new PIXI.Container();
    container.width = width;
    container.height = height;
    container.x += width / 2;
    container.y += height / 2;
    container.scale.x = 0.9;
    container.scale.y = 0.9;
    app.stage.addChild(container);

    const linkSprites = _.map(links, link => {
        const sprite = new PIXI.Sprite(linkTexture);
        const scale = linkScale(link.weight);
        sprite.tint = colorToHex(colorScale(scale));
        sprite.scale.y = 1.2 * scale;
        sprite.alpha = scale;
        container.addChild(sprite);
        return sprite;
    });

    const nodeSprites = _.map(nodes, node => {
        const sprite = new PIXI.Sprite(nodeTexture);
        const scale = nodeScale(node.weight);
        sprite.tint = colorToHex(colorScale(scale));
        sprite.scale.x = scale;
        sprite.scale.y = scale;
        sprite.alpha = 0.6 + scale;
        container.addChild(sprite);
        return sprite;
    });

    const update = (nodes: Node[], links: Link[]) => {
        _.each(nodes, (node, i) => {
            const sprite = nodeSprites[i];
            sprite.x = node.x - sprite.width / 2;
            sprite.y = node.y - sprite.height / 2;
        });
        _.each(links, (link, i) => {
            const sprite = linkSprites[i];
            const node1 = _.isNumber(link.source)
                ? nodeMap[link.source]
                : link.source;
            const node2 = _.isNumber(link.target)
                ? nodeMap[link.target]
                : link.target;
            setSpritePosition(sprite, node1, node2);
        });
    };

    update(nodes, links);

    const worker = new WorkerLoader();

    let alpha = 0;
    container.alpha = alpha;

    worker.addEventListener('message', e => {
        switch (e.data.type) {
            case 'tick': {
                if (e.data.tick < 10) {
                    alpha += 0.01;
                } else if (e.data.tick < 100) {
                    alpha += 0.01;
                    container.alpha = alpha;
                }
                window.requestAnimationFrame(() =>
                    update(e.data.nodes, e.data.links),
                );
                break;
            }
        }
    });

    worker.postMessage({
        type: 'init',
        limit: 200,
        nodes,
        links,
    });
};
