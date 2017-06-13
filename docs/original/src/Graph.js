var ParticleSystem = window.arbor.ParticleSystem;

function Graph() {
    this.data = null;
    this.map = {};
    this.edges = {};
    //this.watch = new Watch();
    this.callback = null; // XXX

    this.layout = new ParticleSystem({
        repulsion: 800,
        precision: 0.7,
        stiffness: 0.06,
        fps: 60,
        gravity: true
    });

    //this.watch.on(Events.UpdateComplete, function() {
        //// Manually start layout process after modifying the graph
        //this.layout.start();
    //}.bind(this));
    this.update(FakeData);
}

Graph.prototype.update = function(data) {
    var node,
        edge,
        oid,
        i,
        oid,
        src,
        addEdge,
        dst;

    //this.watch.notify(Events.UpdateStart);
    for (i = 0; i < data.edges.length; i++) {
        edge = data.edges[i];
        [edge.from, edge.to].forEach(function(oid) {
            node = this.map[oid];
            if (node === undefined) {
                var info = null; // XXX
                node = new DeviceNode(oid, info, 1);
                this.map[node.id] = node;
            }
            // Reset reference counts because we will recompute all tiers
            node.ref = 0;
        }.bind(this));
    }
    for (i = 0; i < data.edges.length; i++) {
        edge = data.edges[i];
        src = this.get(edge.from);
        dst = this.get(edge.to);
        src.acquire();
        dst.acquire();
        this.addNode(src);
        this.addNode(dst);
        this.addEdge(src, dst);
    }

    // Remove nodes no longer in use
    for (oid in this.map) {
        var node = this.map[oid];
        if (node.ref === 0) {
            this.removeNode(node);
        }
    }
    console.log('graph updated');
    this.data = data;
    //this.watch.notify(Events.UpdateComplete);
    if (this.callback !== null) {
        this.callback(); // XXX
    }
    this.layout.start(); // XXX
};

Graph.prototype.get = function(id) {
    if ((typeof id === 'string') && (/^node\-/.test(id))) {
        id = id.split('-')[1];
    }
    else if ((typeof id === 'string') && (/^edge\-/.test(id))) {
        return this.edges[id];
    }
    return this.map[id] || null;
};

Graph.prototype.addNode = function(node) {
    var result = this.layout.getNode(node.id);
    node.isInLayout = true;
    if (!result) {
        console.log('add:', node);
        this.layout.addNode(node.id, node);
    }
};

Graph.prototype.removeNode = function(node) {
    var self = this;
    node.isInLayout = false;
    if (self.layout.getNode(node.id)) {
        console.log('remove:', node);
        // Remove edges first so that pruneNode doesn't sneakily remove them
        // from the layout for us.
        self.eachEdge(function(e) {
            if ((e.source === node) || (e.target === node)) {
                self.removeEdge(e);
            }
        });
        this.layout.pruneNode(node.id);
    }
};

Graph.prototype.addEdge = function(source, target) {
    var edges,
        edgeId,
        edge,
        key;

    edgeId = Edge.getId(source, target);
    edge = this.edges[edgeId];
    if (edge === undefined) {
        edge = new Edge(source, target);
        this.edges[edgeId] = edge;
    }

    edges = this.layout.getEdges(source.id, target.id);
    if (!this.layout.getNode(edge.source.id)) {
        throw new Error(edge.source.id);
    }
    if (!this.layout.getNode(edge.target.id)) {
        throw new Error(edge.target.id);
    }
    if (edges.length === 0) {
        console.log('edge from', edge.source.id, 'to', edge.target.id);
        edge.source.degree += 1;
        edge.target.degree += 1;
        edge.isInLayout = true;
        this.layout.addEdge(edge.source.id, edge.target.id, edge);
    }
};

Graph.prototype.removeEdge = function(edge) {
    var edges = this.layout.getEdges(edge.source.id, edge.target.id),
        i;
    for (i = 0; i < edges.length; i++) {
        edge.source.degree -= 1;
        edge.target.degree -= 1;
        edge.isInLayout = false;
        this.layout.pruneEdge(edges[i]);
    }
};

Graph.prototype.eachNode = function(fn) {
    var id;
    for (id in this.map) {
        fn(this.map[id]);
    }
};

Graph.prototype.eachEdge = function(fn) {
    var id;
    for (id in this.edges) {
        fn(this.edges[id]);
    }
};

Graph.prototype.layoutUpdate = function() {
    var energy = this.layout.energy();
    if (energy.mean < Options.layout.minEnergy) {
        this.layout.stop();
    }
};

