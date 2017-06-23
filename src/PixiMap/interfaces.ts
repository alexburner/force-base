import { D3Colors } from 'src/PixiMap/constants'

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
    status: Status
    id: number // object_id
    scale: number // 0-1
    weight: number
    x: number
    y: number
}

export interface Link {
    status: Status
    id: string // `${edge.from},${edge.to}`
    scale: number // 0-1
    source: Node
    target: Node
    weight: number
}

export interface Opts {
    colorKey: keyof typeof D3Colors
}
