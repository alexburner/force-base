import { D3Colors } from 'src/PixiMapHover/constants'

export interface Annotation {
    proto: string
    weight: number
}

export interface Edge {
    annotations: Annotation[]
    from: number // object_id
    to: number // object_id
    weight: number
}

type Status = 'added' | 'removed' | 'updated'

export interface Node {
    id: number // object_id
    scale: number // 0-1
    weight: number
    x: number
    y: number
    status: Status
    linkIds: Set<string>
}

export interface Link {
    id: string // `${edge.from},${edge.to}`
    scale: number // 0-1
    weight: number
    source: Node
    target: Node
    status: Status
}

export type NodesById = { [id: number]: Node }
export type LinksById = { [id: string]: Link }

export interface Opts {
    colorKey: keyof typeof D3Colors
}
