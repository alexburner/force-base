import { Node, Link } from 'src/ActivityMap';

const drawPoint = (
    context:CanvasRenderingContext2D,
    x:number,
    y:number
) => {
    context.moveTo(x + 4, y);
    context.arc(x, y, 2, 0, 2 * Math.PI);
};

const drawLine = (
    context:CanvasRenderingContext2D,
    x1:number,
    y1:number,
    x2:number,
    y2:number
) => {
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
};

export const draw = (
    context:CanvasRenderingContext2D,
    nodes:Node[],
    links:Link[],
    width:number,
    height:number,
    scale:number
) => {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    context.fillStyle = '#1b86ff';
    context.fillRect(0, 0, width, height);
    context.beginPath();
    for (let i = 0, l = links.length; i < l; i++) {
        const link = links[i];
        if (typeof link.source === 'number') { return; }
        if (typeof link.target === 'number') { return; }
        drawLine(
            context,
            scale * link.source.x + halfWidth,
            scale * link.source.y + halfHeight,
            scale * link.target.x + halfWidth,
            scale * link.target.y + halfHeight
        );
    }
    context.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    context.stroke();
    context.beginPath();
    for (let i = 0, l = nodes.length; i < l; i++) {
        const node = nodes[i];
        drawPoint(
            context,
            scale * node.x + halfWidth,
            scale * node.y + halfHeight
        );
    }
    context.fillStyle = 'rgba(0, 0, 0, 0.9)';
    context.fill();
};
