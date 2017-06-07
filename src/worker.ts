import * as d3_force from 'd3-force';

let simulation;
let nodes;
let links;

const init = (args) => {
    nodes = args.nodes;
    links = args.links;
    simulation = d3_force.forceSimulation();
    simulation.nodes(nodes);
    simulation.stop();
    const charge = d3_force.forceManyBody();
    const link = d3_force.forceLink(links);
    link.distance(30);
    link.strength(1);
    const x = d3_force.forceX();
    const y = d3_force.forceY();
    simulation.force('charge', charge);
    simulation.force('link', link);
    simulation.force('x', x);
    simulation.force('y', y);
};

self.addEventListener('message', (e) => {
    switch (e.data.type) {
        case 'init': {
            init({
                nodes: e.data.nodes,
                links: e.data.links,
            });
            const batch = 10;
            const limit = e.data.limit || e.data.nodes.length;
            const start = Date.now();
            for (let i = 0; i <= limit; i++) {
                simulation.tick();
                if (i % batch === 0) {
                    const delta = Date.now() - start;
                    self.postMessage({
                        type: 'tick',
                        nodes: nodes,
                        links: links,
                        tick: i,
                        time: delta,
                    }, undefined);
                }
            }
            break;
        }
    }
});
