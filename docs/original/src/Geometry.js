function Geometry() {
    var geometryCache = {},
        baseGeometry = new THREE.PlaneGeometry(80, 90, 6, 6),
        baseBorderGeometry = new THREE.PlaneGeometry(85, 95, 6, 6);

    this.createBackground = function(materials) {
        var geom,
            mesh;
        geom = new THREE.PlaneGeometry(100000, 100000);
        mesh = new THREE.Mesh(geom, materials.background);
        mesh.position.set(0, 0, Layers.background);
        return mesh;
    };

    this.getNodeGeometry = function(node) {
        var segments,
            geometry;

        if (geometryCache[node.r] && geometryCache[node.r].geometry) {
            return geometryCache[node.r].geometry;
        }
        segments = Util.bound(node.r, [16, 32]);
        geometry = new THREE.CircleGeometry(node.r, segments);
        if (!geometryCache[node.r]) {
            geometryCache[node.r] = {};
        }
        geometryCache[node.r].geometry = geometry;
        return geometry;
    };

    this.getNodeBorderGeometry = function(node) {
        var segments,
            borderGeometry;

        if (geometryCache[node.r] && geometryCache[node.r].borderGeometry) {
            return geometryCache[node.r].borderGeometry;
        }
        segments = Util.bound(node.r, [16, 32]);
        borderGeometry = new THREE.CircleGeometry(node.r + 0.5, segments);
        if (!geometryCache[node.r]) {
            geometryCache[node.r] = {};
        }
        geometryCache[node.r].borderGeometry = borderGeometry;
        return borderGeometry;
    };

    this.createNodeLabelMesh = function(materials, node, p) {
        var geom,
            material,
            canvas,
            context,
            labelHeight = 18,
            labelWidth = 500,
            fontSize = 12,
            texture,
            mesh;
        canvas = document.createElement('canvas');
        $(canvas).attr('height', labelHeight);
        $(canvas).attr('width', labelWidth);
        context = canvas.getContext('2d');
        context.font = fontSize + 'pt Source Sans Pro';
        context.fillStyle = '#444';
        context.textAlign = 'center';
        context.fillText(node.label, canvas.width / 2, fontSize);
        texture = new THREE.Texture(canvas);
        material = new THREE.MeshBasicMaterial({
            'map': texture,
            'transparent': true
        });
        material.opacity = 0.0;
        material.map.needsUpdate = true;
        geom = new THREE.PlaneGeometry(canvas.width, canvas.height);
        mesh = new THREE.Mesh(geom, material);
        mesh.position.x = p.x;
        mesh.position.y = p.y;
        mesh.position.z = Layers.labels;
        return mesh;
    };

    this.createNodeMesh = function(materials, node, p) {
        var borderGeom,
            geom,
            borderMesh,
            mesh,
            r;

        r = Util.bound(node.degree * 2 || 2, [5, 15]);
        node.r = r;
        geom = this.getNodeGeometry(node);
        mesh = new THREE.Mesh(geom, materials.node);
        borderGeom = this.getNodeBorderGeometry(node);
        mesh.name = 'node-' + node.id;
        borderMesh = new THREE.Mesh(borderGeom, materials.nodeBorder);

        borderMesh.position.z = Layers.nodes + 1;
        mesh.position.x = p.x;
        mesh.position.y = p.y;
        mesh.position.z = Layers.nodes;
        mesh.add(borderMesh);
        return mesh;
    };

    this.updateEdgeMesh = function(edge, mesh, p, q) {
        var i,
            baseWidth = 0.3,
            w,
            scale,
            distance = new THREE.Vector2(q.x - p.x, q.y - p.y),
            geom = mesh.geometry,
            n = geom.vertices.length,
            xd = distance.x / (n / 2 - 1),
            yd = distance.y / (n / 2 - 1),
            cur = p.clone(),
            theta = Math.atan2(q.y - p.y, q.x - p.x),
            tmp = new THREE.Vector2(),
            normal = new THREE.Vector2(),
            pad,
            v;

        pad = new THREE.Vector2(Math.cos(theta), Math.sin(theta));

        for (i = 0; i < n / 2; i++) {
            scale = Math.pow(Math.abs(n / 4 - i), 1.5) / 6;
            if ((edge.source instanceof DeviceNode) &&
                (edge.target instanceof DeviceNode)) {
                w = 0.1;
            }
            else if (edge.source instanceof DeviceNode) {
                w = (i / (n / 2) + 0.1) * baseWidth;
            }
            else if (edge.target instanceof DeviceNode) {
                w = (1 - i / (n / 2)) * baseWidth;
            }
            else {
                w = baseWidth;
            }
            pad = pad.normalize().multiplyScalar(w);
            tmp.set(cur.x, cur.y);
            normal.set(-pad.y, pad.x).multiplyScalar(scale);
            tmp.add(normal);
            v = geom.vertices[2 * i];
            v.set(tmp.x, tmp.y, Layers.edges);

            tmp.set(cur.x, cur.y);
            normal.set(pad.y, -pad.x).multiplyScalar(scale);
            tmp.add(normal);
            v = geom.vertices[2 * i + 1];
            v.set(tmp.x, tmp.y, Layers.edges);
            cur.x += xd;
            cur.y += yd;
        }
        geom.verticesNeedUpdate = true;
        geom.computeBoundingSphere();
    };

    this.createEdgeMesh = function(materials, edge, p, q) {
        var geom,
            line;
        geom = new THREE.PlaneGeometry(1, 100, 20, 1);
        geom.dynamic = true;
        geom.name = 'edge-' + [edge.source.id, edge.target.id].join('-');
        line = new THREE.Mesh(geom, materials.edge);
        this.updateEdgeMesh(edge, line, p, q);
        return line;
    };

    this.dispose = function() {
        var key;
        for (key in geometryCache) {
            geometryCache[key].dispose();
        }
        baseBorderGeometry.dispose();
        baseGeometry.dispose();
    };
}
