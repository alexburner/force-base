function createLights() {
    var light;
    light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.8);
    light.position.set(0, 500, 0);
    return [light];
}

/**
 * Renderer class, used to draw activity maps
 */
function Renderer($el, graph) {
    var i;

    this.width = $el.width();
    this.height = $el.height();
    this.container = $el;
    this.containerOffset = this.container.offset();
    // XXX: remove stats code
    //this.stats = new Stats();
    //this.stats.setMode(1);
    //this.stats.domElement.style.position = 'absolute';
    //this.stats.domElement.style.left = '0px';
    //this.stats.domElement.style.top = '40px';
    //this.container.append(this.stats.domElement);

    console.log('initializing renderer',
                '(' + this.width + 'x' + this.height + ') on', $el);

    // Populated on demand, cleared when the graph is updated.
    this.nodeMeshCache = null;

    //graph.watch.on(Events.UpdateComplete, this.graphUpdate.bind(this));
    graph.callback = this.graphUpdate.bind(this);

    this.graph = graph;
    this.graph.layout.screenSize(this.width, this.height);
    this.renderer = new THREE.WebGLRenderer(Options.renderOptions);
    this.aspect = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera(50, this.aspect, -500, 500);
    this.camera.position.z = 1600;
    this.camera.lookAt(new THREE.Vector3());
    this.renderer.setSize(this.width, this.height);
    // Clear color should match the CSS background color.
    this.renderer.setClearColor(0xD4D4D4, 1);
    this.container.append(this.renderer.domElement);

    this.geometry = new Geometry();
    this.materials = new Materials();
    this.bg = this.geometry.createBackground(this.materials);

    this.scene = new THREE.Scene();
    this.scene.add(this.camera);
    this.scene.add(this.bg);
    this.lights = createLights();
    for (i = 0; i < this.lights.length; i++) {
        this.scene.add(this.lights[i]);
    }

    // Time of last user interaction. We don't want to make changes while the
    // user is interacting with the map.
    this.lastTouch = -Infinity;

    // Will be true if the renderer is currently active
    this.isRendering = false;

    this.animations = new Animations();
}

Renderer.prototype.layoutToWorld = function(x, y) {
    x = x - (this.width / 2);
    y = - (y - (this.height / 2));
    return new THREE.Vector3(x, y, 0);
};

Renderer.prototype.toWorld = function(x, y) {
    var vec,
        projector = new THREE.Projector(),
        offset = this.containerOffset,
        dir,
        pos,
        distance;

    x -= offset.left;
    y -= offset.top;

    vec = new THREE.Vector3((x / this.width) * 2 - 1,
                            (-y / this.height) * 2 + 1,
                            -0.5);
    projector.unprojectVector(vec, this.camera);
    dir = vec.sub(this.camera.position).normalize();
    distance = -this.camera.position.z / dir.z;
    pos = this.camera.position.clone().add(dir.multiplyScalar(distance));

    return pos;
};

Renderer.prototype.toScreen = function(x, y, z) {
    var w = this.width,
        h = this.height,
        offset = this.containerOffset,
        projector = new THREE.Projector(),
        pos = projector.projectVector(new THREE.Vector3(x, y, z), this.camera);
    pos.x = (pos.x * (w / 2)) + (w / 2) + offset.left;
    pos.y = -(pos.y * (h / 2)) + (h / 2) + offset.top;
    return pos;
};

Renderer.prototype.getNodeMeshes = function() {
    var nodeMeshCache;
    if (this.nodeMeshCache !== null) {
        return this.nodeMeshCache;
    }
    nodeMeshCache = [];
    this.graph.layout.eachNode(function(node) {
        nodeMeshCache.push(node.data.mesh);
    });
    this.nodeMeshCache = nodeMeshCache;
    return this.nodeMeshCache;
};

Renderer.prototype.zoom = function(amount) {
    var fovMin = 5,
        fovMax = 160,
        w = this.width,
        h = this.height,
        camera = this.camera,
        m;

    camera.fov -= amount;
    camera.fov = Util.bound(camera.fov, [fovMin, fovMax]);
    m = new THREE.Matrix4().makePerspective(camera.fov, w / h,
                                            camera.near,
                                            camera.far);
    camera.projectionMatrix = m;
    this.step();
};

Renderer.prototype.addHighlight = function(obj) {
    var tween;
    obj.isHighlighted = true;
    tween = new TWEEN.Tween({scale: 1})
        .to({scale: 1.25}, 150)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
            obj.mesh.scale.x = this.scale;
            obj.mesh.scale.y = this.scale;
        });

    this.animations.add(obj, Animations.Highlight, tween);
    this.step();
};

Renderer.prototype.removeHighlight = function(obj) {
    var tween;
    obj.isHighlighted = false;
    tween = new TWEEN.Tween({scale: obj.mesh.scale.x})
        .to({scale: 1}, 150)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
            obj.mesh.scale.x = this.scale;
            obj.mesh.scale.y = this.scale;
        });

    this.animations.add(obj, Animations.Highlight, tween);
    this.step();
};

Renderer.prototype.pan = function(oldPos, newPos) {
    var p,
        q,
        d = new THREE.Vector3();
    p = this.toWorld(oldPos.x, oldPos.y);
    q = this.toWorld(newPos.x, newPos.y);
    d.subVectors(q, p);
    this.camera.position.sub(d);
    this.renderer.render(this.scene, this.camera);
    this.lastTouch = Date.now();
};

Renderer.prototype.move = function(obj, oldPos, newPos) {
    var p,
        q,
        node,
        d = new THREE.Vector3();
    p = this.toWorld(oldPos.x, oldPos.y);
    q = this.toWorld(newPos.x, newPos.y);
    d.subVectors(q, p);
    obj.mesh.position.add(d);
    node = this.graph.layout.getNode(obj.id);
    node.fixed = true;
    obj.fixed = true;

    // Update position in layout coordinates
    p = obj.mesh.position;
    p = this.toScreen(p.x, p.y, Layers.nodes);
    p = this.graph.layout.fromScreen(p);
    obj.x = p.x;
    obj.y = p.y;
    node.p.x = p.x;
    node.p.y = p.y;

    this.step({nodes: [obj]});
    this.lastTouch = Date.now();
};

// Returns the intersected objects, currently only nodes.
Renderer.prototype.mouseAt = function(mousePos) {
    var i,
        pos = this.toWorld(mousePos.x, mousePos.y),
        results = [],
        camera = this.camera,
        raycaster,
        intersects,
        obj;

    raycaster = new THREE.Raycaster(camera.position,
                                    pos.sub(camera.position)
                                       .normalize());
    intersects = raycaster.intersectObjects(this.getNodeMeshes());
    for (i = 0; i < intersects.length; i++) {
        obj = this.graph.get(intersects[i].object.name);
        results.push(obj);
    }
    if (results.length > 0) {
        // For now, only update lastTouch if the user is intersecting things
        this.lastTouch = Date.now();
    }
    return results;
};

Renderer.prototype.drawBackground = function() {
    //this.bg.rotation.y += (Math.PI / 2) / 600;
};

Renderer.prototype.layoutUpdate = function() {
    this.step();
};

Renderer.prototype.renderNode = function(node, p) {
    var mesh = node.data.mesh,
        labelMesh = node.data.labelMesh,
        child,
        scale = this.aspect * this.camera.fov / 60,
        r = node.data.r || (40 * Math.PI / 2 - 14),
        nodeDistFactor,
        opacity,
        pos,
        z,
        pad = 14;

    if (mesh === null) {
        return;
    }

    if (this.graph.layout.isRunning) {
        // Update positions
        if (!node.fixed && (mesh !== null)) {
            pos = this.layoutToWorld(p.x, p.y);
            node.data.x = p.x;
            node.data.y = p.y;
            mesh.position.set(pos.x, pos.y, Layers.nodes);
        }
    }

    if (node.data.isHighlighted) {
        opacity = 1.0;
        child = mesh.children[0];
        child.material = this.materials.selectedNodeBorder;
        child.scale.x = 1.05;
        child.scale.y = 1.05;
        z = Layers.selection;
    }
    else {
        child = mesh.children[0];
        child.material = this.materials.nodeBorder;
        child.scale.x = 1.0;
        child.scale.y = 1.0;
        nodeDistFactor = 2.25;
        opacity = Util.bound(r * nodeDistFactor / this.camera.fov, [0.0, 1.0]);
        if (opacity < 0.5) {
            opacity = 0;
        }
        if (opacity > 0.7) {
            opacity = 1.0;
        }
        z = Layers.nodes;
        // XXX: For now, reset fixed property if node is not highlighted. We
        // may want to make this behavior a bit smarter.
        node.fixed = false;
        node.data.fixed = false;
    }
    mesh.position.z = z;
    mesh.children[0].position.z = z + 1;
    p = mesh.position;
    p = this.toScreen(p.x, p.y - r * mesh.scale.y, z);
    p = this.toWorld(p.x, p.y + pad);
    labelMesh.position.set(p.x, p.y, Layers.labels);
    labelMesh.scale.x = scale;
    labelMesh.scale.y = scale;
    labelMesh.material.opacity = opacity;
};

Renderer.prototype.renderEdge = function(edge, p, q) {
    var mesh = edge.data.mesh,
        source = edge.source.data,
        target = edge.target.data,
        sourceMesh = source.mesh,
        targetMesh = target.mesh,
        p,
        q;

    if (mesh === null) {
        return;
    }

    p = sourceMesh.position;
    q = targetMesh.position;

    this.geometry.updateEdgeMesh(edge.data, mesh, p, q);
};

Renderer.prototype.drawFrame = function(modified) {
    var i,
        j,
        layout,
        node,
        nodes,
        edges,
        edge;

    if (!this.initialized) {
        return;
    }

    this.drawBackground();

    layout = this.graph.layout;
    if (modified === undefined) {
        // Update everything in the frame
        layout.eachNode(this.renderNode.bind(this));
        layout.eachEdge(this.renderEdge.bind(this));
    }
    else {
        // Update only modified objects
        nodes = modified.nodes || [];
        for (i = 0; i < nodes.length; i++) {
            node = layout.getNode(nodes[i].id);
            edges = layout.getEdgesFrom(node).concat(layout.getEdgesTo(node));
            this.renderNode(node);
            for (j = 0; j < edges.length; j++) {
                edge = edges[j];
                this.renderEdge(edge);
            }
        }
        edges = modified.edges || [];
        for (i = 0; i < edges.length; i++) {
            this.renderEdge(edge);
        }
    }
    this.renderer.render(this.scene, this.camera);
};

Renderer.prototype.step = function(modified) {
    var self = this;

    function renderFn() {
        // XXX: remove stats code
        //self.stats.begin();
        TWEEN.update();
        self.drawFrame(modified);
        //self.stats.end();
        if (!self.animations.empty() || self.graph.layout.isRunning) {
            requestAnimationFrame(renderFn);
        }
        else {
            self.isRendering = false;
        }
        // If we draw again, do a complete redraw
        modified = undefined;
    }

    if (!self.isRendering) {
        requestAnimationFrame(renderFn);
        self.isRendering = true;
    }
};

Renderer.prototype.init = function() {
    this.initialized = true;
    this.graphUpdate();
};

Renderer.prototype.uninit = function() {
    var self = this,
        key;
    self.initialized = false;
    this.graph.layout.eachEdge(function(edge) {
        if (edge.data.mesh !== null) {
            self.scene.remove(edge.data.mesh);
            edge.data.mesh.geometry.dispose();
            edge.data.mesh = null;
        }
    });
    this.graph.layout.eachNode(function(node) {
        if (node.data.mesh !== null) {
            self.scene.remove(node.data.mesh);
            node.data.mesh.geometry.dispose();
            node.data.mesh = null;
        }
    });
    for (key in this.materials) {
        this.materials[key].dispose();
    }
    this.geometry.dispose();
    this.container.empty();
};

Renderer.prototype.canBeUpdated = function() {
    var now = Date.now(),
        minInteractionWaitTime = 1000;
    return now - this.lastTouch >= minInteractionWaitTime;
};

Renderer.prototype.graphUpdate = function() {
    var self = this,
        geometry = self.geometry;

    console.log('start graphUpdate');
    this.graph.eachNode(function(node) {
        var nodeMesh,
            p,
            labelMesh;
        if (node.isInLayout) {
            if (node.mesh === null) {
                p = self.layoutToWorld(node.x, node.y);
                nodeMesh = geometry.createNodeMesh(self.materials, node, p);
                labelMesh = geometry.createNodeLabelMesh(self.materials, node,
                                                         p);
                node.mesh = nodeMesh;
                node.labelMesh = labelMesh;
            }
            if (!node.isInScene) {
                self.scene.add(node.mesh);
                self.scene.add(node.labelMesh);
            }
            node.isInScene = true;
        }
        else {
            if (node.isInScene) {
                // Convert x, y back to layout coordinates, so if the node gets
                // readded to the layout, the conversion back to world
                // coordinates will be correct.
                p = node.mesh.position;
                p = self.toScreen(p.x, p.y, p.z);
                p = self.graph.layout.fromScreen(p);
                node.fixed = false;
                node.x = p.x;
                node.y = p.y;
                self.scene.remove(node.mesh);
                self.scene.remove(node.labelMesh);
            }
            node.isInScene = false;
        }
    });

    this.graph.eachEdge(function(edge) {
        var mesh,
            p,
            q,
            source = edge.source,
            target = edge.target;
        if (edge.isInLayout) {
            if (edge.mesh === null) {
                p = self.layoutToWorld(source.x, source.y);
                q = self.layoutToWorld(target.x, target.y);
                mesh = geometry.createEdgeMesh(self.materials, edge, p, q);
                edge.mesh = mesh;
            }
            if (!edge.isInScene) {
                self.scene.add(edge.mesh);
            }
            edge.isInScene = true;
        }
        else {
            if (edge.isInScene) {
                self.scene.remove(edge.mesh);
            }
            edge.isInScene = false;
        }
    });
    console.log('end graphUpdate (meshes created/destroyed)');

    self.nodeMeshCache = null;
};


/* Events */

Renderer.prototype.onResize = function() {
    this.width = this.container.width();
    this.height = this.container.height();
    this.aspect = this.width / this.height;
    this.containerOffset = this.container.offset();
    this.graph.layout.screenSize(this.width, this.height);
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.step();
};

