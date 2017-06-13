function Node(id, info) {
    MeshObject.call(this);
    this.weight = 1;
    this.x = 0;
    this.y = 0;
    this.id = id;
    this.label = (info && info.name) || id;
    this.degree = 0;
    this.isInLayout = false;
    this.isHighlighted = false;
    this.labelMesh = null;
    this.fixed = false;
    this.dampingFactor = 1.0;

    // XXX: hack for arbor.js
    Object.defineProperty(this, 'mass', {
        get: function() {
            return this.weight;
        },
        set: function(x) {
            void x;
        }
    });
}
Node.prototype = Object.create(MeshObject.prototype);

