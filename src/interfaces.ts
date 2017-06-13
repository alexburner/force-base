export interface Annotation {
    proto: string;
    weight: number;
}

export interface Edge {
    from: number;
    to: number;
    annotations: Annotation[];
}

export interface Node {
    oid: number;
    scale: number;
    weight: number;
    x: number;
    y: number;
}

export interface Link {
    scale: number;
    source: number | Node;
    target: number | Node;
    weight: number;
}
