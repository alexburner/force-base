const drawPoint = (context, x, y) => {
    context.moveTo(x + 4, y);
    context.arc(x, y, 2, 0, 2 * Math.PI);
};

const drawLine = (context, x1, y1, x2, y2) => {
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
};

export const draw = (context, nodes, links, width, height, scale) => {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    context.fillStyle = '#1b86ff';
    context.fillRect(0, 0, width, height);
    context.beginPath();
    for (let i = 0, l = links.length; i < l; i++) {
        const link = links[i];
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
