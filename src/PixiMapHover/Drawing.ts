import _ from 'underscore'
import * as d3_scale from 'd3-scale'
import * as PIXI from 'pixi.js'

import { D3Colors } from 'src/PixiMapHover/constants'
import { Node, Link, NodesById, LinksById } from 'src/PixiMapHover/interfaces'
import { colorToHex, makeCanvas } from 'src/PixiMapHover/util'

export default class Drawing {
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer
    private stage: PIXI.Container
    private nodeLayer: PIXI.Container
    private linkLayer: PIXI.Container
    private nodeTexture: PIXI.Texture
    private linkTexture: PIXI.Texture
    private nodeSpritesById: { [id: number]: PIXI.Sprite }
    private linkSpritesById: { [id: number]: PIXI.Sprite }
    private nodesById: NodesById
    private linksById: LinksById
    private isRunning: boolean
    private colorScale: d3_scale.ScaleSequential<any>

    constructor(width: number, height: number, canvas: HTMLCanvasElement) {
        this.isRunning = false

        this.nodeTexture = PIXI.Texture.fromCanvas(makeNodeCanvas())
        this.linkTexture = PIXI.Texture.fromCanvas(makeLinkCanvas())

        this.nodeSpritesById = {}
        this.linkSpritesById = {}

        this.nodesById = {}
        this.linksById = {}

        this.renderer = PIXI.autoDetectRenderer(width, height, {
            antialias: true,
            backgroundColor: 0x333333,
            view: canvas,
        })

        this.stage = new PIXI.Container()
        this.stage.width = width
        this.stage.height = height
        this.stage.x += width / 2
        this.stage.y += height / 2
        this.stage.scale.x = 0.7 // magic #
        this.stage.scale.y = 0.7 // magic #
        this.stage.alpha = 0

        this.nodeLayer = new PIXI.Container()
        this.linkLayer = new PIXI.Container()
        this.stage.addChild(this.linkLayer)
        this.stage.addChild(this.nodeLayer)

        this.setColor('Magma')

        {
            // Drag-to-pan
            let prevX: number
            let prevY: number
            let isMouseDown: boolean
            canvas.addEventListener('mousedown', (e: MouseEvent) => {
                isMouseDown = true
                prevX = e.offsetX
                prevY = e.offsetY
            })
            canvas.addEventListener('mousemove', (e: MouseEvent) => {
                if (!isMouseDown) return
                const x = e.offsetX
                const y = e.offsetY
                const diffX = x - prevX
                const diffY = y - prevY
                this.stage.x += diffX
                this.stage.y += diffY
                prevX = x
                prevY = y
            })
            canvas.addEventListener('mouseup', () => {
                isMouseDown = false
            })

            // Scroll-to-zoom
            const MIN_SCALE = 0.1 // magic #
            const MAX_SCALE = 10 // magic #
            canvas.addEventListener('wheel', (e: WheelEvent) => {
                const delta = e.deltaY / 200 // magic #
                let scale = this.stage.scale.x - delta
                scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale))
                this.stage.scale.x = scale
                this.stage.scale.y = scale
            })
        }
    }

    run() {
        this.isRunning = true
        this.loop()
    }

    halt() {
        this.isRunning = false
    }

    loop() {
        if (!this.isRunning) return
        window.requestAnimationFrame(() => {
            this.renderer.render(this.stage)
            this.loop()
        })
    }

    resize(width: number, height: number) {
        this.renderer.resize(width, height)
    }

    setColor(colorKey: keyof typeof D3Colors) {
        const color = D3Colors[colorKey]
        this.colorScale = d3_scale
            .scaleSequential(color.interpolator)
            .domain(color.domain as [number, number])
    }

    fadeOutSprites() {
        _.each(this.nodeSpritesById, fadeOutSprite)
        _.each(this.linkSpritesById, fadeOutSprite)
    }

    fadeInSprites() {
        _.each(this.nodeSpritesById, fadeInSprite)
        _.each(this.linkSpritesById, fadeInSprite)
    }

    hoverNode(node: Node) {
        this.fadeOutSprites()
        const nodesById = {}
        nodesById[node.id] = node
        _.each([...node.linkIds.values()], (linkId: string) => {
            const link = this.linksById[linkId]
            // save connected nodes
            nodesById[link.source.id] = link.source
            nodesById[link.target.id] = link.target
            // fade in link sprite
            fadeInSprite(this.linkSpritesById[link.id])
        })
        // fade in node sprites
        _.each(nodesById, (node: Node) => {
            fadeInSprite(this.nodeSpritesById[node.id])
        })
    }

    hoverLink(link: Link) {
        this.fadeOutSprites()
        // fade in link sprite
        fadeInSprite(this.linkSpritesById[link.id])
        // fade in node sprites
        fadeInSprite(this.nodeSpritesById[link.source.id])
        fadeInSprite(this.nodeSpritesById[link.target.id])
    }

    remove(nodes: Node[], links: Link[]) {
        // Clean out sprites for any removed nodes
        _.each(nodes, node => {
            if (node.status !== 'removed') return
            const sprite = this.nodeSpritesById[node.id]
            if (sprite) {
                delete this.nodeSpritesById[node.id]
                this.nodeLayer.removeChild(sprite)
                setTimeout(() => sprite.destroy(), 0)
            }
        })

        // Clean out sprites for any removed links
        _.each(links, link => {
            if (link.status !== 'removed') return
            const sprite = this.linkSpritesById[link.id]
            if (sprite) {
                delete this.linkSpritesById[link.id]
                this.linkLayer.removeChild(sprite)
                setTimeout(() => sprite.destroy(), 0)
            }
        })
    }

    update(
        nodes: Node[],
        links: Link[],
        nodesById: NodesById,
        linksById: LinksById,
    ) {
        this.nodesById = nodesById
        this.linksById = linksById
        // Create/Update node sprites
        _.each(nodes, node => {
            let sprite = this.nodeSpritesById[node.id]
            if (!sprite) {
                sprite = new PIXI.Sprite(this.nodeTexture)
                sprite.interactive = true
                sprite.interactiveChildren = false
                sprite.buttonMode = true
                sprite.on('pointerover', () => this.hoverNode(node))
                // sprite.on('pointerout', () => this.fadeInSprites())
                this.nodeSpritesById[node.id] = sprite
                this.nodeLayer.addChild(sprite)
            }
            sprite.tint = colorToHex(this.colorScale(node.scale))
            sprite.scale.x = node.scale * 0.08 // magic #
            sprite.scale.y = node.scale * 0.08 // magic #
            // sprite.alpha = node.scale + 0.7 // magic #
            sprite.alpha = 0.2
        })

        // Create/Update link sprites
        _.each(links, link => {
            let sprite = this.linkSpritesById[link.id]
            if (!sprite) {
                sprite = new PIXI.Sprite(this.linkTexture)
                sprite.interactive = true
                sprite.interactiveChildren = false
                sprite.buttonMode = true
                sprite.on('pointerover', () => this.hoverLink(link))
                // sprite.on('pointerout', () => this.fadeInSprites())
                this.linkSpritesById[link.id] = sprite
                this.linkLayer.addChild(sprite)
            }
            sprite.anchor.set(0, 0.5)
            sprite.tint = colorToHex(this.colorScale(link.scale))
            sprite.scale.y = link.scale * 0.02 // magic #
            // sprite.alpha = link.scale
            sprite.alpha = 0.2
        })
    }

    tick(nodes: Node[], links: Link[]) {
        // Move node sprites
        _.each(nodes, node => {
            if (node.status === 'removed') return
            const sprite = this.nodeSpritesById[node.id]
            sprite.x = node.x - sprite.width / 2
            sprite.y = node.y - sprite.height / 2
        })

        // Move link sprites
        _.each(links, link => {
            if (link.status === 'removed') return
            const sprite = this.linkSpritesById[link.id]
            const node1 = link.source
            const node2 = link.target
            setLinkPosition(sprite, node1, node2)
        })

        // Increment stage opacity (if not full)
        if (this.stage.alpha < 1) this.stage.alpha += 0.01
    }

    destroy() {
        // stop loop
        this.halt()
        // clean up pixi
        this.stage.destroy({
            children: true,
            texture: true,
            baseTexture: true,
        })
        this.renderer.destroy()
    }
}

const nodeWidth = 256 // magic # (must be power of 2)
const nodeHeight = nodeWidth // square
const nodeRadius = nodeWidth / 2 - 4 // magic #

const linkLength = 256 // magic # (must be power of 2)
const linkHeight = linkLength // square
const linkThickness = 128 // magic #

const makeNodeCanvas = (): HTMLCanvasElement => {
    const x = nodeWidth / 2
    const y = nodeHeight / 2
    const canvas = makeCanvas(nodeWidth, nodeHeight)
    const context = canvas.context
    context.beginPath()
    context.moveTo(x + 4, y)
    context.arc(x, y, nodeRadius, 0, 2 * Math.PI)
    context.fillStyle = 'rgba(255, 255, 255, 1)'
    context.fill()
    context.strokeStyle = 'rgba(255, 255, 255, 1)'
    context.stroke()
    return canvas.element
}

const makeLinkCanvas = (): HTMLCanvasElement => {
    const x1 = 0
    const x2 = linkLength
    const y1 = linkHeight / 2
    const y2 = y1 // horizontal line
    const canvas = makeCanvas(linkLength, linkHeight)
    const context = canvas.context
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = linkThickness
    context.lineCap = 'round'
    context.lineTo(x2, y2)
    context.strokeStyle = 'rgba(255, 255, 255, 1)'
    context.stroke()
    return canvas.element
}

const setLinkPosition = (sprite: PIXI.Sprite, node1: Node, node2: Node) => {
    // extract node coords
    const x1 = node1.x
    const y1 = node1.y
    const x2 = node2.x
    const y2 = node2.y
    // calculate new length & angle
    const xDiff = x2 - x1
    const yDiff = y2 - y1
    const length = Math.sqrt(xDiff * xDiff + yDiff * yDiff)
    let radians = Math.acos(yDiff / length)
    if (x2 > x1) radians *= -1
    // set new position
    sprite.x = x1
    sprite.y = y1
    // set new rotation
    sprite.rotation = radians + Math.PI / 2
    // set new stretch
    sprite.scale.x = length / linkLength
}

const fadeOutSprite = (sprite: PIXI.Sprite) => sprite && (sprite.alpha = 0.2)
const fadeInSprite = (sprite: PIXI.Sprite) => sprite && (sprite.alpha = 1)
