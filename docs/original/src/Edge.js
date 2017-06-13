function Edge(source, target) {
    MeshObject.call(this);
    this.id = Edge.getId(source, target);
    this.source = source;
    this.target = target;
    this.stats = {};
}
Edge.prototype = Object.create(MeshObject.prototype);

Edge.getId = function(source, target) {
    return ['edge', source.id, target.id].join('-');
};

