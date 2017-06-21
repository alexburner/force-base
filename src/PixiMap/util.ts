import _ from 'underscore';
import * as d3_scale from 'd3-scale';

import { Edge, Node, Link } from 'src/PixiMap/interfaces';

// Create a new node object
export const makeNode = (object_id: number): Node => ({
    status: 'added',
    id: object_id,
    scale: 0,
    weight: 0,
    x: object_id % 3000 - 3000 / 2,
    y: object_id % 3000 - 3000 / 2,
});

// Create a new link object
export const makeLink = (edge: Edge, fromNode: Node, toNode: Node): Link => ({
    status: 'added',
    id: `${edge.from},${edge.to}`,
    scale: 0,
    source: fromNode,
    target: toNode,
    weight: edge.weight,
});

// Use nodes/links to generate min/max weight scales
export const makeScales = (
    nodes: Node[],
    links: Link[],
): {
    nodeScale: d3_scale.ScaleLogarithmic<number, number>;
    linkScale: d3_scale.ScaleLogarithmic<number, number>;
} => {
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
        .range([0, 1]);

    const linkScale = d3_scale
        .scaleLog()
        .domain([minLinkWeight, maxLinkWeight])
        .range([0, 1]);

    return { nodeScale, linkScale };
};

// Convert hex or rgb string to hex number
export const colorToHex = (color: string): number => {
    let hex: string;
    if (!color || !color.length) {
        // null value
        hex = '0xFFFFFF';
    } else if (color.indexOf('#') === 0) {
        // hex string
        hex = '0x' + color.split('#')[1];
    } else {
        // rgb string
        const a = color.split('(')[1].split(')')[0].split(',');
        const b = a.map(x => {
            x = parseInt(x).toString(16);
            return x.length === 1 ? '0' + x : x;
        });
        hex = '0x' + b.join('');
    }
    return parseInt(hex, 16);
};

// Create a canvas element
export const makeCanvas = (
    width: number,
    height: number,
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
