function ActivityMap(opts) {
    opts = opts || {};

    this.graph = new Graph();
    this.initialized = false;
    this.renderer = null;
    this.controls = null;
    this.element = opts.element || null;
}

ActivityMap.prototype.init = function() {
    var renderer;

    if (this.initialized) {
        return;
    }
    console.log('initialized');

    renderer = new Renderer(this.element, this.graph);
    this.graph.layout.renderer = {
        init: renderer.init.bind(renderer),
        redraw: function() {
            this.graph.layoutUpdate();
            this.renderer.layoutUpdate();
        }.bind(this)
    };
    this.renderer = renderer;
    this.controls = new Controls(renderer);
    this.controls.init();
    this.initialized = true;
};

ActivityMap.prototype.update = function(data) {
    var self = this,
        pollInterval = 500;

    function updatePollFn() {
        if ((self.renderer === null) || self.renderer.canBeUpdated()) {
            self.graph.update(data);
            if (!self.initialized) {
                self.init();
            }
        }
        else {
            setTimeout(updatePollFn, pollInterval);
        }
    }
    updatePollFn();
};

ActivityMap.prototype.bind = function($el) {
    this.element = $el;
};

ActivityMap.prototype.uninit = function() {
    console.log('uninitialized');
    this.renderer.uninit();
};
