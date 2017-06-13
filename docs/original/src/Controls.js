var MouseState,
    RightMouseButton = 3;

MouseState = {
    None: 'None',
    Hover: 'Hover',
    DragPan: 'DragPan',
    DragItem: 'DragItem'
};

function Controls(renderer) {
    this.renderer = renderer;
    this.mouseState = MouseState.None;
    this.hoverTarget = null;
    this.selection = null;
    this.lastClickPosition = null;
    this.menu = new Menu(renderer.container);

    console.log('Controls initialized');
}

Controls.prototype.init = function() {
    var self = this,
        $container = self.renderer.container,
        container = $container.get(0);

    function onScroll(event) {
        var scrollAmount = (event.wheelDeltaY  * 0.02) || -event.detail;
        self.renderer.zoom(scrollAmount);
        event.preventDefault();
    }

    function onMouseMove(event) {
        var mousePos = new THREE.Vector3(event.clientX, event.clientY),
            obj,
            intersects,
            i;

        switch (self.mouseState) {
        case MouseState.None:
            intersects = self.renderer.mouseAt(mousePos);
            for (i = 0; i < intersects.length; i++) {
                obj = intersects[i];
                self.renderer.addHighlight(obj);
                self.mouseState = MouseState.Hover;
                self.hoverTarget = obj;
            }
            break;
        case MouseState.Hover:
            intersects = self.renderer.mouseAt(mousePos);
            if (intersects.length === 0) {
                obj = self.hoverTarget;
                self.renderer.removeHighlight(obj);
                self.mouseState = MouseState.None;
                self.hoverTarget = null;
                self.selection = null;
            }
            break;
        case MouseState.DragPan:
            if (!$container.hasClass('grab-cursor')) {
                $container.toggleClass('grab-cursor', true);
            }
            self.renderer.pan(self.lastClickPosition, mousePos);
            self.lastClickPosition = mousePos;
            break;
        case MouseState.DragItem:
            if (self.hoverTarget === null) {
                self.mouseState = MouseState.None;
            }
            else {
                self.renderer.move(self.hoverTarget, self.lastClickPosition,
                                   mousePos);
                self.lastClickPosition = mousePos;
            }
            break;
        }
        event.preventDefault();
        event.stopPropagation();
    }

    function onMouseUp(event) {
        if (event.which === RightMouseButton) {
            return;
        }
        self.menu.hide();
        self.lastClickPosition = null;
        if (self.mouseState === MouseState.DragItem) {
            self.mouseState = MouseState.Hover;
        }
        else {
            self.mouseState = MouseState.None;
        }
        container.removeEventListener('mouseup', onMouseUp);
        if ($container.hasClass('grab-cursor')) {
            $container.toggleClass('grab-cursor', false);
        }
        event.preventDefault();
        event.stopPropagation();
    }

    function onMouseDown(event) {
        if (event.which === RightMouseButton) {
            return;
        }
        self.menu.hide();
        self.lastClickPosition = new THREE.Vector3(event.clientX,
                                                   event.clientY,
                                                   0);
        if (self.mouseState === MouseState.Hover) {
            self.mouseState = MouseState.DragItem;
            self.selection = self.hoverTarget;
        }
        else {
            self.mouseState = MouseState.DragPan;
        }
        container.addEventListener('mouseup', onMouseUp);
        self.renderer.step();
        event.preventDefault();
        event.stopPropagation();
    }

    function onResize() {
        self.renderer.onResize();
    }

    function onContextMenu(event) {
        if (self.hoverTarget !== null) {
            self.menu.show(self.hoverTarget, {
                x: event.clientX,
                y: event.clientY
            });
            event.preventDefault();
            event.stopPropagation();
        }
    }

    container.addEventListener('contextmenu', onContextMenu, false);
    container.addEventListener('DOMMouseScroll', onScroll, false);
    container.addEventListener('mousewheel', onScroll, false);
    container.addEventListener('mousedown', onMouseDown, false);
    container.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onResize.bind(this), false);
};
