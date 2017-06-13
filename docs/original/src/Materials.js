function Materials() {
    this.background = new THREE.MeshBasicMaterial({
        'color': 0xdadaff,
        'shading': THREE.FlatShading
    });
    this.node = new THREE.MeshBasicMaterial({
        'color': 0xfafafa,
        'shading': THREE.FlatShading
    });
    this.nodeBorder = new THREE.MeshBasicMaterial({
        'color': 0x999999,
        'shading': THREE.FlatShading
    });
    this.selectedNode = new THREE.MeshBasicMaterial({
        'color': 0xffffff,
        'shading': THREE.FlatShading
    });
    this.selectedNodeBorder = new THREE.MeshBasicMaterial({
        'color': 0x005395,
        'shading': THREE.FlatShading
    });
    this.edge = new THREE.LineBasicMaterial({
        'color': 0xbababa,
        'shading': THREE.FlatShading
    });
}
