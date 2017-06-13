function DeviceNode() {
    Node.apply(this, Array.prototype.slice.call(arguments));
    this.r = 0;
    this.ref = 0;

    this.acquire = function() {
        this.ref += 1;
    };
    this.release = function() {
        this.ref -= 1;
        if (this.ref < 0) {
            log.error('Node', this.id, 'ref error');
            this.ref = 0;
        }
    };
}
DeviceNode.prototype = Object.create(Node.prototype);

