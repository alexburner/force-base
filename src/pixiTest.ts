import _ from 'underscore';
import * as PIXI from 'pixi.js';

import WorkerLoader from 'src/worker';
import { Edge, Node, Link } from 'src/interfaces';

const nodeWidth = 12;
const nodeHeight = nodeWidth;
const nodeRadius = nodeWidth / 2 - 2;
const linkWidth = 3;
const linkHeight = 3;
const linkThickness = 1;

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

const setSpritePosition = (sprite, node1, node2, scaleY): void => {
    const x1 = node1.x;
    const y1 = node1.y;
    const x2 = node2.x;
    const y2 = node2.y;
    // calculate new length & angle
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    const length = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    let angle = Math.acos(yDiff / length);
    if (x2 > x1) angle *= -1;
    // set new position
    sprite.anchor.set(0, linkHeight / 2);
    // sprite.pivot.set(0, linkHeight / 2);
    // sprite.x = x1;
    // sprite.y = y1;
    // sprite.scaleX = length / linkWidth;
    // sprite.scaleY = 1 + scaleY;
    // sprite.rotation = angle;
    sprite.setTransform(
        /* x */ x1,
        /* y */ y1,
        /* scaleX */ length / linkWidth,
        /* scaleY */ 1 + scaleY,
        /* rotation */ angle,
    );
};

const nodeTexture = PIXI.Texture.fromCanvas(getNodeCanvas());
const linkTexture = PIXI.Texture.fromCanvas(getLinkCanvas());

export default (
    canvasEl: HTMLCanvasElement,
    width: number,
    height: number,
    edges: Edge[],
) => {
    const nodeMap = {};
    const nodes = [];
    const links = [];

    _.each(edges, (edge: Edge) => {
        let node1: Node = nodeMap[edge.from];
        if (!node1) {
            node1 = {
                oid: edge.from,
                scale: 0,
                weight: 0,
                x: Math.random() * width,
                y: Math.random() * height,
            };
            nodeMap[edge.from] = node1;
            nodes.push(node1);
        }
        let node2: Node = nodeMap[edge.to];
        if (!node2) {
            node2 = {
                oid: edge.to,
                scale: 0,
                weight: 0,
                x: Math.random() * width,
                y: Math.random() * height,
            };
            nodeMap[edge.to] = node2;
            nodes.push(node2);
        }
        const link: Link = {
            scale: 0,
            source: edge.from,
            target: edge.to,
            weight: 0,
        };
        _.each(edge.annotations, annotation => {
            link.weight += annotation.weight;
            node2.weight += annotation.weight;
        });
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

    const nodeWeightRange = maxNodeWeight - minNodeWeight;
    const linkWeightRange = maxLinkWeight - minLinkWeight;

    _.each(nodes, node => {
        const weight = node.weight;
        const value = weight - minNodeWeight;
        const scale = value / nodeWeightRange;
        node.scale = scale;
    });

    _.each(links, link => {
        const weight = link.weight;
        const value = weight - minLinkWeight;
        const scale = value / linkWeightRange;
        link.scale = scale;
    });

    const app = new PIXI.Application({ width, height, view: canvasEl });

    const container = new PIXI.Container();
    app.stage.addChild(container);

    const nodeSprites = _.times(nodes.length, () => {
        const sprite = new PIXI.Sprite(nodeTexture);
        container.addChild(sprite);
        return sprite;
    });

    const linkSprites = _.times(links.length, () => {
        const sprite = new PIXI.Sprite(linkTexture);
        container.addChild(sprite);
        return sprite;
    });

    container.x += width / 2;
    container.y += height / 2;

    const update = (nodes: Node[], links: Link[]) => {
        _.each(nodes, (node, i) => {
            const sprite = nodeSprites[i];
            sprite.scale.x = 1 + node.scale;
            sprite.scale.y = 1 + node.scale;
            sprite.x = node.x;
            sprite.y = node.y;
        });
        _.each(links, (link, i) => {
            const sprite = linkSprites[i];
            const node1 = _.isNumber(link.source)
                ? nodeMap[link.source]
                : link.source;
            const node2 = _.isNumber(link.target)
                ? nodeMap[link.target]
                : link.target;
            setSpritePosition(sprite, node1, node2, link.scale);
        });
    };

    const worker = new WorkerLoader();

    worker.addEventListener('message', e => {
        switch (e.data.type) {
            case 'tick': {
                window.requestAnimationFrame(() =>
                    update(e.data.nodes, e.data.links),
                );
                break;
            }
        }
    });

    worker.postMessage({
        type: 'init',
        limit: 1000,
        nodes,
        links,
    });
};
