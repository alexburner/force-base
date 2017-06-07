import ForceWorker from 'src/worker';
import { draw } from 'src/render';

export interface Node {
    index:number;
    x:number;
    y:number;
}

export interface Link {
    source:number;
    target:number;
}

export interface Data {
    nodes:Node[];
    links:Link[];
}

export interface Size {
    width:number,
    height:number,
}

// export interface Opts {
//     theme:'light'|'dark';
//     useIcons:boolean; // device type images
//     sexyMode:boolean; // glows & pulses & stuff
//     threeDee:boolean; // fully 3D layout
// }

export default class ActivityMap {
    private worker:Worker;

    constructor(
        private canvasEl:HTMLCanvasElement,
        // private onClick:{(target:Node|Link):void},
        private data:Data,
        // private opts:Opts,
        private size:Size,
    ) {
        const context = this.canvasEl.getContext('2d');

        this.worker = new ForceWorker();

        this.worker.addEventListener('message', (e) => {
            switch (e.data.type) {
                case 'tick': {
                    window.requestAnimationFrame(() => {
                        draw(
                            context,
                            e.data.nodes,
                            e.data.links,
                            this.size.width,
                            this.size.height,
                            0.3 // scale
                        );
                    });
                    break;
                }
            }
        });

        this.worker.postMessage({
            type: 'init',
            nodes: this.data.nodes,
            links: this.data.links,
        });
    }

    // update(data:Data) {}

    // resize(size:Size) {}

    // config(opts:Opts) {}

    // destroy() {}
}
