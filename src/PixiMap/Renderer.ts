import _ from 'underscore';
import * as d3_scale from 'd3-scale';
import * as PIXI from 'pixi.js';

import { D3Colors } from 'src/PixiMap/constants';
import { Node, Link } from 'src/PixiMap/interfaces';
import { colorToHex, makeCanvas } from 'src/PixiMap/util';

export default class Renderer {
    private isRunning: boolean;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private stage: PIXI.Container;
    private nodeLayer: PIXI.Container;
    private linkLayer: PIXI.Container;
    private nodeTexture: PIXI.Texture;
    private linkTexture: PIXI.Texture;
    private nodeSpritesById: { [id: number]: PIXI.Sprite };
    private linkSpritesById: { [id: number]: PIXI.Sprite };
    private colorScale: d3_scale.ScaleSequential<any>;

    constructor(width: number, height: number, canvas: HTMLCanvasElement) {
        this.isRunning = false;
        this.nodeTexture = PIXI.Texture.fromCanvas(makeNodeCanvas());
        this.linkTexture = PIXI.Texture.fromCanvas(makeLinkCanvas());
        this.nodeSpritesById = {};
        this.linkSpritesById = {};
        this.setColors('Magma');
        this.renderer = PIXI.autoDetectRenderer(width, height, {
            antialias: true,
            backgroundColor: 0x333333,
            view: canvas,
        });
        this.stage = new PIXI.Container();
        this.stage.width = width;
        this.stage.height = height;
        this.stage.x += width / 2;
        this.stage.y += height / 2;
        this.stage.scale.x = 0.7; // magic #
        this.stage.scale.y = 0.7; // magic #
        this.stage.alpha = 0;
        this.nodeLayer = new PIXI.Container();
        this.linkLayer = new PIXI.Container();
        this.stage.addChild(this.linkLayer);
        this.stage.addChild(this.nodeLayer);
    }

    setColors(colorKey: keyof typeof D3Colors) {
        const color = D3Colors[colorKey];
        if (!color) return;
        this.colorScale = d3_scale
            .scaleSequential(color.interpolator)
            .domain(color.domain as [number, number]);
    }

    remove(nodes: Node[], links: Link[]) {
        // Clean out sprites for any removed nodes/links
        _.each(nodes, node => {
            if (node.status !== 'removed') return;
            const sprite = this.nodeSpritesById[node.id];
            if (sprite) {
                delete this.nodeSpritesById[node.id];
                this.nodeLayer.removeChild(sprite);
                setTimeout(() => sprite.destroy(), 0);
            }
        });
        _.each(links, link => {
            if (link.status !== 'removed') return;
            const sprite = this.linkSpritesById[link.id];
            if (sprite) {
                delete this.linkSpritesById[link.id];
                this.linkLayer.removeChild(sprite);
                setTimeout(() => sprite.destroy(), 0);
            }
        });
    }

    update(nodes: Node[], links: Link[]) {
        // Create/update node sprites appearance
        _.each(nodes, node => {
            let sprite = this.nodeSpritesById[node.id];
            if (!sprite) {
                sprite = new PIXI.Sprite(this.nodeTexture);
                this.nodeSpritesById[node.id] = sprite;
                this.nodeLayer.addChild(sprite);
            }
            sprite.tint = colorToHex(this.colorScale(node.scale));
            sprite.scale.x = node.scale * 0.8; // magic #
            sprite.scale.y = node.scale * 0.8; // magic #
            sprite.alpha = node.scale + 0.7; // magic #
        });

        // Create/update link sprite appearance
        _.each(links, link => {
            let sprite = this.linkSpritesById[link.id];
            if (!sprite) {
                sprite = new PIXI.Sprite(this.linkTexture);
                this.linkSpritesById[link.id] = sprite;
                this.linkLayer.addChild(sprite);
            }
            sprite.tint = colorToHex(this.colorScale(link.scale));
            sprite.scale.y = link.scale * 1.2; // magic #
            sprite.alpha = link.scale;
        });
    }

    tick(nodes: Node[], links: Link[]) {
        // Update node sprite positions
        _.each(nodes, node => {
            if (node.status === 'removed') return;
            const sprite = this.nodeSpritesById[node.id];
            sprite.x = node.x - sprite.width / 2;
            sprite.y = node.y - sprite.height / 2;
        });

        // Update link sprite positions
        _.each(links, link => {
            if (link.status === 'removed') return;
            const sprite = this.linkSpritesById[link.id];
            const node1 = link.source;
            const node2 = link.target;
            setLinkPosition(sprite, node1, node2);
        });

        // Increment stage opacity if not full
        if (this.stage.alpha < 1) this.stage.alpha += 0.01;
    }

    renderLoop() {
        if (!this.isRunning) return;
        window.requestAnimationFrame(() => {
            this.renderer.render(this.stage);
            this.renderLoop();
        });
    }

    run() {
        this.isRunning = true;
        this.renderLoop();
    }

    halt() {
        this.isRunning = false;
    }

    resize(width: number, height: number) {
        this.renderer.resize(width, height);
    }

    destroy() {
        this.halt();
        this.stage.destroy({
            children: true,
            texture: true,
            baseTexture: true,
        });
        this.renderer.destroy();
    }
}

const nodeWidth = 32; // magic # (must be power of 2)
const nodeHeight = nodeWidth;
const nodeRadius = nodeWidth / 2 - 4;
const linkWidth = 8; // magic # (must be power of 2)
const linkHeight = linkWidth;
const linkThickness = 2;

const makeNodeCanvas = (): HTMLCanvasElement => {
    const x = nodeWidth / 2;
    const y = nodeHeight / 2;
    const canvas = makeCanvas(nodeWidth, nodeHeight);
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

const makeLinkCanvas = (): HTMLCanvasElement => {
    const x1 = 0;
    const x2 = linkWidth;
    const y1 = linkHeight / 2 - linkThickness / 2;
    const y2 = linkHeight / 2 - linkThickness / 2;
    const canvas = makeCanvas(linkWidth, linkHeight);
    const context = canvas.context;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = linkThickness;
    context.lineTo(x2, y2);
    context.strokeStyle = 'rgba(255, 255, 255, 1)';
    context.stroke();
    return canvas.element;
};

const setLinkPosition = (sprite, node1, node2) => {
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
