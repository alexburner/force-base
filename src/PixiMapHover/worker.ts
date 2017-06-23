import * as d3_force from 'd3-force'

import { Node, Link, NodesById, LinksById } from 'src/PixiMapHover/interfaces'

const TICK_FLOOR = 10 // Number of ticks to withold from rendering

// Global state
let simulation
let globalLoopSignature

// Initialize on file load
// ( new WorkerLoader() )
{
    simulation = d3_force.forceSimulation()
    simulation.nodes([])
    simulation.stop()
    const link = d3_force.forceLink([])
    const charge = d3_force.forceManyBody()
    const center = d3_force.forceCenter()
    const collide = d3_force.forceCollide()
    const x = d3_force.forceX()
    const y = d3_force.forceY()
    link.id((node: Node) => `${node.id}`)
    link.distance(40) // magic #
    link.strength(0.4) // magic #
    charge.strength(-30) // magic #
    collide.radius((node: Node) => node.scale * 7) // magic #
    simulation.force('link', link)
    simulation.force('charge', charge)
    simulation.force('center', center)
    simulation.force('collide', collide)
    simulation.force('x', x)
    simulation.force('y', y)
}

// Handle browser messages
self.addEventListener('message', e => {
    switch (e.data.type) {
        case 'run': {
            // Run simulation ticks on given nodes/links
            const nodes = e.data.nodes
            const links = e.data.links
            const nodesById = e.data.nodesById
            const linksById = e.data.linksById
            const limit = e.data.limit || e.data.nodes.length
            const batch = e.data.batch || 1
            run(nodes, links, nodesById, linksById, limit, batch)
            break
        }
        case 'halt': {
            // Halt simulation ticks
            halt()
            break
        }
        case 'destroy': {
            // Destroy simulation
            destroy()
            break
        }
    }
})

const run = (
    nodes: Node[],
    links: Link[],
    nodesById: NodesById,
    linksById: LinksById,
    limit: number,
    batch: number,
) => {
    globalLoopSignature = {}
    // globally store the unique reference value of a new object
    // so our loop can track whether it's fallen out of sync
    // by checking against a version captured locally
    const localLoopSignature = globalLoopSignature

    // Update simulation nodes/links
    simulation.nodes(nodes)
    simulation.force('link').links(links)
    simulation.alpha(1) // re-heat
    simulation.stop()

    // Track tick timing
    const start = Date.now()

    // Run simulation ticks
    let i = 0
    const tickLoop = () => {
        // Abort if our loop is no longer relevant
        if (localLoopSignature !== globalLoopSignature) return

        // Halt if tick limit hit, or simulation has cooled off
        if (i === limit - 1 || simulation.alpha() < simulation.alphaMin()) {
            halt()
            return
        }

        // Tick simulation
        simulation.tick()

        // Send batched updates (but only beyond tick minimum)
        if (i % batch === 0 && i > TICK_FLOOR) {
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
            )
        }

        i++
        setTimeout(tickLoop, 0) // Async loop to allow interrupt
    }

    // Begin
    tickLoop()
}

const halt = () => {
    // Stop any current loop
    globalLoopSignature = null
    // Inform listeners that we're stopping
    self.postMessage({ type: 'halt' }, undefined)
}

const destroy = () => {
    halt()
    // Dismantle simulation
    simulation.nodes([])
    simulation.force('link', null)
    simulation.force('charge', null)
    simulation.force('center', null)
    simulation.force('x', null)
    simulation.force('y', null)
    // Remove reference
    simulation = null
}
