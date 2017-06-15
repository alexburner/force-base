import createElement from 'inferno-create-element';
import InfernoComponent from 'inferno-component';

import { Edge } from 'src/PixiMap/interfaces';
import render from 'src/PixiMap/render';

interface Props {
    edges: Edge[];
    width: number;
    height: number;
}

export default class PixiMap extends InfernoComponent<Props, void> {
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
        render(this.canvas, bounds.width, bounds.height, this.props.edges);
    }
}

