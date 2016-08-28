'use strict'

class SpriteLibrary {
    constructor() {
        this.library = {};
        this.prepare = [];
    }

    addSpriteToLoad(name, struct) {
        this.prepare.push([name, struct]);
    }

    load(images) {
        let name, states;
        for(var i=0; i<this.prepare.length; ++i) {
            [name, states] = this.prepare[i];

            // update images (name -> object)
            for(let state in states) {
                if(typeof states[state] === 'string') {
                    while(typeof states[state] === 'string') {
                        states[state] = states[states[state]];
                    }
                }
                else {
                    states[state].image = images[states[state].image];
                }
            }
            
            this.library[name] = states;
        }
    }

    getImagesToLoad() {
        let images = [];
        for(var i=0; i<this.prepare.length; ++i) {
            let states = this.prepare[i][1];

            for(let state in states) {
            if(states[state].image) {
                    images.push(states[state].image);
                }
            }
        }

        return images.filter(
            (value, index, arr) => arr.indexOf(value) === index
        );
    }

    getSprite(name) {
        return new Sprite(this.library[name]);
    }
}

var sprite_library = new SpriteLibrary();