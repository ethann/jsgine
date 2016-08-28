'use strict'

class OverlayLibrary {
    constructor() {
        this.library = {};
    }

    add(name, overlay) {
        this.library[name] = overlay;
    }

    getOverlay(name) {
        return this.library[name];
    }
}

var overlay_library = new OverlayLibrary();