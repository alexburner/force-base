import _ from 'underscore';
import createElement from 'inferno-create-element';
import InfernoComponent from 'inferno-component';

import data from 'demo/data';
import PixiMap from 'src/PixiMap';

const hash = window.location.hash.length
    ? Number(window.location.hash.slice(1))
    : NaN;

const multiples = isNaN(hash) ? 3 : hash;

let edges = [];
for (let i = 0; i < multiples; i++) {
    const factor = i + 1;
    edges = edges.concat(
        _.map(data.result.edges, edge => {
            return {
                ...edge,
                from: edge.from * factor,
                to: edge.to * factor,
            };
        }),
    );
}

export default class Client extends InfernoComponent<void, void> {
    render() {
        return (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                }}
            >
                <PixiMap edges={edges} />
            </div>
        );
    }
}
