import _ from 'underscore';
import createElement from 'inferno-create-element';
import InfernoComponent from 'inferno-component';

import data from 'demo/data';
import render from 'src/PixiMap/render';

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

export default class Client extends InfernoComponent {
    private container:HTMLElement;
    private canvas:HTMLCanvasElement;

    render() {
        return (
            <div
                ref={el => this.container = el}
                style={{
                    height: '100%',
                    width: '100%',
                }}
            >
                <canvas
                    ref={el => this.canvas = el}
                    style={{display: 'block'}}
                ></canvas>
            </div>
        );
    }

    componentDidMount() {
        const bounds = this.container.getBoundingClientRect();
        this.canvas.width = bounds.width;
        this.canvas.height = bounds.height;
        render(this.canvas, bounds.width, bounds.height, edges);
    }
}
