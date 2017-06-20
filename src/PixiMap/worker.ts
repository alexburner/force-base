import * as d3_force from 'd3-force';

import { Node, Link } from 'src/PixiMap/interfaces';

let simulation;
let loopSignature;

// Initialize on file load ( new WorkerLoader() )
{
    simulation = d3_force.forceSimulation();
    simulation.nodes([]);
    const link = d3_force.forceLink([]);
    const charge = d3_force.forceManyBody();
    const center = d3_force.forceCenter();
    const collide = d3_force.forceCollide();
    const x = d3_force.forceX();
    const y = d3_force.forceY();
    link.id((node: Node) => `${node.id}`);
    link.distance(40); // magic #
    link.strength(0.4); // magic #
    charge.strength(-30); // magic #
    collide.radius((node: Node) => node.scale * 6); // magic #
    simulation.force('link', link);
    simulation.force('charge', charge);
    simulation.force('center', center);
    simulation.force('collide', collide);
    simulation.force('x', x);
    simulation.force('y', y);
    simulation.stop();
}

const run = (
    nodes: Node[],
    links: Link[],
    nodesById: { [id: number]: Node },
    linksById: { [id: string]: Link },
    limit: number,
    batch: number,
) => {
    // Use object reference value to track if our loop is still relevant
    loopSignature = {};
    const localLoopSignature = loopSignature;
    // Update simulation nodes/links
    simulation.nodes(nodes);
    simulation.force('link').links(links);
    simulation.alpha(1); // re-heat
    simulation.stop();
    // Track tick timing
    const start = Date.now();
    // Run simulation ticks
    let i = 0;
    const tick = () => {
        // Abort if we're no longer relevant
        if (localLoopSignature !== loopSignature) return;
        // Halt if simulation is done
        if (i === limit - 1 || simulation.alpha() < simulation.alphaMin()) {
            halt();
            return;
        }
        // Tick simulation
        simulation.tick();
        // Send batched updates
        if (i % batch === 0) {
            self.postMessage(
                {
                    type: 'tick',
                    nodes: nodes,
                    links: links,
                    nodesById: nodesById,
                    linksById: linksById,
                    tick: i,
                    time: Date.now() - start,
                },
                undefined,
            );
        }
        i++;
        // Async loop to allow interrupt
        setTimeout(tick, 0);
    };
    tick();
};

const halt = () => {
    // Stop any current loop
    loopSignature = null;
    // Inform subscribers we're stopping
    self.postMessage({ type: 'halt' }, undefined);
};

const destroy = () => {
    halt();
    // Dismantle simulation
    simulation.nodes([]);
    simulation.force('link', null);
    simulation.force('charge', null);
    simulation.force('center', null);
    simulation.force('x', null);
    simulation.force('y', null);
    // Remove reference
    simulation = null;
};

self.addEventListener('message', e => {
    switch (e.data.type) {
        case 'run': {
            const nodes = e.data.nodes;
            const links = e.data.links;
            const nodesById = e.data.nodesById;
            const linksById = e.data.linksById;
            const limit = e.data.limit || e.data.nodes.length;
            const batch = e.data.batch || 1;
            run(nodes, links, nodesById, linksById, limit, batch);
            break;
        }
        case 'halt': {
            halt();
            break;
        }
        case 'destroy': {
            destroy();
            break;
        }
    }
});
