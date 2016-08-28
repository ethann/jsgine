class Overlay {
    constructor(context) {
        this.frame = -1;
        this.frame_count = 60;
        this.iteration = 0;
        this.speed = 1;
        this.z = 10000;

        this.infinity = false;
        this.do_end_frame = false;
        this.end = false;

        this.context = context;
    }

    finish() {
        this.end = true;
    }

    onUpdate(next_frame) {}

    update() {
        if(this.end) return;

        this.end = (!this.infinity && this.frame == this.frame_count-1);
        this.do_end_frame = this.speed;

        let new_iteration = this.iteration + 1;
        let rest = new_iteration % this.speed;
        let change_times = Math.floor((new_iteration - rest) / this.speed);

        this.frame = (this.frame + change_times);
        this.iteration = rest;

        if(this.infinity)
            this.frame %= this.frame_count;
        else
            this.frame = Math.min(this.frame, this.frame_count-1);

        this.onUpdate(change_times > 0);
    }

    onDraw() {}

    draw() {
        if(this.end && !this.do_end_frame) return;

        this.onDraw();
        this.do_end_frame -= 1;
    }
}