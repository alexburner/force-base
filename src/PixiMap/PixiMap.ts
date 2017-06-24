import _ from 'underscore'

import Drawing from 'src/PixiMap/Drawing'
import WorkerLoader from 'worker-loader!src/PixiMap/worker'
import {
    Edge,
    Node,
    Link,
    NodesById,
    LinksById,
    Opts,
} from 'src/PixiMap/interfaces'
import { makeNode, makeLink, makeScales } from 'src/PixiMap/util'

export default class PixiMap {
    private drawing: Drawing
    private worker: Worker
    private nodes: Node[]
    private links: Link[]
    private nodesById: NodesById
    private linksById: LinksById
    private width: number
    private height: number
    private isDestroyed: boolean

    constructor(width: number, height: number, canvas: HTMLCanvasElement) {
        this.isDestroyed = false
        this.width = width
        this.height = height
        this.nodes = []
        this.links = []
        this.nodesById = {}
        this.linksById = {}
        this.drawing = new Drawing(width, height, canvas)
        this.drawing.run() // TODO: halt?
        this.worker = new WorkerLoader()
        this.worker.addEventListener('message', e => {
            if (this.isDestroyed) return
            switch (e.data.type) {
                case 'tick': {
                    // save new data for later updates
                    this.nodes = e.data.nodes
                    this.links = e.data.links
                    this.nodesById = e.data.nodesById
                    this.linksById = e.data.linksById
                    // pass ticked nodes/links to drawing
                    this.drawing.tick(e.data.nodes, e.data.links)
                    break
                }
            }
        })
    }

    update(edges: Edge[]) {
        // Module & renderer data changes are sync
        // but worker is async, running in background with old data
        // and could send 'tick' message with outdated nodes/links
        //
        // So, halt worker before updating
        // and resume it once we're done
        // with a one-time 'halt' listener
        const haltListener = (e: MessageEvent) => {
            if (this.isDestroyed) return
            switch (e.data.type) {
                case 'halt': {
                    this.handleEdges(edges)
                    this.drawing.update(this.nodes, this.links)
                    this.worker.removeEventListener('message', haltListener)
                    this.worker.postMessage({
                        type: 'run',
                        limit: 200,
                        nodes: this.nodes,
                        links: this.links,
                        nodesById: this.nodesById,
                        linksById: this.linksById,
                    })
                    break
                }
            }
        }
        this.worker.addEventListener('message', haltListener)
        this.worker.postMessage({ type: 'halt' })
    }

    resize(width: number, height: number) {
        this.drawing.resize(width, height)
    }

    config(opts: Opts) {
        if (opts.colorKey) {
            this.drawing.setColor(opts.colorKey)
            this.drawing.update(this.nodes, this.links)
        }
    }

    destroy() {
        this.isDestroyed = true
        this.worker.postMessage({ type: 'destroy' })
        this.drawing.destroy()
    }

    private handleEdges(edges: Edge[]) {
        // Assume all current node/links removed
        // (unless proven otherwise, in next loop)
        _.each(this.nodes, node => (node.status = 'removed'))
        _.each(this.links, link => (link.status = 'removed'))

        // Use edge data to update node/link collections
        _.each(edges, (edge: Edge) => {
            if (!edge.weight) return

            // Source node
            let fromNode: Node = this.nodesById[edge.from]
            if (!fromNode) {
                fromNode = makeNode(edge.from)
                this.nodesById[fromNode.id] = fromNode
                this.nodes.push(fromNode)
            } else {
                fromNode.status = 'updated'
            }

            // Target node
            let toNode: Node = this.nodesById[edge.to]
            if (!toNode) {
                toNode = makeNode(edge.to)
                this.nodesById[toNode.id] = toNode
                this.nodes.push(toNode)
            } else {
                toNode.status = 'updated'
            }

            // Link
            let link: Link = this.linksById[`${edge.from},${edge.to}`]
            if (!link) {
                link = makeLink(edge, fromNode, toNode)
                fromNode.weight += edge.weight
                toNode.weight += edge.weight
                this.linksById[link.id] = link
                this.links.push(link)
            } else {
                link.status = 'updated'
            }
        })

        // Give renderer a chance to handle removed nodes/links
        this.drawing.remove(this.nodes, this.links)

        // Clean out removed nodes/links from collections
        this.nodes = _.reject(this.nodes, node => node.status === 'removed')
        this.links = _.reject(this.links, link => link.status === 'removed')
        _.each(this.nodesById, (node: Node) => {
            if (node.status === 'removed') delete this.nodesById[node.id]
        })
        _.each(this.linksById, (link: Link) => {
            if (link.status === 'removed') delete this.linksById[link.id]
        })

        // Now that nodes/links may have new weights, regenerate their scales
        const { nodeScale, linkScale } = makeScales(this.nodes, this.links)
        _.each(this.nodes, node => (node.scale = nodeScale(node.weight)))
        _.each(this.links, link => (link.scale = linkScale(link.weight)))
    }
}
