'use strict'

class MyPoliceman extends Object {
    constructor(id, context, speed=10) {
        super(id, context);

        this.setSprite('policeman');
        this.setState('default');
        this.sprite.setSpeed(speed);

        this.walk_right_k = false;
        this.walk_left_k = false;
        this.walk_up_k = false;
        this.walk_down_k = false;
    }

    update() {
        super.update();

        var keys = Game.keyboard;
        if(keys.indexOf(37) !== -1) { // left
            this.walk_left();
            this.setPosition({x:this.position.x-2});
        }
        else if(keys.indexOf(39) !== -1) { // right
            this.walk_right();
            this.setPosition({x:this.position.x+2});
        }
        else if(keys.indexOf(38) !== -1) { // up
            this.walk_up();
            this.z -= 2;
        }
        else if(keys.indexOf(40) !== -1) { // down
            this.walk_down();
            this.z += 2;
        }
        else { // not in stay
            this.setState('default');
        }

        this.walk_left_k = (this.walk_left_k && keys.indexOf(37) !== -1);
        this.walk_right_k = (this.walk_right_k && keys.indexOf(39) !== -1);
        this.walk_up_k = (this.walk_up_k && keys.indexOf(38) !== -1);
        this.walk_down_k = (this.walk_down_k && keys.indexOf(40) !== -1);
    }

    walk_left() {
        if(!this.walk_left_k) {
            this.setState('walk_left');
            this.walk_left_k = true;
        }
    }

    walk_right() {
        if(!this.walk_right_k) {
            this.setState('walk_right');
            this.walk_right_k = true;
        }
    }

    walk_up() {
        if(!this.walk_up_k) {
            this.setState('walk_up');
            this.walk_up_k = true;
        }
    }

    walk_down() {
        if(!this.walk_down_k) {
            this.setState('walk_down');
            this.walk_down_k = true;
        }
    }
}