import * as d3_force from 'd3-force';

import { Node, Link } from 'src/interfaces';

let simulation;
let nodes: Node[];
let links: Link[];

const init = args => {
    nodes = args.nodes;
    links = args.links;
    simulation = d3_force.forceSimulation();
    simulation.nodes(nodes);
    simulation.stop();
    const charge = d3_force.forceManyBody();
    const link = d3_force.forceLink(links);
    link.id((node: Node) => `${node.oid}`);
    link.distance(40);
    link.strength(0.4);
    link.id((node: Node) => `${node.oid}`);
    const center = d3_force.forceCenter();
    const x = d3_force.forceX();
    const y = d3_force.forceY();
    simulation.force('charge', charge);
    simulation.force('link', link);
    simulation.force('center', center);
    simulation.force('x', x);
    simulation.force('y', y);
};

self.addEventListener('message', e => {
    switch (e.data.type) {
        case 'init': {
            init({
                nodes: e.data.nodes,
                links: e.data.links,
            });
            const start = Date.now();
            const limit = e.data.limit || e.data.nodes.length;
            const batch = 1;
            for (let i = 0; i <= limit; i++) {
                simulation.tick();
                if (i % batch === 0) {
                    self.postMessage(
                        {
                            type: 'tick',
                            nodes: nodes,
                            links: links,
                            tick: i,
                            time: Date.now() - start,
                        },
                        undefined,
                    );
                }
            }
            break;
        }
    }
});
