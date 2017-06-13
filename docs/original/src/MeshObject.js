function MeshObject() {
    this.id = null;
    // This object is represented in the arbor graph layout.
    this.isInLayout = false;
    // This object is represented in the currently rendered scene.
    this.isInScene = false;
    // The current mesh associated with this object.
    this.mesh = null;
    // The current animations associated with this object.
    this.animations = {};
}

MeshObject.prototype.addAnimation = function(id, tween) {
    if (this.animations[id] !== undefined) {
        this.removeAnimation(id);
    }
    this.animations[id] = tween;
};

MeshObject.prototype.hasAnimation = function(id) {
    return this.animations[id] !== undefined;
};

MeshObject.prototype.removeAnimation = function(id) {
    var anim = this.animations[id] || null;
    if (anim !== null) {
        TWEEN.remove(anim);
        this.animations[id] = undefined;
    }
    return anim;
};

