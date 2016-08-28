'use strict'

class Loader {
    constructor() {
        this.images_paths = [];
        this.images_loaded = 0;
        this.images = {};

        this.end = false;
        this.callback = () => {};
    }

    add(images) {
        this.images_paths = this.images_paths.concat(images);
    }

    start(callback) {
        this.callback = callback;

        let images_to_load = this.images_paths.filter(
            (value, index, arr) => arr.indexOf(value) === index
        );
        
        this.images_count = images_to_load.length;
        
        for(let name of images_to_load) {
            let image = new Image();
            image.onload = this.imageLoaded.bind(this, name);
            image.onerror = this.errorLoaded.bind(this, name);
            image.src = 'img/game/' + name + '.png';

            this.images[name] = image;
        }
    }

    complete() {
        this.end = true;
        this.callback(this.images);
    }

    errorLoaded(name) {
        console.error("Error while loading image: ", name);
    }

    imageLoaded(name) {
        this.images_loaded++;

        if(this.images_loaded >= this.images_count) 
            this.complete();
    };

}


