function Animations() {
    this.animationList = [];
}

Animations.prototype.add = function(meshObject, id, anim) {
    if (meshObject.hasAnimation(id)) {
        this.remove(meshObject, id);
    }

    this.animationList.push(anim);
    meshObject.addAnimation(id, anim);

    // Automatically remove on completion
    anim.onComplete(function() {
        var idx = this.animationList.indexOf(anim);
        if (idx !== -1) {
            this.animationList.splice(idx, 1);
            delete meshObject.animations[id];
        }
    }.bind(this))
        .start();
};

Animations.prototype.remove = function(meshObject, id) {
    var anim,
        idx;
    anim = meshObject.removeAnimation(id);
    idx = this.animationList.indexOf(anim);
    if (idx !== -1) {
        this.animationList.splice(idx, 1);
    }
};

Animations.prototype.empty = function() {
    return this.animationList.length === 0;
};

// Types
Animations.Highlight = 'Highlight';
