import _ from 'underscore';

import Renderer from 'src/PixiMap/Renderer';
import WorkerLoader from 'worker-loader!src/PixiMap/worker';
import { Edge, Node, Link, Opts } from 'src/PixiMap/interfaces';
import { makeNode, makeLink, makeScales } from 'src/PixiMap/util';

export default class Module {
    private isDestroyed: boolean;
    private renderer: Renderer;
    private worker: Worker;
    private nodes: Node[];
    private links: Link[];
    private nodesById: { [id: number]: Node };
    private linksById: { [id: string]: Link };
    private width: number;
    private height: number;

    constructor(width: number, height: number, canvas: HTMLCanvasElement) {
        this.isDestroyed = false;
        this.width = width;
        this.height = height;
        this.nodes = [];
        this.links = [];
        this.nodesById = {};
        this.linksById = {};
        this.renderer = new Renderer(width, height, canvas);
        this.worker = new WorkerLoader();
        this.worker.addEventListener('message', e => {
            if (this.isDestroyed) return;
            switch (e.data.type) {
                case 'tick': {
                    this.nodes = e.data.nodes;
                    this.links = e.data.links;
                    this.nodesById = e.data.nodesById;
                    this.linksById = e.data.linksById;
                    this.renderer.tick(this.nodes, this.links, e.data.tick);
                    break;
                }
            }
        });
    }

    update(edges: Edge[]) {
        // Module & renderer data changes are sync
        // but worker is async running in background with old data
        // and renderer may have its tick() called with old nodes/links
        // that were just pulled out in its remove() function
        //
        // So, we halt worker before updating
        // and resume it once we're done
        const handleMessage = (e: MessageEvent) => {
            if (this.isDestroyed) return;
            switch (e.data.type) {
                case 'halt': {
                    this.handleEdges(edges);
                    this.renderer.update(this.nodes, this.links);
                    this.renderer.run();
                    this.worker.removeEventListener('message', handleMessage);
                    this.worker.postMessage({
                        type: 'run',
                        limit: 200,
                        nodes: this.nodes,
                        links: this.links,
                        nodesById: this.nodesById,
                        linksById: this.linksById,
                    });
                    break;
                }
            }
        };
        this.worker.addEventListener('message', handleMessage);
        this.worker.postMessage({ type: 'halt' });
    }

    resize(width: number, height: number) {
        this.renderer.resize(width, height);
    }

    config(opts: Opts) {
        if (opts.colorKey) {
            this.renderer.setColors(opts.colorKey);
            this.renderer.update(this.nodes, this.links);
        }
    }

    destroy() {
        this.isDestroyed = true;
        this.worker.postMessage({ type: 'destroy' });
        this.renderer.destroy();
    }

    private handleEdges(edges: Edge[]) {
        // Assume all current node/links removed
        // (unless proven otherwise, in next loop)
        _.each(this.nodes, node => (node.status = 'removed'));
        _.each(this.links, link => (link.status = 'removed'));

        // Use edge data to update node/link collections
        _.each(edges, (edge: Edge) => {
            if (!edge.weight) return;

            let fromNode: Node = this.nodesById[edge.from];
            if (!fromNode) {
                fromNode = makeNode(edge.from, this.width, this.height);
                this.nodesById[fromNode.id] = fromNode;
                this.nodes.push(fromNode);
            } else {
                fromNode.status = 'updated';
            }

            let toNode: Node = this.nodesById[edge.to];
            if (!toNode) {
                toNode = makeNode(edge.to, this.width, this.height);
                this.nodesById[toNode.id] = toNode;
                this.nodes.push(toNode);
            } else {
                toNode.status = 'updated';
            }

            let link: Link = this.linksById[`${edge.from},${edge.to}`];
            if (!link) {
                link = makeLink(edge, fromNode, toNode);
                fromNode.weight += edge.weight;
                toNode.weight += edge.weight;
                this.linksById[link.id] = link;
                this.links.push(link);
            } else {
                link.status = 'updated';
            }
        });

        // Give renderer a chance to handle removed nodes/links
        this.renderer.remove(this.nodes, this.links);

        // Clean out removed nodes/links from collections
        this.nodes = _.reject(this.nodes, node => node.status === 'removed');
        this.links = _.reject(this.links, link => link.status === 'removed');
        _.each(this.nodesById, (node: Node) => {
            if (node.status === 'removed') delete this.nodesById[node.id];
        });
        _.each(this.linksById, (link: Link) => {
            if (link.status === 'removed') delete this.linksById[link.id];
        });

        // Now that nodes/links may have new weights, regenerate their scales
        const { nodeScale, linkScale } = makeScales(this.nodes, this.links);
        _.each(this.nodes, node => (node.scale = nodeScale(node.weight)));
        _.each(this.links, link => (link.scale = linkScale(link.weight)));
    }
}
