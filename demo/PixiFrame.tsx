import _ from 'underscore';
import createElement from 'inferno-create-element';
import InfernoComponent from 'inferno-component';

import data from 'demo/data';
import PixiMap from 'src/PixiMap/Module';
import { D3Colors } from 'src/PixiMap/constants';
import { Edge } from 'src/PixiMap/interfaces';

interface State {
    colorKey: keyof typeof D3Colors;
    multiplier: number;
}

export default class PixiFrame extends InfernoComponent<void, State> {
    private container: HTMLElement;
    private canvas: HTMLCanvasElement;
    private handleClose: { (): void };
    private handleResize: { (): void };
    private handleColorChange: { (e: Event): void };
    private handleMultiplierChange: { (e: Event): void };
    private map: PixiMap;

    constructor() {
        super();
        this.state = {
            colorKey: 'Magma',
            multiplier: 3,
        };

        this.handleClose = () => (window.location.hash = '');

        this.handleResize = () => {
            if (this.map) {
                const bounds = this.container.getBoundingClientRect();
                this.map.resize(bounds.width, bounds.height);
            }
        };

        this.handleColorChange = e => {
            this.setState({ colorKey: (e.target as HTMLInputElement).value });
            if (this.map) {
                this.map.config({ colorKey: this.state.colorKey });
            }
        };

        this.handleMultiplierChange = e => {
            const value = (e.target as HTMLInputElement).value;
            const number = Number(value);
            this.setState({ multiplier: value });
            if (isNaN(number)) return;
            if (this.map) {
                this.map.update(generateEdges(number));
            }
        };
    }

    render() {
        const barHeight = 30;
        const xPadding = 6;
        return (
            <div
                ref={el => (this.container = el)}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: `${barHeight}px`,
                        lineHeight: `${barHeight}px`,
                        padding: `0 ${xPadding}px`,
                        backgroundColor: '#EEE',
                    }}
                >
                    <div
                        style={{
                            width: 'auto',
                            position: 'absolute',
                            top: 0,
                            right: `${xPadding}px`,
                            bottom: 0,
                        }}
                    >
                        <label>
                            Color=
                            <select
                                value={this.state.colorKey}
                                onChange={this.handleColorChange}
                            >
                                {_.map(D3Colors, (scale, key) =>
                                    <option value={key}>{scale.name}</option>,
                                )}
                            </select>
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label>
                            Multiplier=
                            <input
                                type="text"
                                style={{
                                    width: '30px',
                                    textAlign: 'center',
                                }}
                                value={this.state.multiplier}
                                onChange={this.handleMultiplierChange}
                            />
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onclick={this.handleClose}>&#x2715;</button>
                    </div>
                </div>
                <canvas
                    ref={el => (this.canvas = el)}
                    style={{
                        display: 'block',
                        position: 'absolute',
                        top: `${barHeight}px`,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                />
            </div>
        );
    }

    componentDidMount() {
        const bounds = this.container.getBoundingClientRect();
        this.map = new PixiMap(bounds.width, bounds.height, this.canvas);
        this.map.update(generateEdges(this.state.multiplier));
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        this.map.destroy();
        this.map = null;
    }
}

const generateEdges = (multiplier: number): Edge[] => {
    let edges: Edge[] = [];
    for (let i = 0; i < multiplier; i++) {
        const factor = i + 1;
        edges = edges.concat(
            _.map(data.result.edges, edge => {
                return {
                    ...edge,
                    from: edge.from * factor,
                    to: edge.to * factor,
                } as Edge;
            }),
        );
    }
    return edges;
};
