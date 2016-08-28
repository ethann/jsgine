'use strict'

class Policeman extends Object {
    constructor(id, context, speed=10) {
        super(id, context);

        this.setSprite('policeman');
        this.setState('default');
        this.sprite.setSpeed(speed);
    }
}