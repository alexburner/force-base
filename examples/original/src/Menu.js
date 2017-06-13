function Menu(container) {
    this.container = container;
    this.el = null;
}

Menu.prototype.show = function(node, pos) {
    var el,
        menuWidth,
        menuHeight,
        x = pos.x,
        y = pos.y;
    console.log('menu:', node, x, y);
    el = $('.activitymap-context-menu').first();
    menuWidth = el.width();
    menuHeight = el.height();
    el.trigger('activitymap-context-menu-open', node);
    if (x + menuWidth > this.container.width()) {
        x -= menuWidth;
    }
    if (y + menuHeight > this.container.height()) {
        y -= menuHeight;
    }
    el.show().css({left: x, top: y});
    this.el = el;
};

Menu.prototype.hide = function() {
    if (this.el !== null) {
        this.el.hide();
        this.el = null;
    }
};
