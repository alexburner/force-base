export interface Annotation {
    proto: string;
    weight: number;
}

export interface Edge {
    annotations: Annotation[];
    from: number;
    to: number;
    weight: number;
}

export interface Node {
    oid: number;
    weight: number;
    x: number;
    y: number;
}

export interface Link {
    source: number | Node;
    target: number | Node;
    weight: number;
}
