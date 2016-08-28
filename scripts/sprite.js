'use strict'

class Sprite {
    // @todo: default state in spritelibrary

    constructor(states) {
        this.states = states;
        this.state = null; // reference to specific value of states
        this.frame = 0;
        this.speed = 0; // frames per sec
        this.iteration = 0;
    }

    toString() {
        return "[Sprite]";
    }

    resetAnimation() {
        this.frame = 0;
        this.iteration = 0;
    }

    update() {
        let new_iteration = this.iteration + 1;

        let frames = this.state.frames.length;
        let rest = new_iteration % this.speed;

        let change_times = (new_iteration - rest) / this.speed;

        this.frame = (this.frame + change_times) % frames;
        this.iteration = rest;
    }

    setSpeed(new_speed) {
        this.speed = new_speed;
    }

    setState(name) {
        let new_state = this.states[name];
        if(new_state === undefined) {
            console.error("State called '" + name + "' doesn't exists for this sprite.", this);
            return;
        }

        this.state = new_state;
        this.resetAnimation();
    }

    draw(context, position, scale) {
        scale = scale || 1;
        
        if(!this.state || !context) {
            console.error("Unable to draw sprite.", this);
            return;
        }

        let frame = this.state.frames[this.frame];
        let dest_size = [frame.size[0]*scale, frame.size[1]*scale]
        
        context.drawImage({
            image: this.state.image,

            destination: {
                position: position,
                size: dest_size
            },

            source: {
                position: frame.position,
                size: frame.size
            }
        });
    }
};